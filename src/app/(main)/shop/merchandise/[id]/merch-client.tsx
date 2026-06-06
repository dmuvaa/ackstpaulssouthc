"use client";

import { useState } from "react";
import Image from "next/image";
import { Merchandise } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ShoppingCart, CheckCircle2, Loader2, Package, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface MerchClientProps {
  merch: Merchandise;
  imageUrl: string;
}

export function MerchClient({ merch, imageUrl }: MerchClientProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.error("Please enter your name, email, and M-Pesa phone number");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch("/api/mpesa/stk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          amount: merch.price,
          type: "purchase",
          product_id: merch.id,
          metadata: {
            product_kind: "merchandise",
            name,
            email,
            title: merch.title,
            category: merch.category,
            fulfillment: {
              status: "pending",
            },
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
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Link 
        href="/shop" 
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Section */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border shadow-sm p-8 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={imageUrl || "/images/communion.jpg"}
              alt={merch.title}
              fill
              unoptimized
              className="object-contain"
            />
          </div>
          <div className="absolute top-6 left-6 flex gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-1 font-bold">
              {merch.category}
            </Badge>
          </div>
        </div>

        {/* Details & Checkout Section */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight text-primary uppercase">{merch.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-black text-secondary">KES {merch.price}</span>
              {merch.in_stock ? (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 py-1 font-bold">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive" className="font-bold px-3 py-1">Out of Stock</Badge>
              )}
            </div>
            
            <div className="prose prose-slate max-w-none mb-10">
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {merch.description || "No description provided for this item."}
              </p>
            </div>
          </div>

          <Card className="border-none bg-muted/30 shadow-none rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              {checkoutId ? (
                <div className="text-center py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3 text-primary">Payment Sent!</h3>
                  <p className="text-muted-foreground mb-6 text-lg">
                    Check your phone for the M-Pesa prompt. Enter your PIN to pay **KES {merch.price}**.
                  </p>
                  <div className="bg-white/50 p-4 rounded-2xl border border-white">
                    <p className="text-sm text-muted-foreground font-medium">
                      Once payment is confirmed, we will email you at {email} and contact you on {phone} to arrange collection or delivery.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary rounded-lg text-white">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-xl uppercase tracking-tight text-primary">Purchase Item</h3>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="stk-name" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                    <Input
                      id="stk-name"
                      type="text"
                      placeholder="Your name"
                      className="h-12 rounded-2xl border-none shadow-inner bg-white focus-visible:ring-primary"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isProcessing || !merch.in_stock}
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="stk-email" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Email Address</Label>
                    <Input
                      id="stk-email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-12 rounded-2xl border-none shadow-inner bg-white focus-visible:ring-primary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isProcessing || !merch.in_stock}
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">M-Pesa Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="e.g. 0712345678"
                      className="h-14 text-lg rounded-2xl border-none shadow-inner bg-white focus-visible:ring-primary"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isProcessing || !merch.in_stock}
                      required
                    />
                    <p className="text-xs text-muted-foreground font-medium">
                      An STK push will be sent to this number. Order updates will be emailed to you.
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-16 text-xl font-black uppercase tracking-tighter rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-95" 
                    disabled={isProcessing || !merch.in_stock}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay KES ${merch.price} via M-Pesa`
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-muted-foreground">
             <div className="flex items-center gap-2 text-sm font-bold">
               <Package className="h-4 w-4" />
               Parish Collection
             </div>
             <div className="w-1 h-1 bg-muted-foreground rounded-full" />
             <div className="flex items-center gap-2 text-sm font-bold">
               <CheckCircle2 className="h-4 w-4" />
               Secure Payment
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
