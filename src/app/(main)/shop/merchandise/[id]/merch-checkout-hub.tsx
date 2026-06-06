"use client";

import { Merchandise } from "@/types";
import { MerchClient } from "./merch-client";
import { MerchManualCheckout } from "./merch-manual-checkout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Receipt, Smartphone } from "lucide-react";

interface MerchCheckoutHubProps {
  merch: Merchandise;
  imageUrl: string;
}

export function MerchCheckoutHub({ merch, imageUrl }: MerchCheckoutHubProps) {
  return (
    <Tabs defaultValue="paybill" className="w-full">
      <div className="container mx-auto max-w-5xl px-4 pt-8">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="paybill" className="gap-2">
            <Receipt className="h-4 w-4" />
            PayBill
          </TabsTrigger>
          <TabsTrigger value="stk" className="gap-2">
            <Smartphone className="h-4 w-4" />
            M-Pesa STK
          </TabsTrigger>
        </TabsList>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Pay via PayBill (recommended — same process as magazine purchases) or use
          instant M-Pesa STK push on your phone. Both methods create an order the
          parish office will confirm before arranging pickup or delivery.
        </p>
      </div>

      <TabsContent value="paybill">
        <MerchManualCheckout merch={merch} imageUrl={imageUrl} />
      </TabsContent>

      <TabsContent value="stk">
        <MerchClient merch={merch} imageUrl={imageUrl} />
      </TabsContent>
    </Tabs>
  );
}
