"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Smartphone, CheckCircle2, Target, Users } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { logDonation } from "@/app/actions/donations";
import { getActiveCauses } from "@/app/actions/causes";
import { DonationCause } from "@/types";

export default function DonatePage() {
  const [amount, setAmount] = useState("");
  const [cause, setCause] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [causes, setCauses] = useState<DonationCause[]>([]);
  const [isLoadingCauses, setIsLoadingCauses] = useState(true);

  useEffect(() => {
    async function loadCauses() {
      const activeCauses = await getActiveCauses();
      setCauses(activeCauses);
      if (activeCauses.length > 0) {
        setCause(activeCauses[0].title);
      }
      setIsLoadingCauses(false);
    }
    loadCauses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }
    if (!phone) {
      toast.error("Please enter your M-Pesa phone number");
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
        toast.success("M-Pesa prompt sent!");
      }
    } else {
      toast.error(result.error || "Something went wrong.");
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center min-h-[80vh]">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-100 p-8 rounded-full mb-8 text-green-600 shadow-xl"
        >
          <CheckCircle2 className="h-20 w-20" />
        </motion.div>
        <h1 className="text-5xl font-black text-primary mb-6">God Bless You!</h1>
        <p className="text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Your donation of <span className="text-primary font-bold">KES {amount}</span> for <span className="text-secondary font-bold">{cause.toUpperCase()}</span> has been initiated. 
          Please check your phone for the M-Pesa prompt to complete your gift.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => setSubmitted(false)} variant="gold" size="lg" className="h-14 px-10 text-lg font-bold">
            Make Another Donation
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg font-bold">
            <a href="/">Back Home</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen">
      {/* Header Content Section */}
      <section className="bg-slate-50 pb-12 pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1.5 text-sm uppercase tracking-widest font-bold">
                Stewards of Grace
              </Badge>
              <h1 className="text-4xl md:text-7xl font-black text-primary tracking-tight">
                Generosity <span className="text-secondary">& Giving</span>
              </h1>
              <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto italic">
                "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-16 lg:grid-cols-2 items-start max-w-7xl mx-auto">
          {/* Inspiration Section */}
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-primary">Your Gift Makes <br/><span className="text-secondary text-5xl">An Eternal Impact</span></h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  When you give to ACK St. Paul's South C, you're not just donating to a church—you're investing in lives transformed by the Gospel.
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  { icon: Heart, title: "Mission & Outreach", desc: "Taking the Gospel to prisons, schools, and the streets of South C." },
                  { icon: Users, title: "Youth & Sunday School", desc: "Equipping the next generation with a strong foundation of faith." },
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Live Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-primary flex items-center gap-3">
                  <Target className="text-secondary h-6 w-6" />
                  Live Donation Goals
                </h3>
                <Badge variant="outline" className="text-secondary border-secondary">Real-time Updates</Badge>
              </div>

              <div className="grid gap-6">
                {isLoadingCauses ? (
                  <div className="h-32 flex items-center justify-center bg-white rounded-3xl border border-dashed border-slate-200">
                    <p className="text-muted-foreground animate-pulse">Loading active causes...</p>
                  </div>
                ) : causes.length === 0 ? (
                  <div className="p-8 bg-white rounded-3xl border border-slate-100 text-center">
                    <p className="text-muted-foreground">General Tithe & Offering</p>
                  </div>
                ) : (
                  causes.map((item) => {
                    const percentage = Math.min(Math.round((item.current_amount / item.target_amount) * 100), 100);
                    return (
                      <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                        <div className="flex justify-between items-end">
                          <div>
                            <h4 className="text-xl font-black text-primary mb-1">{item.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-1">{item.description || "Support this divine cause"}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-black text-secondary">{percentage}%</span>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Complete</p>
                          </div>
                        </div>
                        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-secondary to-accent"
                          />
                        </div>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                          <span className="text-slate-500">Raised: KES {item.current_amount.toLocaleString()}</span>
                          <span className="text-primary">Target: KES {item.target_amount.toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>

          {/* Donation Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32"
          >
            <Card className="rounded-[3rem] overflow-hidden border-none shadow-2xl bg-white p-2">
              <Tabs defaultValue="stk" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-16 rounded-t-[2.5rem] bg-slate-50 p-2">
                  <TabsTrigger value="stk" className="rounded-full text-lg font-bold data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                    M-Pesa Express
                  </TabsTrigger>
                  <TabsTrigger value="paybill" className="rounded-full text-lg font-bold data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                    Manual Paybill
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="stk" className="p-8 space-y-8">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black text-primary">Instant M-Pesa Giving</h3>
                    <p className="text-muted-foreground">Enter details below and get a prompt on your phone.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold uppercase tracking-wider text-slate-500">Amount to Give</Label>
                      <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-300">KES</span>
                        <Input 
                          placeholder="0.00" 
                          className="pl-24 h-20 text-3xl font-black rounded-2xl border-2 border-slate-100 focus:border-secondary transition-all"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center pt-2">
                        {["500", "1000", "5000", "10000"].map((p) => (
                          <Button 
                            key={p} 
                            type="button" 
                            variant="outline" 
                            className={`rounded-full px-6 h-10 font-bold transition-all ${amount === p ? "bg-secondary border-secondary text-white" : "hover:border-secondary hover:text-secondary"}`}
                            onClick={() => setAmount(p)}
                          >
                            KES {p}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-bold uppercase tracking-wider text-slate-500">Giving To</Label>
                      <select 
                        className="w-full h-14 rounded-2xl border-2 border-slate-100 bg-white px-6 font-bold text-primary focus:border-secondary transition-all appearance-none outline-none"
                        value={cause}
                        onChange={(e) => setCause(e.target.value)}
                        disabled={isLoadingCauses}
                      >
                        {isLoadingCauses ? (
                          <option>Loading causes...</option>
                        ) : causes.length === 0 ? (
                          <option value="general">General Tithe / Offering</option>
                        ) : (
                          causes.map(c => (
                            <option key={c.id} value={c.title}>{c.title}</option>
                          ))
                        )}
                        <option value="general">General Tithe / Offering</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-bold uppercase tracking-wider text-slate-500">Phone Number</Label>
                      <Input 
                        placeholder="07XX XXX XXX" 
                        className="h-14 rounded-2xl border-2 border-slate-100 px-6 font-bold text-xl"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="gold" 
                      className="w-full h-20 rounded-2xl text-2xl font-black gap-3 shadow-xl hover:shadow-2xl transition-all"
                      disabled={isPending}
                    >
                      {isPending ? "Sending Prompt..." : (
                        <>
                          <Heart className="h-7 w-7 fill-current" />
                          Send M-Pesa Prompt
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="paybill" className="p-8 space-y-8">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black text-primary">Manual M-Pesa Paybill</h3>
                    <p className="text-muted-foreground">Follow these steps to pay from your toolkit.</p>
                  </div>

                  <div className="bg-slate-50 rounded-3xl p-8 space-y-6 border border-slate-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Paybill Number</p>
                        <p className="text-3xl font-black text-primary">308937</p>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Account Name</p>
                        <p className="text-xl font-black text-secondary">Tithe / (Cause)</p>
                      </div>
                    </div>

                    <ol className="space-y-4">
                      {[
                        "Select Lipa na M-PESA > Pay Bill",
                        "Enter Business Number: 308937",
                        "Enter Account: e.g. Tithe",
                        "Enter Amount & M-PESA PIN",
                      ].map((step, i) => (
                        <li key={i} className="flex gap-4 items-center">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-white font-bold text-sm">
                            {i + 1}
                          </span>
                          <span className="font-bold text-primary">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="text-center p-6 bg-secondary/5 rounded-2xl border border-secondary/10">
                    <p className="text-sm text-secondary font-bold">Thank you for your faithful stewardship!</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
