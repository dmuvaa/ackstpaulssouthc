"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Merchandise } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Loader2, MapPin, Receipt } from "lucide-react";

interface MerchManualCheckoutProps {
  merch: Merchandise;
  imageUrl: string;
}

export function MerchManualCheckout({ merch, imageUrl }: MerchManualCheckoutProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mpesaCode, setMpesaCode] = useState("");
  const [deliveryPreference, setDeliveryPreference] = useState<"pickup" | "delivery">(
    "pickup"
  );
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !mpesaCode) {
      toast.error("Please fill in all required details");
      return;
    }
    if (deliveryPreference === "delivery" && !deliveryAddress.trim()) {
      toast.error("Please provide a delivery address");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch("/api/manual-merchandise-payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchandise_id: merch.id,
          name,
          email,
          phone,
          mpesa_code: mpesaCode,
          delivery_preference: deliveryPreference,
          delivery_address: deliveryAddress,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        toast.success("Order submitted for confirmation.");
      } else {
        toast.error(data.error || "Order submission failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <Link
        href="/shop"
        className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Link>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted shadow-2xl">
          <Image
            src={imageUrl || "/images/communion.jpg"}
            alt={merch.title}
            fill
            unoptimized
            className="object-contain p-6"
          />
          <div className="absolute left-4 top-4 flex gap-2">
            <Badge className="bg-white/90 text-primary hover:bg-white">
              {merch.category}
            </Badge>
            {merch.in_stock ? (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                In Stock
              </Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="mb-2 text-4xl font-bold">{merch.title}</h1>
          <p className="mb-6 text-2xl font-semibold text-primary">KES {merch.price}</p>

          <div className="prose prose-slate mb-8">
            <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
              {merch.description || "No description provided."}
            </p>
          </div>

          <Card className="border-primary/20 shadow-md">
            <CardContent className="p-6">
              {submitted ? (
                <div className="py-6 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
                  <h3 className="mb-2 text-xl font-bold">Order Submitted</h3>
                  <p className="mb-4 text-muted-foreground">
                    Your M-Pesa details have been sent for manual confirmation by the
                    parish office.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Once your payment is verified, we will contact you on{" "}
                    <span className="font-medium text-foreground">{phone}</span> to
                    arrange{" "}
                    {deliveryPreference === "pickup"
                      ? "collection at ACK St Paul's"
                      : "delivery to your address"}
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-4">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <Receipt className="h-5 w-5" />
                    Order this Item
                  </h3>

                  <div className="rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-950">
                    <p className="font-semibold">
                      Pay KES {merch.price} to the church PayBill, then submit your
                      M-Pesa confirmation code and delivery details below.
                    </p>
                    <div className="mt-3 grid gap-2">
                      <div className="flex items-center justify-between gap-4 rounded bg-white/70 px-3 py-2">
                        <span className="font-medium text-green-800">PayBill No.</span>
                        <span className="font-bold tracking-wide">308937</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 rounded bg-white/70 px-3 py-2">
                        <span className="font-medium text-green-800">Account Name</span>
                        <span className="text-right font-bold">Your phone number</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isProcessing || !merch.in_stock}
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
                      disabled={isProcessing || !merch.in_stock}
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
                      disabled={isProcessing || !merch.in_stock}
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
                      disabled={isProcessing || !merch.in_stock}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      How would you like to receive your item?
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={deliveryPreference === "pickup" ? "default" : "outline"}
                        onClick={() => setDeliveryPreference("pickup")}
                        disabled={isProcessing || !merch.in_stock}
                        className="h-auto py-3"
                      >
                        <div className="text-left">
                          <p className="font-semibold">Parish pickup</p>
                          <p className="text-xs opacity-80">Collect at ACK St Paul&apos;s</p>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        variant={deliveryPreference === "delivery" ? "default" : "outline"}
                        onClick={() => setDeliveryPreference("delivery")}
                        disabled={isProcessing || !merch.in_stock}
                        className="h-auto py-3"
                      >
                        <div className="text-left">
                          <p className="font-semibold">Delivery</p>
                          <p className="text-xs opacity-80">We bring it to you</p>
                        </div>
                      </Button>
                    </div>
                  </div>

                  {deliveryPreference === "delivery" && (
                    <div className="space-y-2">
                      <Label htmlFor="deliveryAddress">Delivery Address</Label>
                      <Textarea
                        id="deliveryAddress"
                        placeholder="Street, estate, landmark — e.g. South C, Muhoho Avenue near Naivas"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        disabled={isProcessing || !merch.in_stock}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Delivery is arranged after payment confirmation. A parish team
                        member will call you to confirm timing.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isProcessing || !merch.in_stock}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting Order...
                      </>
                    ) : (
                      "Submit Order Details"
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
