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
import { CheckCircle2, Loader2, Receipt } from "lucide-react";

interface ProductClientProps {
  magazine: Product;
  imageUrl: string;
}

export function ProductClient({ magazine, imageUrl }: ProductClientProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mpesaCode, setMpesaCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !mpesaCode) {
      toast.error("Please fill in all payment details");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch("/api/manual-payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: magazine.id,
          name,
          email,
          phone,
          mpesa_code: mpesaCode,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        toast.success("Payment submitted for confirmation.");
      } else {
        toast.error(data.error || "Payment submission failed");
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
              {submitted ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Payment Submitted</h3>
                  <p className="text-muted-foreground mb-4">
                    Your M-Pesa details have been sent for manual confirmation.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Once confirmed, you will receive an email with your secure magazine link.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    Buy this Magazine
                  </h3>
                  <div className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
                    Pay KES {magazine.price} to the church PayBill, then submit the M-Pesa confirmation code below.
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isProcessing}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isProcessing}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">M-Pesa Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="e.g. 0712345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isProcessing}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mpesaCode">M-Pesa Code</Label>
                    <Input
                      id="mpesaCode"
                      type="text"
                      placeholder="e.g. RFT123ABC4"
                      value={mpesaCode}
                      onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
                      disabled={isProcessing}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting Payment...
                      </>
                    ) : (
                      "Submit Payment Details"
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
