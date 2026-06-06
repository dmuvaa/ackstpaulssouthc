"use client";

import { useMemo, useState } from "react";
import type { FulfillmentStatus, PurchasePaymentRow } from "@/app/actions/orders";
import { MerchandiseOrderActions } from "@/components/admin/merchandise-order-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  ChevronDown,
  Clock,
  MapPin,
  Package,
  Phone,
  Receipt,
  Search,
  Truck,
  User,
} from "lucide-react";

type OrderFilter =
  | "all"
  | "pending"
  | "confirmed"
  | "fulfillment"
  | "delivered"
  | "failed";

type MerchandiseOrdersWorkspaceProps = {
  payments: PurchasePaymentRow[];
};

function statusVariant(status: string) {
  if (status === "success") return "default";
  if (status === "failed") return "destructive";
  return "secondary";
}

function fulfillmentVariant(status: FulfillmentStatus) {
  if (status === "delivered") return "default";
  if (status === "cancelled") return "destructive";
  if (status === "pending") return "secondary";
  return "outline";
}

function formatDate(value: string | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "CU";
}

const fulfillmentLabels: Record<FulfillmentStatus, string> = {
  pending: "Awaiting confirmation",
  confirmed: "Confirmed",
  ready_for_pickup: "Ready for pickup",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function matchesFilter(payment: PurchasePaymentRow, filter: OrderFilter) {
  if (filter === "all") return true;
  if (filter === "pending") return payment.status === "pending";
  if (filter === "confirmed") {
    return (
      payment.status === "success" &&
      ["confirmed", "ready_for_pickup", "shipped"].includes(payment.fulfillment_status)
    );
  }
  if (filter === "fulfillment") {
    return ["ready_for_pickup", "shipped"].includes(payment.fulfillment_status);
  }
  if (filter === "delivered") return payment.fulfillment_status === "delivered";
  if (filter === "failed") return payment.status === "failed";
  return true;
}

export function MerchandiseOrdersWorkspace({
  payments,
}: MerchandiseOrdersWorkspaceProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<OrderFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(payments[0]?.id ?? null);

  const counts = useMemo(() => {
    return {
      all: payments.length,
      pending: payments.filter((payment) => payment.status === "pending").length,
      confirmed: payments.filter(
        (payment) =>
          payment.status === "success" &&
          ["confirmed", "ready_for_pickup", "shipped"].includes(
            payment.fulfillment_status
          )
      ).length,
      fulfillment: payments.filter((payment) =>
        ["ready_for_pickup", "shipped"].includes(payment.fulfillment_status)
      ).length,
      delivered: payments.filter(
        (payment) => payment.fulfillment_status === "delivered"
      ).length,
      failed: payments.filter((payment) => payment.status === "failed").length,
    };
  }, [payments]);

  const filteredPayments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return payments.filter((payment) => {
      const searchable = [
        payment.customer_name,
        payment.customer_email,
        payment.phone,
        payment.product_title,
        payment.delivery_address,
        payment.mpesa_receipt,
        payment.checkout_request_id,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesFilter(payment, filter) && searchable.includes(normalizedQuery);
    });
  }, [payments, filter, query]);

  const filters: Array<{ label: string; value: OrderFilter; count: number }> = [
    { label: "All", value: "all", count: counts.all },
    { label: "Pending", value: "pending", count: counts.pending },
    { label: "To fulfill", value: "confirmed", count: counts.confirmed },
    { label: "In transit", value: "fulfillment", count: counts.fulfillment },
    { label: "Delivered", value: "delivered", count: counts.delivered },
    { label: "Rejected", value: "failed", count: counts.failed },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Merchandise orders require physical handover. Confirm the M-Pesa payment first,
        then track whether the item is ready for parish pickup, out for delivery, or
        completed. Use{" "}
        <span className="font-medium text-foreground">Other Actions</span> to reject
        invalid payments, correct M-Pesa codes, or note collection arrangements.
      </p>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-xl flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search buyer, item, address, phone, or M-Pesa code"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <Button
              key={item.value}
              type="button"
              size="sm"
              variant={filter === item.value ? "default" : "outline"}
              onClick={() => setFilter(item.value)}
              className="gap-2"
            >
              {item.label}
              <Badge variant="secondary" className="bg-white/70 text-foreground">
                {item.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-md border">
        <div className="hidden grid-cols-[1.2fr_1fr_0.85fr_0.75fr_0.9fr_auto] gap-4 border-b bg-muted/40 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:grid">
          <span>Customer</span>
          <span>Item</span>
          <span>Payment</span>
          <span>Status</span>
          <span>Fulfillment</span>
          <span className="text-right">Details</span>
        </div>

        {filteredPayments.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No merchandise orders match this view.
          </div>
        ) : (
          filteredPayments.map((payment) => {
            const isExpanded = expandedId === payment.id;

            return (
              <div key={payment.id} className="border-b last:border-b-0">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : payment.id)}
                  className="grid w-full gap-4 px-4 py-4 text-left transition hover:bg-muted/30 lg:grid-cols-[1.2fr_1fr_0.85fr_0.75fr_0.9fr_auto] lg:items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-sm font-bold text-secondary-foreground">
                      {getInitials(payment.customer_name)}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-medium">{payment.customer_name}</div>
                      <div className="truncate text-xs text-muted-foreground">{payment.phone || "No phone"}</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{payment.product_title}</div>
                    <div className="text-xs text-muted-foreground">
                      {payment.delivery_preference === "pickup"
                        ? "Parish pickup"
                        : payment.delivery_preference === "delivery"
                          ? "Delivery"
                          : "Preference not set"}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">{formatCurrency(payment.amount)}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Receipt className="h-3 w-3" />
                      {payment.mpesa_receipt || "No code"}
                    </div>
                  </div>
                  <div>
                    <Badge variant={statusVariant(payment.status)}>{payment.status}</Badge>
                  </div>
                  <div>
                    <Badge variant={fulfillmentVariant(payment.fulfillment_status)}>
                      {fulfillmentLabels[payment.fulfillment_status]}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between gap-2 lg:justify-end">
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t bg-muted/20 px-4 py-4">
                    <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
                      <Card>
                        <CardContent className="space-y-3 p-4">
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <User className="h-4 w-4" />
                            Buyer &amp; Delivery
                          </div>
                          <div className="grid gap-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="h-4 w-4" />
                              <span>{payment.phone || "No phone captured"}</span>
                            </div>
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                              <span>
                                {payment.delivery_address ||
                                  (payment.delivery_preference === "pickup"
                                    ? "Parish pickup — contact buyer to arrange time"
                                    : "No delivery address provided")}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            Contact the buyer by phone after confirming payment to
                            coordinate collection at the parish or delivery within
                            South C and surrounding areas.
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="space-y-3 p-4">
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <Package className="h-4 w-4" />
                            Order Timeline
                          </div>
                          <dl className="grid gap-2 text-sm">
                            <div className="flex justify-between gap-4">
                              <dt className="text-muted-foreground">Ordered</dt>
                              <dd>{formatDate(payment.created_at)}</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                              <dt className="text-muted-foreground">M-Pesa code</dt>
                              <dd className="font-medium">{payment.mpesa_receipt || "Not provided"}</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                              <dt className="text-muted-foreground">Fulfillment</dt>
                              <dd>{fulfillmentLabels[payment.fulfillment_status]}</dd>
                            </div>
                          </dl>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Truck className="h-3.5 w-3.5" />
                            <Clock className="h-3.5 w-3.5" />
                            <span>
                              Update fulfillment as the order moves from confirmed →
                              ready → shipped → delivered.
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="xl:col-span-2">
                        <MerchandiseOrderActions payment={payment} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
