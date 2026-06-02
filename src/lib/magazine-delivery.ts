import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import crypto from "crypto";

const DOWNLOAD_EXPIRY_DAYS = 7;

type PaymentMetadata = {
  email?: string;
  name?: string;
  title?: string;
  delivery?: {
    sent_at?: string;
    token?: string;
  };
};

type PaymentRecord = {
  id: string;
  product_id: string | null;
  mpesa_receipt: string | null;
  metadata: PaymentMetadata | null;
};

type ProductRecord = {
  id: string;
  title: string;
  file_path: string | null;
};

type DeliveryInput = {
  payment: PaymentRecord;
  email?: string;
  name?: string;
};

function getAdminClient() {
  return createClient(
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
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Failed to send magazine email";
}

function getBaseUrl() {
  const baseUrl = process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_APP_BASE_URL;
  if (!baseUrl) {
    throw new Error("APP_BASE_URL is required to build magazine download links");
  }

  return baseUrl.replace(/\/$/, "");
}

export async function sendMagazineDeliveryEmail({ payment, email, name }: DeliveryInput) {
  try {
    const supabase = getAdminClient();
    const recipientEmail = email || payment.metadata?.email;
    const recipientName = name || payment.metadata?.name || "there";

    if (!recipientEmail) {
      throw new Error("Customer email is missing");
    }
    if (!payment.product_id) {
      throw new Error("Payment is not linked to a magazine");
    }

    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id,title,file_path")
      .eq("id", payment.product_id)
      .single<ProductRecord>();

    if (productError) throw productError;
    if (!product?.file_path) {
      throw new Error("Magazine PDF is missing");
    }

    const token = crypto.randomUUID();
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + DOWNLOAD_EXPIRY_DAYS);

    const { error: tokenError } = await supabase.from("downloads").insert({
      payment_id: payment.id,
      token,
      expires_at: expiry.toISOString(),
    });

    if (tokenError) throw tokenError;

    const readerUrl = `${getBaseUrl()}/read/${token}`;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error: emailError } = await resend.emails.send({
      from: "ACK St Pauls <donotreply@ackstpaulssouthc.co.ke>",
      to: recipientEmail,
      subject: `Your Magazine Reader: ${product.title}`,
      html: `
        <h1>Your magazine is ready</h1>
        <p>Hello ${recipientName},</p>
        <p>Your payment has been confirmed for <strong>${product.title}</strong>.</p>
        <p>Use the secure link below to read your magazine online. Your reader access remains available after purchase.</p>
        <p>
          <a href="${readerUrl}" style="display:inline-block; padding:12px 24px; background:#003366; color:#fff; text-decoration:none; border-radius:8px;">
            Read Magazine
          </a>
        </p>
        <p>Please keep this purchase link private.</p>
        <p>M-Pesa Code: ${payment.mpesa_receipt || "Manual payment"}</p>
        <p>If you have any issues, please contact the church office.</p>
      `,
    });

    if (emailError) throw emailError;

    const nextMetadata = {
      ...(payment.metadata || {}),
      email: recipientEmail,
      name: recipientName,
      delivery: {
        sent_at: new Date().toISOString(),
        token,
      },
    };

    await supabase
      .from("payments")
      .update({ metadata: nextMetadata })
      .eq("id", payment.id);

    return {
      success: true,
      readerUrl,
      token,
      productTitle: product.title,
    };
  } catch (error: unknown) {
    console.error("Magazine delivery error:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}
