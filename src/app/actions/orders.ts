"use server";

import { createClient } from "@/utils/supabase/server";
import { sendMagazineDeliveryEmail } from "@/lib/magazine-delivery";
import {
  buildOrderEmailContext,
  sendMagazinePaymentConfirmedEmail,
  sendMerchandiseFulfillmentEmail,
  sendMerchandisePaymentConfirmedEmail,
  sendOrderFollowUpEmail,
  sendOrderRejectedEmail,
  sendOrderReopenedEmail,
} from "@/lib/order-emails";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type ProductKind = "magazine" | "merchandise";

export type FulfillmentStatus =
  | "pending"
  | "confirmed"
  | "ready_for_pickup"
  | "shipped"
  | "delivered"
  | "cancelled";

type PaymentMetadata = {
  email?: string;
  name?: string;
  title?: string;
  category?: string;
  manual?: boolean;
  product_kind?: ProductKind;
  delivery_address?: string;
  delivery_preference?: "pickup" | "delivery";
  delivery?: {
    sent_at?: string;
    token?: string;
  };
  fulfillment?: {
    status?: FulfillmentStatus;
    confirmed_at?: string;
    ready_at?: string;
    shipped_at?: string;
    delivered_at?: string;
    rejected_at?: string;
    rejection_reason?: string;
    follow_up_requested_at?: string;
    follow_up_message?: string;
  };
  admin_notes?: Array<{
    note: string;
    added_at: string;
    added_by?: string;
  }>;
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

type MerchandiseRecord = {
  id: string;
  title: string;
  category: string;
};

export type PurchasePaymentRow = PaymentRecord & {
  customer_name: string;
  customer_email: string;
  product_title: string;
  product_kind: ProductKind;
  is_manual: boolean;
  delivered_at: string | null;
  delivery_address: string;
  delivery_preference: "pickup" | "delivery" | null;
  fulfillment_status: FulfillmentStatus;
  admin_notes: PaymentMetadata["admin_notes"];
  rejection_reason: string | null;
};

/** @deprecated Use PurchasePaymentRow */
export type MagazinePaymentRow = PurchasePaymentRow;

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
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

async function fetchPayment(
  adminClient: ReturnType<typeof getAdminClient>,
  paymentId: string
) {
  const { data: payment, error } = await adminClient
    .from("payments")
    .select(
      "id,type,amount,phone,status,checkout_request_id,mpesa_receipt,product_id,metadata,created_at"
    )
    .eq("id", paymentId)
    .single<PaymentRecord>();

  if (error) throw error;
  if (!payment) throw new Error("Payment not found");
  return payment;
}

function appendAdminNote(
  metadata: PaymentMetadata,
  note: string,
  addedBy?: string
): PaymentMetadata {
  const existing = metadata.admin_notes || [];
  return {
    ...metadata,
    admin_notes: [
      ...existing,
      {
        note,
        added_at: new Date().toISOString(),
        added_by: addedBy,
      },
    ],
  };
}

export async function getPurchasePayments(): Promise<PurchasePaymentRow[]> {
  const user = await getAuthenticatedUser();
  if (!user) return [];

  const adminClient = getAdminClient();
  const { data: payments, error } = await adminClient
    .from("payments")
    .select(
      "id,type,amount,phone,status,checkout_request_id,mpesa_receipt,product_id,metadata,created_at"
    )
    .eq("type", "purchase")
    .order("created_at", { ascending: false })
    .returns<PaymentRecord[]>();

  if (error) {
    console.error("Error fetching purchase payments:", error);
    return [];
  }

  const productIds = Array.from(
    new Set((payments || []).map((payment) => payment.product_id).filter(Boolean))
  ) as string[];

  let productMap = new Map<string, ProductRecord>();
  let merchandiseMap = new Map<string, MerchandiseRecord>();

  if (productIds.length > 0) {
    const [{ data: products }, { data: merchandise }] = await Promise.all([
      adminClient
        .from("products")
        .select("id,title")
        .in("id", productIds)
        .returns<ProductRecord[]>(),
      adminClient
        .from("merchandise")
        .select("id,title,category")
        .in("id", productIds)
        .returns<MerchandiseRecord[]>(),
    ]);

    productMap = new Map((products || []).map((product) => [product.id, product]));
    merchandiseMap = new Map(
      (merchandise || []).map((item) => [item.id, item])
    );
  }

  return (payments || []).map((payment) => {
    const metadata = payment.metadata || {};
    const isMerchandise =
      metadata.product_kind === "merchandise" ||
      (payment.product_id ? merchandiseMap.has(payment.product_id) : false);
    const productKind: ProductKind = isMerchandise ? "merchandise" : "magazine";

    const magazineTitle = payment.product_id
      ? productMap.get(payment.product_id)?.title
      : undefined;
    const merchItem = payment.product_id
      ? merchandiseMap.get(payment.product_id)
      : undefined;

    const productTitle =
      magazineTitle || merchItem?.title || metadata.title || "Order item";

    return {
      ...payment,
      customer_name: metadata.name || "Customer",
      customer_email: metadata.email || "",
      product_title: productTitle,
      product_kind: productKind,
      is_manual: Boolean(metadata.manual),
      delivered_at:
        productKind === "magazine"
          ? metadata.delivery?.sent_at || null
          : metadata.fulfillment?.delivered_at || null,
      delivery_address: metadata.delivery_address || "",
      delivery_preference: metadata.delivery_preference || null,
      fulfillment_status:
        metadata.fulfillment?.status ||
        (payment.status === "success" ? "confirmed" : "pending"),
      admin_notes: metadata.admin_notes || [],
      rejection_reason: metadata.fulfillment?.rejection_reason || null,
    };
  });
}

export async function getMagazinePayments(): Promise<PurchasePaymentRow[]> {
  const payments = await getPurchasePayments();
  return payments.filter((payment) => payment.product_kind === "magazine");
}

export async function getMerchandisePayments(): Promise<PurchasePaymentRow[]> {
  const payments = await getPurchasePayments();
  return payments.filter((payment) => payment.product_kind === "merchandise");
}

export async function confirmPaymentAndSendMagazine(paymentId: string) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const adminClient = getAdminClient();

  try {
    const payment = await fetchPayment(adminClient, paymentId);
    if (payment.type !== "purchase") {
      throw new Error("Only purchases can receive magazine links");
    }
    if (payment.metadata?.delivery?.sent_at) {
      return { success: true, message: "Magazine email was already sent" };
    }

    const { data: updatedPayment, error: updateError } = await adminClient
      .from("payments")
      .update({ status: "success" })
      .eq("id", payment.id)
      .select(
        "id,type,amount,phone,status,checkout_request_id,mpesa_receipt,product_id,metadata,created_at"
      )
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

export async function confirmMerchandisePayment(paymentId: string) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const adminClient = getAdminClient();

  try {
    const payment = await fetchPayment(adminClient, paymentId);
    const metadata = payment.metadata || {};
    const now = new Date().toISOString();

    const { error: updateError } = await adminClient
      .from("payments")
      .update({
        status: "success",
        metadata: {
          ...metadata,
          fulfillment: {
            ...metadata.fulfillment,
            status: "confirmed",
            confirmed_at: now,
          },
        },
      })
      .eq("id", payment.id);

    if (updateError) throw updateError;

    const emailContext = buildOrderEmailContext(payment, "merchandise");
    void sendMerchandisePaymentConfirmedEmail(emailContext).catch((error) => {
      console.error("Merchandise confirmed email error:", error);
    });

    revalidatePath("/admin/orders");
    return {
      success: true,
      message: "Merchandise payment confirmed. Buyer and admin notified by email.",
    };
  } catch (error: unknown) {
    console.error("Confirm merchandise payment error:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function rejectPayment(paymentId: string, reason: string) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const adminClient = getAdminClient();
  const trimmedReason = reason.trim();
  if (!trimmedReason) {
    return { success: false, error: "A rejection reason is required" };
  }

  try {
    const payment = await fetchPayment(adminClient, paymentId);
    const metadata = payment.metadata || {};
    const now = new Date().toISOString();

    const { error: updateError } = await adminClient
      .from("payments")
      .update({
        status: "failed",
        metadata: appendAdminNote(
          {
            ...metadata,
            fulfillment: {
              ...metadata.fulfillment,
              status: "cancelled",
              rejected_at: now,
              rejection_reason: trimmedReason,
            },
          },
          `Rejected: ${trimmedReason}`,
          user.email
        ),
      })
      .eq("id", payment.id);

    if (updateError) throw updateError;

    const productKind =
      metadata.product_kind === "merchandise" ? "merchandise" : "magazine";
    void sendOrderRejectedEmail(
      buildOrderEmailContext(payment, productKind),
      trimmedReason
    ).catch((error) => {
      console.error("Order rejected email error:", error);
    });

    revalidatePath("/admin/orders");
    return {
      success: true,
      message: "Payment rejected. Buyer notified by email where possible.",
    };
  } catch (error: unknown) {
    console.error("Reject payment error:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function markPaymentSuccessfulWithoutDelivery(paymentId: string) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const adminClient = getAdminClient();

  try {
    const payment = await fetchPayment(adminClient, paymentId);
    const metadata = payment.metadata || {};

    const { error: updateError } = await adminClient
      .from("payments")
      .update({
        status: "success",
        metadata: appendAdminNote(
          metadata,
          "Payment marked successful without automatic delivery.",
          user.email
        ),
      })
      .eq("id", payment.id);

    if (updateError) throw updateError;

    void sendMagazinePaymentConfirmedEmail(
      buildOrderEmailContext(payment, "magazine")
    ).catch((error) => {
      console.error("Magazine payment confirmed email error:", error);
    });

    revalidatePath("/admin/orders");
    return {
      success: true,
      message:
        "Payment marked as successful. Buyer notified — send the reader email when ready.",
    };
  } catch (error: unknown) {
    console.error("Mark payment successful error:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function resendMagazineEmail(paymentId: string) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const adminClient = getAdminClient();

  try {
    const payment = await fetchPayment(adminClient, paymentId);
    if (payment.status !== "success") {
      throw new Error("Only successful payments can have emails resent");
    }

    const delivery = await sendMagazineDeliveryEmail({
      payment,
      email: payment.metadata?.email,
      name: payment.metadata?.name,
    });

    if (!delivery.success) {
      throw new Error(delivery.error);
    }

    revalidatePath("/admin/orders");
    return {
      success: true,
      message: `Magazine reader link resent to ${payment.metadata?.email || "the buyer"}.`,
    };
  } catch (error: unknown) {
    console.error("Resend magazine email error:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function updatePaymentMpesaCode(paymentId: string, mpesaCode: string) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const normalizedCode = mpesaCode.replace(/\s+/g, "").trim().toUpperCase();
  if (!normalizedCode) {
    return { success: false, error: "M-Pesa code is required" };
  }

  const adminClient = getAdminClient();

  try {
    const payment = await fetchPayment(adminClient, paymentId);
    const metadata = payment.metadata || {};

    const { error: updateError } = await adminClient
      .from("payments")
      .update({
        mpesa_receipt: normalizedCode,
        metadata: appendAdminNote(
          metadata,
          `M-Pesa code updated to ${normalizedCode}.`,
          user.email
        ),
      })
      .eq("id", payment.id);

    if (updateError) throw updateError;

    revalidatePath("/admin/orders");
    return { success: true, message: "M-Pesa confirmation code updated." };
  } catch (error: unknown) {
    console.error("Update M-Pesa code error:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function addPaymentAdminNote(paymentId: string, note: string) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const trimmedNote = note.trim();
  if (!trimmedNote) {
    return { success: false, error: "Note cannot be empty" };
  }

  const adminClient = getAdminClient();

  try {
    const payment = await fetchPayment(adminClient, paymentId);
    const metadata = payment.metadata || {};

    const { error: updateError } = await adminClient
      .from("payments")
      .update({
        metadata: appendAdminNote(metadata, trimmedNote, user.email),
      })
      .eq("id", payment.id);

    if (updateError) throw updateError;

    revalidatePath("/admin/orders");
    return { success: true, message: "Admin note saved." };
  } catch (error: unknown) {
    console.error("Add admin note error:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function requestCustomerFollowUp(
  paymentId: string,
  message: string
) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const trimmedMessage = message.trim();
  if (!trimmedMessage) {
    return { success: false, error: "A follow-up message is required" };
  }

  const adminClient = getAdminClient();

  try {
    const payment = await fetchPayment(adminClient, paymentId);
    const metadata = payment.metadata || {};
    const now = new Date().toISOString();

    const { error: updateError } = await adminClient
      .from("payments")
      .update({
        metadata: appendAdminNote(
          {
            ...metadata,
            fulfillment: {
              ...metadata.fulfillment,
              follow_up_requested_at: now,
              follow_up_message: trimmedMessage,
            },
          },
          `Follow-up requested: ${trimmedMessage}`,
          user.email
        ),
      })
      .eq("id", payment.id);

    if (updateError) throw updateError;

    const productKind =
      metadata.product_kind === "merchandise" ? "merchandise" : "magazine";
    void sendOrderFollowUpEmail(
      buildOrderEmailContext(payment, productKind),
      trimmedMessage
    ).catch((error) => {
      console.error("Order follow-up email error:", error);
    });

    revalidatePath("/admin/orders");
    return {
      success: true,
      message: "Follow-up flagged and buyer emailed where possible.",
    };
  } catch (error: unknown) {
    console.error("Request follow-up error:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function resetPaymentToPending(paymentId: string) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const adminClient = getAdminClient();

  try {
    const payment = await fetchPayment(adminClient, paymentId);
    const metadata = payment.metadata || {};

    const { error: updateError } = await adminClient
      .from("payments")
      .update({
        status: "pending",
        metadata: appendAdminNote(
          metadata,
          "Payment moved back to pending for re-review.",
          user.email
        ),
      })
      .eq("id", payment.id);

    if (updateError) throw updateError;

    const productKind =
      metadata.product_kind === "merchandise" ? "merchandise" : "magazine";
    void sendOrderReopenedEmail(
      buildOrderEmailContext(payment, productKind)
    ).catch((error) => {
      console.error("Order reopened email error:", error);
    });

    revalidatePath("/admin/orders");
    return {
      success: true,
      message: "Payment reset to pending. Buyer notified where possible.",
    };
  } catch (error: unknown) {
    console.error("Reset payment error:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function updateMerchandiseFulfillment(
  paymentId: string,
  status: FulfillmentStatus
) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const adminClient = getAdminClient();
  const now = new Date().toISOString();

  try {
    const payment = await fetchPayment(adminClient, paymentId);
    const metadata = payment.metadata || {};
    const fulfillment = metadata.fulfillment || {};

    const timestamps: Partial<typeof fulfillment> = {};
    if (status === "ready_for_pickup") timestamps.ready_at = now;
    if (status === "shipped") timestamps.shipped_at = now;
    if (status === "delivered") timestamps.delivered_at = now;

    const statusLabels: Record<FulfillmentStatus, string> = {
      pending: "pending",
      confirmed: "payment confirmed",
      ready_for_pickup: "ready for parish pickup",
      shipped: "shipped / out for delivery",
      delivered: "delivered to buyer",
      cancelled: "cancelled",
    };

    const { error: updateError } = await adminClient
      .from("payments")
      .update({
        status: status === "cancelled" ? "failed" : payment.status,
        metadata: appendAdminNote(
          {
            ...metadata,
            fulfillment: {
              ...fulfillment,
              status,
              ...timestamps,
            },
          },
          `Fulfillment updated: ${statusLabels[status]}.`,
          user.email
        ),
      })
      .eq("id", payment.id);

    if (updateError) throw updateError;

    if (["ready_for_pickup", "shipped", "delivered"].includes(status)) {
      void sendMerchandiseFulfillmentEmail(
        buildOrderEmailContext(payment, "merchandise"),
        status
      ).catch((error) => {
        console.error("Merchandise fulfillment email error:", error);
      });
    }

    revalidatePath("/admin/orders");
    return {
      success: true,
      message: `Order marked as ${statusLabels[status]}. Buyer notified by email where possible.`,
    };
  } catch (error: unknown) {
    console.error("Update merchandise fulfillment error:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}
