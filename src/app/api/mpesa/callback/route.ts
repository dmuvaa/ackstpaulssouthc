import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendMagazineDeliveryEmail } from "@/lib/magazine-delivery";
import {
  buildOrderEmailContext,
  sendMerchandisePaymentConfirmedEmail,
} from "@/lib/order-emails";
import { Resend } from "resend";

type CallbackMetadataItem = {
  Name: string;
  Value: string | number;
};

function findCallbackValue(items: CallbackMetadataItem[], name: string) {
  return items.find((item) => item.Name === name)?.Value;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "M-Pesa callback failed";
}

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const result = body.Body.stkCallback;
    
    const checkoutRequestID = result.CheckoutRequestID;
    const resultCode = result.ResultCode;
    
    if (resultCode === 0) {
      // Payment Successful
      const callbackMetadata = result.CallbackMetadata.Item;
      const amount = findCallbackValue(callbackMetadata, "Amount");
      const receipt = findCallbackValue(callbackMetadata, "MpesaReceiptNumber");
      
      // 1. Update Payment Record
      const { data: payment, error: updateError } = await supabase
        .from("payments")
        .update({
          status: "success",
          mpesa_receipt: receipt,
        })
        .eq("checkout_request_id", checkoutRequestID)
        .select()
        .single();
        
      if (updateError) throw updateError;
      
      // 2. If it was a magazine purchase, send the reader email.
      // Merchandise STK payments are fulfilled manually by admins.
      const isMerchandisePurchase =
        payment.metadata?.product_kind === "merchandise";

      if (
        payment.type === "purchase" &&
        payment.product_id &&
        !isMerchandisePurchase
      ) {
        const delivery = await sendMagazineDeliveryEmail({
          payment,
          email: payment.metadata?.email,
          name: payment.metadata?.name,
        });

        if (!delivery.success) throw new Error(delivery.error);
      } else if (payment.type === "purchase" && isMerchandisePurchase) {
        const confirmedMetadata = {
          ...payment.metadata,
          fulfillment: {
            ...payment.metadata?.fulfillment,
            status: "confirmed",
            confirmed_at: new Date().toISOString(),
          },
        };

        await supabase
          .from("payments")
          .update({ metadata: confirmedMetadata })
          .eq("id", payment.id);

        void sendMerchandisePaymentConfirmedEmail(
          buildOrderEmailContext(
            {
              ...payment,
              mpesa_receipt: String(receipt),
              metadata: confirmedMetadata,
            },
            "merchandise"
          )
        ).catch((error) => {
          console.error("STK merchandise confirmed email error:", error);
        });
      } else if (payment.type === "donation") {
        // 3. Update Donation status to 'confirmed'
        if (payment.metadata?.donation_id) {
          await supabase
            .from("donations")
            .update({ status: "confirmed" })
            .eq("id", payment.metadata.donation_id);
        }

        // Send Thank You Email for Donation
        if (payment.metadata?.email) {
          await resend.emails.send({
            from: "ACK St Pauls <donotreply@ackstpaulssouthc.co.ke>",
            to: payment.metadata.email,
            subject: "Thank You for Your Donation",
            html: `
              <h1>Thank you for your generosity!</h1>
              <p>We have received your donation of KES ${amount}.</p>
              <p>Your support helps us continue our mission and serve the community.</p>
              <p>M-Pesa Receipt: ${receipt}</p>
            `,
          });
        }
      }
    } else {
      // Payment Failed
      await supabase
        .from("payments")
        .update({ status: "failed" })
        .eq("checkout_request_id", checkoutRequestID);
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error: unknown) {
    console.error("M-Pesa Callback Error:", error);
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}
