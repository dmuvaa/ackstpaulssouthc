import { Resend } from "resend";
import type { FulfillmentStatus, ProductKind } from "@/app/actions/orders";

const FROM_ADDRESS = "ACK St Pauls <donotreply@ackstpaulssouthc.co.ke>";
const NOTIFICATIONS_FROM = "ACK St Pauls Orders <notifications@ackstpaulssouthc.co.ke>";

export type OrderEmailContext = {
  paymentId: string;
  productKind: ProductKind;
  productTitle: string;
  amount: number;
  phone: string;
  customerName: string;
  customerEmail?: string;
  mpesaReceipt?: string | null;
  deliveryPreference?: "pickup" | "delivery" | null;
  deliveryAddress?: string;
};

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

function getBaseUrl() {
  const baseUrl = process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_APP_BASE_URL;
  return (baseUrl || "https://ackstpaulssouthc.co.ke").replace(/\/$/, "");
}

export function getAdminOrderEmails(): string[] {
  const configured = process.env.ADMIN_ORDER_EMAIL || process.env.ADMIN_NOTIFICATION_EMAIL;
  if (configured) {
    return configured.split(",").map((email) => email.trim()).filter(Boolean);
  }
  return ["info@ackstpaulssouthc.co.ke"];
}

function formatAmount(amount: number) {
  return `KES ${Number(amount).toLocaleString("en-KE")}`;
}

function emailButton(href: string, label: string) {
  return `<a href="${href}" style="display:inline-block; padding:12px 24px; background:#003366; color:#fff; text-decoration:none; border-radius:8px; font-weight:600;">${label}</a>`;
}

function emailShell(title: string, body: string) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 640px;">
      <h1 style="color: #003366; font-size: 22px; margin-bottom: 16px;">${title}</h1>
      ${body}
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
      <p style="font-size: 13px; color: #6b7280;">
        ACK St Paul's Parish, South C<br />
        info@ackstpaulssouthc.co.ke
      </p>
    </div>
  `;
}

function buildOrderSummary(ctx: OrderEmailContext) {
  const lines = [
    `<p><strong>Item:</strong> ${ctx.productTitle}</p>`,
    `<p><strong>Amount:</strong> ${formatAmount(ctx.amount)}</p>`,
    `<p><strong>Buyer:</strong> ${ctx.customerName}</p>`,
    `<p><strong>Phone:</strong> ${ctx.phone}</p>`,
  ];

  if (ctx.customerEmail) {
    lines.push(`<p><strong>Email:</strong> ${ctx.customerEmail}</p>`);
  }
  if (ctx.mpesaReceipt) {
    lines.push(`<p><strong>M-Pesa code:</strong> ${ctx.mpesaReceipt}</p>`);
  }
  if (ctx.productKind === "merchandise") {
    const preference =
      ctx.deliveryPreference === "pickup"
        ? "Parish pickup"
        : ctx.deliveryPreference === "delivery"
          ? "Home delivery"
          : "Not specified";
    lines.push(`<p><strong>Collection:</strong> ${preference}</p>`);
    if (ctx.deliveryAddress) {
      lines.push(`<p><strong>Delivery address:</strong> ${ctx.deliveryAddress}</p>`);
    }
  }

  return lines.join("");
}

async function sendBuyerEmail(
  to: string,
  subject: string,
  html: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      subject,
      html,
    });
    if (error) throw error;
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to send email";
    console.error("Buyer order email error:", message);
    return { success: false, error: message };
  }
}

async function sendAdminEmail(
  subject: string,
  html: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: NOTIFICATIONS_FROM,
      to: getAdminOrderEmails(),
      subject,
      html,
    });
    if (error) throw error;
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to send admin email";
    console.error("Admin order email error:", message);
    return { success: false, error: message };
  }
}

export async function sendOrderPlacedEmails(ctx: OrderEmailContext) {
  const adminOrdersUrl = `${getBaseUrl()}/admin/orders`;
  const isMagazine = ctx.productKind === "magazine";

  const buyerPromise = ctx.customerEmail
    ? sendBuyerEmail(
        ctx.customerEmail,
        isMagazine
          ? `Order received: ${ctx.productTitle}`
          : `Order received: ${ctx.productTitle}`,
        emailShell(
          isMagazine ? "We've received your magazine order" : "We've received your merchandise order",
          `
            <p>Hello ${ctx.customerName},</p>
            <p>
              Thank you for your order with ACK St Paul's. We have received your payment details
              and our team is reviewing your M-Pesa confirmation.
            </p>
            ${buildOrderSummary(ctx)}
            <p>
              ${
                isMagazine
                  ? "Once your payment is verified, we will email you a secure link to read your magazine online."
                  : "Once your payment is verified, we will contact you to arrange parish pickup or delivery of your item."
              }
            </p>
            <p>This usually happens within one business day. If you have questions, reply to this email or call the parish office.</p>
          `
        )
      )
    : Promise.resolve({ success: true });

  const adminPromise = sendAdminEmail(
    `New ${isMagazine ? "magazine" : "merchandise"} order — ${ctx.customerName}`,
    emailShell(
      `New ${isMagazine ? "magazine" : "merchandise"} order placed`,
      `
        <p>A new order has been submitted and is waiting for admin review.</p>
        ${buildOrderSummary(ctx)}
        <p style="margin-top: 20px;">
          ${emailButton(adminOrdersUrl, "Review in admin dashboard")}
        </p>
        <p style="font-size: 13px; color: #6b7280;">
          Verify the M-Pesa code in your PayBill statement (308937), then confirm the order
          ${isMagazine ? "and send the reader email" : "and arrange pickup or delivery"}.
        </p>
      `
    )
  );

  const [buyer, admin] = await Promise.all([buyerPromise, adminPromise]);
  return { buyer, admin };
}

export async function sendMagazinePaymentConfirmedEmail(ctx: OrderEmailContext) {
  if (!ctx.customerEmail) {
    return { success: false, error: "Customer email is missing" };
  }

  return sendBuyerEmail(
    ctx.customerEmail,
    `Payment confirmed: ${ctx.productTitle}`,
    emailShell(
      "Your magazine payment is confirmed",
      `
        <p>Hello ${ctx.customerName},</p>
        <p>
          Your payment for <strong>${ctx.productTitle}</strong> has been confirmed.
          Your secure magazine reader link will be sent to you shortly in a separate email.
        </p>
        ${buildOrderSummary(ctx)}
        <p>If you do not receive your reader link within a few hours, please contact the parish office.</p>
      `
    )
  );
}

export async function sendMerchandisePaymentConfirmedEmail(ctx: OrderEmailContext) {
  const deliveryText =
    ctx.deliveryPreference === "pickup"
      ? "We will contact you on the phone number provided to arrange collection at ACK St Paul's parish."
      : ctx.deliveryPreference === "delivery"
        ? "We will contact you to confirm delivery timing and address details."
        : "We will contact you to confirm how you would like to receive your item.";

  const buyerPromise = ctx.customerEmail
    ? sendBuyerEmail(
        ctx.customerEmail,
        `Payment confirmed: ${ctx.productTitle}`,
        emailShell(
          "Your merchandise order is confirmed",
          `
            <p>Hello ${ctx.customerName},</p>
            <p>
              Great news — your payment for <strong>${ctx.productTitle}</strong> has been confirmed.
            </p>
            ${buildOrderSummary(ctx)}
            <p>${deliveryText}</p>
            <p>Thank you for supporting ACK St Paul's parish shop.</p>
          `
        )
      )
    : Promise.resolve({ success: true });

  const adminPromise = sendAdminEmail(
    `Merchandise payment confirmed — ${ctx.customerName}`,
    emailShell(
      "Merchandise payment confirmed",
      `
        <p>Payment has been confirmed for a merchandise order. Please arrange fulfillment with the buyer.</p>
        ${buildOrderSummary(ctx)}
        <p style="margin-top: 20px;">
          ${emailButton(`${getBaseUrl()}/admin/orders`, "Open orders dashboard")}
        </p>
      `
    )
  );

  const [buyer, admin] = await Promise.all([buyerPromise, adminPromise]);
  return { buyer, admin };
}

export async function sendOrderRejectedEmail(
  ctx: OrderEmailContext,
  reason: string
) {
  const buyerPromise = ctx.customerEmail
    ? sendBuyerEmail(
        ctx.customerEmail,
        `Order update: ${ctx.productTitle}`,
        emailShell(
          "We could not confirm your payment",
          `
            <p>Hello ${ctx.customerName},</p>
            <p>
              We were unable to confirm your payment for <strong>${ctx.productTitle}</strong>.
            </p>
            <p><strong>Reason:</strong> ${reason}</p>
            ${buildOrderSummary(ctx)}
            <p>
              If you believe this is a mistake, please contact the parish office with your M-Pesa
              confirmation message and we will be happy to help.
            </p>
          `
        )
      )
    : Promise.resolve({ success: true });

  const adminPromise = sendAdminEmail(
    `Order rejected — ${ctx.customerName}`,
    emailShell(
      "Order rejected",
      `
        <p>An order was rejected by an admin.</p>
        <p><strong>Reason:</strong> ${reason}</p>
        ${buildOrderSummary(ctx)}
      `
    )
  );

  const [buyer, admin] = await Promise.all([buyerPromise, adminPromise]);
  return { buyer, admin };
}

export async function sendOrderFollowUpEmail(
  ctx: OrderEmailContext,
  message: string
) {
  if (!ctx.customerEmail) {
    return { success: false, error: "Customer email is missing" };
  }

  return sendBuyerEmail(
    ctx.customerEmail,
    `Action needed for your order: ${ctx.productTitle}`,
    emailShell(
      "We need a little more information",
      `
        <p>Hello ${ctx.customerName},</p>
        <p>
          Thank you for your order of <strong>${ctx.productTitle}</strong>.
          Before we can confirm your payment, we need the following:
        </p>
        <p style="padding: 12px 16px; background: #f3f4f6; border-radius: 8px;">
          ${message}
        </p>
        ${buildOrderSummary(ctx)}
        <p>
          Please reply to this email or call the parish office at your earliest convenience
          so we can complete your order.
        </p>
      `
    )
  );
}

export async function sendMerchandiseFulfillmentEmail(
  ctx: OrderEmailContext,
  status: FulfillmentStatus
) {
  const statusCopy: Record<
    Exclude<FulfillmentStatus, "pending" | "confirmed" | "cancelled">,
    { subject: string; title: string; body: string }
  > = {
    ready_for_pickup: {
      subject: `Ready for pickup: ${ctx.productTitle}`,
      title: "Your item is ready for collection",
      body: `
        <p>Hello ${ctx.customerName},</p>
        <p>
          Your order for <strong>${ctx.productTitle}</strong> is ready for collection
          at ACK St Paul's parish.
        </p>
        <p>Please visit the parish office during office hours or after Sunday service. Bring your phone number (${ctx.phone}) for verification.</p>
      `,
    },
    shipped: {
      subject: `On its way: ${ctx.productTitle}`,
      title: "Your order is out for delivery",
      body: `
        <p>Hello ${ctx.customerName},</p>
        <p>
          Your order for <strong>${ctx.productTitle}</strong> is on its way.
        </p>
        ${
          ctx.deliveryAddress
            ? `<p><strong>Delivery address:</strong> ${ctx.deliveryAddress}</p>`
            : ""
        }
        <p>Our team may call you on ${ctx.phone} to confirm arrival timing.</p>
      `,
    },
    delivered: {
      subject: `Delivered: ${ctx.productTitle}`,
      title: "Your order has been delivered",
      body: `
        <p>Hello ${ctx.customerName},</p>
        <p>
          Your order for <strong>${ctx.productTitle}</strong> has been marked as delivered.
        </p>
        <p>Thank you for shopping with ACK St Paul's. We hope you enjoy your purchase!</p>
      `,
    },
  };

  if (!(status in statusCopy)) {
    return { success: true };
  }

  const copy = statusCopy[status as keyof typeof statusCopy];
  const buyerPromise = ctx.customerEmail
    ? sendBuyerEmail(
        ctx.customerEmail,
        copy.subject,
        emailShell(copy.title, `${copy.body}${buildOrderSummary(ctx)}`)
      )
    : Promise.resolve({ success: true });

  const adminPromise = sendAdminEmail(
    `Fulfillment update: ${status.replaceAll("_", " ")} — ${ctx.customerName}`,
    emailShell(
      "Merchandise fulfillment updated",
      `
        <p>Order fulfillment status changed to <strong>${status.replaceAll("_", " ")}</strong>.</p>
        ${buildOrderSummary(ctx)}
      `
    )
  );

  const [buyer, admin] = await Promise.all([buyerPromise, adminPromise]);
  return { buyer, admin };
}

export async function sendOrderReopenedEmail(ctx: OrderEmailContext) {
  if (!ctx.customerEmail) {
    return { success: false, error: "Customer email is missing" };
  }

  return sendBuyerEmail(
    ctx.customerEmail,
    `Order under review: ${ctx.productTitle}`,
    emailShell(
      "Your order is being reviewed again",
      `
        <p>Hello ${ctx.customerName},</p>
        <p>
          Your order for <strong>${ctx.productTitle}</strong> is back under review by our team.
        </p>
        ${buildOrderSummary(ctx)}
        <p>We will contact you once the review is complete. Thank you for your patience.</p>
      `
    )
  );
}

export async function sendStkOrderInitiatedAdminEmail(ctx: OrderEmailContext) {
  return sendAdminEmail(
    `STK payment initiated — ${ctx.customerName}`,
    emailShell(
      "M-Pesa STK push sent",
      `
        <p>A customer initiated an M-Pesa STK payment. Awaiting phone confirmation.</p>
        ${buildOrderSummary(ctx)}
        <p style="margin-top: 20px;">
          ${emailButton(`${getBaseUrl()}/admin/orders`, "View orders")}
        </p>
      `
    )
  );
}

export function buildOrderEmailContext(payment: {
  id: string;
  amount: number;
  phone: string;
  mpesa_receipt?: string | null;
  metadata?: {
    email?: string;
    name?: string;
    title?: string;
    product_kind?: ProductKind;
    delivery_preference?: "pickup" | "delivery";
    delivery_address?: string;
  } | null;
}, productKind: ProductKind, productTitle?: string): OrderEmailContext {
  const metadata = payment.metadata || {};
  return {
    paymentId: payment.id,
    productKind,
    productTitle: productTitle || metadata.title || "Order item",
    amount: Number(payment.amount),
    phone: payment.phone,
    customerName: metadata.name || "Customer",
    customerEmail: metadata.email,
    mpesaReceipt: payment.mpesa_receipt,
    deliveryPreference: metadata.delivery_preference || null,
    deliveryAddress: metadata.delivery_address,
  };
}
