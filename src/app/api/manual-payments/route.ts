import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

type ManualPaymentRequest = {
  product_id: string;
  name: string;
  email: string;
  phone: string;
  mpesa_code: string;
};

type ProductRecord = {
  id: string;
  title: string;
  price: number;
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
  return error instanceof Error ? error.message : "Failed to submit payment";
}

function normalizePhone(phone: string) {
  return phone.replace(/[^0-9+]/g, "").trim();
}

function normalizeMpesaCode(code: string) {
  return code.replace(/\s+/g, "").trim().toUpperCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as ManualPaymentRequest;
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = normalizePhone(body.phone || "");
    const mpesaCode = normalizeMpesaCode(body.mpesa_code || "");

    if (!body.product_id) {
      throw new Error("Magazine is required");
    }
    if (!name) {
      throw new Error("Name is required");
    }
    if (!email || !isValidEmail(email)) {
      throw new Error("A valid email is required");
    }
    if (!phone) {
      throw new Error("Phone number is required");
    }
    if (!mpesaCode) {
      throw new Error("M-Pesa code is required");
    }

    const supabase = getAdminClient();
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id,title,price")
      .eq("id", body.product_id)
      .single<ProductRecord>();

    if (productError) throw productError;
    if (!product) {
      throw new Error("Magazine not found");
    }

    const checkoutRequestId = `manual-${randomUUID()}`;
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        type: "purchase",
        amount: product.price,
        phone,
        status: "pending",
        checkout_request_id: checkoutRequestId,
        mpesa_receipt: mpesaCode,
        product_id: product.id,
        metadata: {
          manual: true,
          name,
          email,
          title: product.title,
          submitted_at: new Date().toISOString(),
        },
      })
      .select("id")
      .single();

    if (paymentError) throw paymentError;

    return NextResponse.json({
      success: true,
      payment_id: payment.id,
      message: "Payment submitted for manual confirmation",
    });
  } catch (error: unknown) {
    console.error("Manual payment error:", error);
    return NextResponse.json(
      { success: false, error: getErrorMessage(error) },
      { status: 400 }
    );
  }
}
