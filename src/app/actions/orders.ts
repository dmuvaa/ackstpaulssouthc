"use server";

import { createClient } from "@/utils/supabase/server";
import { sendMagazineDeliveryEmail } from "@/lib/magazine-delivery";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type PaymentMetadata = {
  email?: string;
  name?: string;
  title?: string;
  manual?: boolean;
  delivery?: {
    sent_at?: string;
    token?: string;
  };
};

type PaymentRecord = {
  id: string;
  type: string;
  amount: number;
  phone: string;
  status: "pending" | "success" | "failed";
  checkout_request_id: string;
  mpesa_receipt: string | null;
  product_id: string | null;
  metadata: PaymentMetadata | null;
  created_at: string;
};

type ProductRecord = {
  id: string;
  title: string;
};

export type MagazinePaymentRow = PaymentRecord & {
  customer_name: string;
  customer_email: string;
  product_title: string;
  is_manual: boolean;
  delivered_at: string | null;
};

function getAdminClient() {
  return createAdminClient(
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
  return error instanceof Error ? error.message : "Unable to process order";
}

async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getMagazinePayments(): Promise<MagazinePaymentRow[]> {
  const user = await getAuthenticatedUser();
  if (!user) return [];

  const adminClient = getAdminClient();
  const { data: payments, error } = await adminClient
    .from("payments")
    .select("id,type,amount,phone,status,checkout_request_id,mpesa_receipt,product_id,metadata,created_at")
    .eq("type", "purchase")
    .order("created_at", { ascending: false })
    .returns<PaymentRecord[]>();

  if (error) {
    console.error("Error fetching magazine payments:", error);
    return [];
  }

  const productIds = Array.from(
    new Set((payments || []).map((payment) => payment.product_id).filter(Boolean))
  ) as string[];
  let productMap = new Map<string, ProductRecord>();

  if (productIds.length > 0) {
    const { data: products, error: productsError } = await adminClient
      .from("products")
      .select("id,title")
      .in("id", productIds)
      .returns<ProductRecord[]>();

    if (productsError) {
      console.error("Error fetching payment products:", productsError);
    } else {
      productMap = new Map((products || []).map((product) => [product.id, product]));
    }
  }

  return (payments || []).map((payment) => {
    const metadata = payment.metadata || {};
    const productTitle = payment.product_id
      ? productMap.get(payment.product_id)?.title
      : undefined;

    return {
      ...payment,
      customer_name: metadata.name || "Customer",
      customer_email: metadata.email || "",
      product_title: productTitle || metadata.title || "Magazine",
      is_manual: Boolean(metadata.manual),
      delivered_at: metadata.delivery?.sent_at || null,
    };
  });
}

export async function confirmPaymentAndSendMagazine(paymentId: string) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const adminClient = getAdminClient();

  try {
    const { data: payment, error: paymentError } = await adminClient
      .from("payments")
      .select("id,type,amount,phone,status,checkout_request_id,mpesa_receipt,product_id,metadata,created_at")
      .eq("id", paymentId)
      .single<PaymentRecord>();

    if (paymentError) throw paymentError;
    if (!payment) throw new Error("Payment not found");
    if (payment.type !== "purchase") {
      throw new Error("Only magazine purchases can receive magazine links");
    }
    if (payment.metadata?.delivery?.sent_at) {
      return { success: true, message: "Magazine email was already sent" };
    }

    const { data: updatedPayment, error: updateError } = await adminClient
      .from("payments")
      .update({ status: "success" })
      .eq("id", payment.id)
      .select("id,type,amount,phone,status,checkout_request_id,mpesa_receipt,product_id,metadata,created_at")
      .single<PaymentRecord>();

    if (updateError) throw updateError;

    const delivery = await sendMagazineDeliveryEmail({
      payment: updatedPayment,
      email: updatedPayment.metadata?.email,
      name: updatedPayment.metadata?.name,
    });

    if (!delivery.success) {
      throw new Error(delivery.error);
    }

    revalidatePath("/admin/orders");
    return {
      success: true,
      message: `Magazine email sent for ${delivery.productTitle}`,
    };
  } catch (error: unknown) {
    console.error("Confirm payment error:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}
