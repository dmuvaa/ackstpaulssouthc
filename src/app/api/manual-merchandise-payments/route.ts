import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  buildOrderEmailContext,
  sendOrderPlacedEmails,
} from "@/lib/order-emails";

type ManualMerchandisePaymentRequest = {
  merchandise_id: string;
  name: string;
  email: string;
  phone: string;
  mpesa_code: string;
  delivery_preference: "pickup" | "delivery";
  delivery_address?: string;
};

type MerchandiseRecord = {
  id: string;
  title: string;
  price: number;
  category: string;
  in_stock: boolean;
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
    const body = (await req.json()) as ManualMerchandisePaymentRequest;
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = normalizePhone(body.phone || "");
    const mpesaCode = normalizeMpesaCode(body.mpesa_code || "");
    const deliveryPreference = body.delivery_preference;
    const deliveryAddress = body.delivery_address?.trim() || "";

    if (!body.merchandise_id) {
      throw new Error("Merchandise item is required");
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
    if (deliveryPreference !== "pickup" && deliveryPreference !== "delivery") {
      throw new Error("Please choose pickup or delivery");
    }
    if (deliveryPreference === "delivery" && !deliveryAddress) {
      throw new Error("Delivery address is required for home delivery");
    }

    const supabase = getAdminClient();
    const { data: merchandise, error: merchandiseError } = await supabase
      .from("merchandise")
      .select("id,title,price,category,in_stock")
      .eq("id", body.merchandise_id)
      .single<MerchandiseRecord>();

    if (merchandiseError) throw merchandiseError;
    if (!merchandise) {
      throw new Error("Merchandise item not found");
    }
    if (!merchandise.in_stock) {
      throw new Error("This item is currently out of stock");
    }

    const checkoutRequestId = `manual-merch-${randomUUID()}`;
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        type: "purchase",
        amount: merchandise.price,
        phone,
        status: "pending",
        checkout_request_id: checkoutRequestId,
        mpesa_receipt: mpesaCode,
        product_id: merchandise.id,
        metadata: {
          manual: true,
          product_kind: "merchandise",
          name,
          email,
          title: merchandise.title,
          category: merchandise.category,
          delivery_preference: deliveryPreference,
          delivery_address:
            deliveryPreference === "delivery" ? deliveryAddress : "",
          fulfillment: {
            status: "pending",
          },
          submitted_at: new Date().toISOString(),
        },
      })
      .select("id")
      .single();

    if (paymentError) throw paymentError;

    void sendOrderPlacedEmails(
      buildOrderEmailContext(
        {
          id: payment.id,
          amount: merchandise.price,
          phone,
          mpesa_receipt: mpesaCode,
          metadata: {
            email,
            name,
            title: merchandise.title,
            product_kind: "merchandise",
            delivery_preference: deliveryPreference,
            delivery_address:
              deliveryPreference === "delivery" ? deliveryAddress : "",
          },
        },
        "merchandise",
        merchandise.title
      )
    ).catch((error) => {
      console.error("Merchandise order placed email error:", error);
    });

    return NextResponse.json({
      success: true,
      payment_id: payment.id,
      message: "Order submitted for manual confirmation",
    });
  } catch (error: unknown) {
    console.error("Manual merchandise payment error:", error);
    return NextResponse.json(
      { success: false, error: getErrorMessage(error) },
      { status: 400 }
    );
  }
}
