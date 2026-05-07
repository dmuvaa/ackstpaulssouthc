"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Smartphone, CreditCard, CheckCircle2, ChevronRight } from "lucide-react";
import { toast } from "sonner";

import { logDonation } from "@/app/actions/donations";

export default function DonatePage() {
  const [amount, setAmount] = useState("");
  const [cause, setCause] = useState("general");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }

    setIsPending(true);
    const result = await logDonation({
      amount: parseFloat(amount),
      cause,
      name,
      phone_number: phone,
    });

    setIsPending(false);

    if (result.success) {
      setSubmitted(true);
      if (result.stkSent) {
        toast.success("M-Pesa prompt sent! Check your phone to complete payment.");
      } else {
        toast.success("Donation logged! Please use the Paybill instructions to complete payment.");
      }
    } else {
      toast.error(result.error || "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-100 p-6 rounded-full mb-8 text-green-600"
        >
          <CheckCircle2 className="h-16 w-16" />
        </motion.div>
        <h1 className="text-4xl font-bold text-primary mb-4">God Bless You!</h1>
        <p className="text-xl text-muted-foreground max-w-md mb-8">
          Your donation of KES {amount} has been logged. 
          {phone ? (
            <> A prompt has been sent to <strong>{phone}</strong>. Please enter your M-Pesa PIN to complete the transaction.</>
          ) : (
            <> Please follow the M-Pesa instructions below to complete your payment.</>
          )}
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline">
          Make Another Donation
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-primary py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Giving to ACK St Paul's</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="shadow-lg border-primary/10">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Donation Details</CardTitle>
                <CardDescription>Tell us about your gift to help us track it correctly.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (KES)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground font-bold">KES</span>
                      <Input 
                        id="amount" 
                        placeholder="0.00" 
                        className="pl-12 text-lg h-12"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {["500", "1000", "2000", "5000"].map((preset) => (
                        <Button 
                          key={preset}
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => setAmount(preset)}
                          className={amount === preset ? "bg-primary text-white border-primary" : ""}
                        >
                          {preset}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cause">Giving Cause / Purpose</Label>
                    <select 
                      id="cause"
                      className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={cause}
                      onChange={(e) => setCause(e.target.value)}
                    >
                      <option value="general">General Tithe / Offering</option>
                      <option value="building">Building Fund</option>
                      <option value="youth">Youth Ministry</option>
                      <option value="charity">CSR / Outreach</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name (Optional)</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      className="h-12" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (M-Pesa)</Label>
                    <Input 
                      id="phone" 
                      placeholder="0700 000 000" 
                      className="h-12" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="gold" 
                    className="w-full h-12 text-lg font-bold gap-2"
                    disabled={isPending}
                  >
                    {isPending ? "Logging..." : (
                      <>
                        <Heart className="h-5 w-5" />
                        Log Donation
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Instructions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-secondary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Smartphone className="h-24 w-24 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <Smartphone className="h-6 w-6 text-secondary" />
                M-Pesa Paybill Instructions
              </h3>
              
              <ol className="space-y-6 relative z-10">
                {[
                  "Go to M-PESA menu on your phone",
                  "Select Lipa na M-PESA",
                  "Select Pay Bill",
                  "Enter Business Number: 308937",
                  "Enter Account Number: (Your Name or Cause)",
                  "Enter the Amount",
                  "Enter your M-PESA PIN and Send",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-white font-bold text-sm">
                      {i + 1}
                    </span>
                    <span className="text-lg text-muted-foreground pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                <CreditCard className="h-5 w-5" />
                Other Ways to Give
              </h4>
              <p className="text-sm text-muted-foreground">
                For bank transfers, international giving (WorldRemit/Western Union), or cheques, please contact the church office at <strong>+254 700 000000</strong>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
