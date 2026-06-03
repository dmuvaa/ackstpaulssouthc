"use client";

import { useMemo, useState } from "react";
import type { MagazinePaymentRow } from "@/app/actions/orders";
import { OrderActions } from "@/components/admin/order-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Mail,
  Phone,
  Receipt,
  Search,
  User,
} from "lucide-react";

type OrderFilter = "all" | "pending" | "success" | "manual" | "delivered";

type OrdersWorkspaceProps = {
  payments: MagazinePaymentRow[];
};

function statusVariant(status: string) {
  if (status === "success") return "default";
  if (status === "failed") return "destructive";
  return "secondary";
}

function formatDate(value: string | null) {
  if (!value) return "Not sent";

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

function matchesFilter(payment: MagazinePaymentRow, filter: OrderFilter) {
  if (filter === "all") return true;
  if (filter === "manual") return payment.is_manual;
  if (filter === "delivered") return Boolean(payment.delivered_at);
  return payment.status === filter;
}

export function OrdersWorkspace({ payments }: OrdersWorkspaceProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<OrderFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(payments[0]?.id ?? null);

  const counts = useMemo(() => {
    return {
      all: payments.length,
      pending: payments.filter((payment) => payment.status === "pending").length,
      success: payments.filter((payment) => payment.status === "success").length,
      manual: payments.filter((payment) => payment.is_manual).length,
      delivered: payments.filter((payment) => payment.delivered_at).length,
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
    { label: "Paid", value: "success", count: counts.success },
    { label: "Manual", value: "manual", count: counts.manual },
    { label: "Delivered", value: "delivered", count: counts.delivered },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-xl flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, email, phone, M-Pesa code, or magazine"
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
        <div className="hidden grid-cols-[1.35fr_1fr_0.85fr_0.8fr_0.8fr_auto] gap-4 border-b bg-muted/40 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:grid">
          <span>Customer</span>
          <span>Magazine</span>
          <span>Payment</span>
          <span>Status</span>
          <span>Delivery</span>
          <span className="text-right">Action</span>
        </div>

        {filteredPayments.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No orders match this view.
          </div>
        ) : (
          filteredPayments.map((payment) => {
            const isExpanded = expandedId === payment.id;

            return (
              <div key={payment.id} className="border-b last:border-b-0">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : payment.id)}
                  className="grid w-full gap-4 px-4 py-4 text-left transition hover:bg-muted/30 lg:grid-cols-[1.35fr_1fr_0.85fr_0.8fr_0.8fr_auto] lg:items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {getInitials(payment.customer_name)}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-medium">{payment.customer_name}</div>
                      <div className="truncate text-xs text-muted-foreground">{payment.customer_email || "No email"}</div>
                      <div className="text-xs text-muted-foreground">{payment.phone || "No phone"}</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{payment.product_title}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(payment.created_at)}</div>
                  </div>
                  <div>
                    <div className="font-semibold">{formatCurrency(payment.amount)}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Receipt className="h-3 w-3" />
                      {payment.mpesa_receipt || "No code"}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={statusVariant(payment.status)}>{payment.status}</Badge>
                    {payment.is_manual && <Badge variant="secondary">Manual</Badge>}
                  </div>
                  <div>
                    {payment.delivered_at ? (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        Sent
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Waiting
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2 lg:justify-end">
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition ${isExpanded ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t bg-muted/20 px-4 py-4">
                    <div className="grid gap-4 xl:grid-cols-[1fr_1fr_auto]">
                      <Card>
                        <CardContent className="space-y-3 p-4">
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <User className="h-4 w-4" />
                            Buyer Details
                          </div>
                          <div className="grid gap-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="h-4 w-4" />
                              <span>{payment.customer_email || "No email captured"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="h-4 w-4" />
                              <span>{payment.phone || "No phone captured"}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="space-y-3 p-4">
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <Receipt className="h-4 w-4" />
                            Payment Trail
                          </div>
                          <dl className="grid gap-2 text-sm">
                            <div className="flex justify-between gap-4">
                              <dt className="text-muted-foreground">M-Pesa code</dt>
                              <dd className="font-medium">{payment.mpesa_receipt || "Not provided"}</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                              <dt className="text-muted-foreground">Checkout ref</dt>
                              <dd className="max-w-[220px] truncate font-mono text-xs">{payment.checkout_request_id}</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                              <dt className="text-muted-foreground">Delivery sent</dt>
                              <dd className="text-right">{formatDate(payment.delivered_at)}</dd>
                            </div>
                          </dl>
                        </CardContent>
                      </Card>

                      <div className="flex items-end justify-start xl:justify-end">
                        <OrderActions
                          paymentId={payment.id}
                          disabled={Boolean(payment.delivered_at)}
                        />
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
