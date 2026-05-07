"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ShoppingCart, CheckCircle2, Loader2, FileText, ImageIcon } from "lucide-react";

interface ProductClientProps {
  magazine: Product;
  imageUrl: string;
}

export function ProductClient({ magazine, imageUrl }: ProductClientProps) {
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast.error("Please enter your M-Pesa phone number");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch("/api/mpesa/stk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          amount: magazine.price,
          type: "purchase",
          product_id: magazine.id,
          metadata: {
            title: magazine.title
          }
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCheckoutId(data.checkout_request_id);
        toast.success("STK Push sent! Please check your phone to complete payment.");
      } else {
        toast.error(data.error || "Payment failed to initiate");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border bg-muted">
          <Image
            src={imageUrl || "/images/communion.jpg"}
            alt={magazine.title}
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-white/90 text-primary hover:bg-white">{magazine.type}</Badge>
          </div>
        </div>

        {/* Details & Checkout Section */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">{magazine.title}</h1>
          <p className="text-2xl text-primary font-semibold mb-6">KES {magazine.price}</p>
          
          <div className="prose prose-slate mb-8">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {magazine.description || "No description provided."}
            </p>
          </div>

          <Card className="border-primary/20 shadow-md">
            <CardContent className="p-6">
              {checkoutId ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Payment Initiated</h3>
                  <p className="text-muted-foreground mb-4">
                    Please check your phone and enter your M-Pesa PIN to complete the purchase of KES {magazine.price}.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Once paid, you will receive an email with your secure download link.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Buy this Magazine
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="phone">M-Pesa Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="e.g. 0712345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isProcessing}
                    />
                    <p className="text-xs text-muted-foreground">
                      We will send an STK push to this number.
                    </p>
                  </div>
                  <Button type="submit" className="w-full" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Initiating Payment...
                      </>
                    ) : (
                      `Pay KES ${magazine.price} via M-Pesa`
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
