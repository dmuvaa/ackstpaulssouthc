import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import crypto from "crypto";

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
      const amount = callbackMetadata.find((i: any) => i.Name === "Amount").Value;
      const receipt = callbackMetadata.find((i: any) => i.Name === "MpesaReceiptNumber").Value;
      const phone = callbackMetadata.find((i: any) => i.Name === "PhoneNumber").Value;
      
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
      
      // 2. If it was a purchase, handle Magazine Delivery
      if (payment.type === "purchase" && payment.product_id) {
        const token = crypto.randomUUID();
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7); // 7 days expiry
        
        // Create Download Token
        const { error: tokenError } = await supabase.from("downloads").insert({
          payment_id: payment.id,
          token: token,
          expires_at: expiry.toISOString(),
        });
        
        if (tokenError) throw tokenError;
        
        // Get Product details
        const { data: product } = await supabase
          .from("products")
          .select("*")
          .eq("id", payment.product_id)
          .single();
          
        // Send Email via Resend
        await resend.emails.send({
          from: "ACK St Pauls <donotreply@ackstpaulssouthc.co.ke>",
          to: payment.metadata?.email || "member@example.com", // Fallback if no email in metadata
          subject: `Your Magazine Download: ${product?.title}`,
          html: `
            <h1>Thank you for your purchase!</h1>
            <p>You have successfully purchased <strong>${product?.title}</strong>.</p>
            <p>You can download your magazine using the link below. Note that this link expires in 7 days.</p>
            <a href="${process.env.APP_BASE_URL}/api/download/${token}" style="display:inline-block; padding:12px 24px; background:#003366; color:#fff; text-decoration:none; border-radius:8px;">Download Magazine</a>
            <br/><br/>
            <p>If you have any issues, please contact the church office.</p>
          `,
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
    
  } catch (error: any) {
    console.error("M-Pesa Callback Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
