"use client";

import { ShoppingBag, Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Sales & Transactions</h2>
        <p className="text-muted-foreground">Monitor magazine purchases and resource fulfillment.</p>
      </div>

      <Card className="border-dashed border-2 bg-muted/30">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center text-primary">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold flex items-center justify-center gap-2">
              <Construction className="h-5 w-5 text-secondary" />
              Sales Dashboard Coming Soon
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              We are finalizing the transaction management system. Soon you will be able to view all magazine sales, verify M-Pesa payments, and track digital fulfillments in one place.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
