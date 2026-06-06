"use client";

import type { PurchasePaymentRow } from "@/app/actions/orders";
import { MerchandiseOrdersWorkspace } from "@/components/admin/merchandise-orders-workspace";
import { OrdersWorkspace } from "@/components/admin/orders-workspace";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Package } from "lucide-react";

type OrdersHubProps = {
  magazinePayments: PurchasePaymentRow[];
  merchandisePayments: PurchasePaymentRow[];
};

export function OrdersHub({
  magazinePayments,
  merchandisePayments,
}: OrdersHubProps) {
  const magazinePending = magazinePayments.filter(
    (payment) => payment.status === "pending"
  ).length;
  const merchandisePending = merchandisePayments.filter(
    (payment) => payment.status === "pending"
  ).length;

  return (
    <Tabs defaultValue="magazines" className="space-y-4">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="magazines" className="gap-2">
          <BookOpen className="h-4 w-4" />
          Magazines
          {magazinePending > 0 && (
            <Badge variant="secondary" className="ml-1">
              {magazinePending}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="merchandise" className="gap-2">
          <Package className="h-4 w-4" />
          Merchandise
          {merchandisePending > 0 && (
            <Badge variant="secondary" className="ml-1">
              {merchandisePending}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="magazines" className="space-y-2">
        <OrdersWorkspace payments={magazinePayments} />
      </TabsContent>

      <TabsContent value="merchandise" className="space-y-2">
        <MerchandiseOrdersWorkspace payments={merchandisePayments} />
      </TabsContent>
    </Tabs>
  );
}
