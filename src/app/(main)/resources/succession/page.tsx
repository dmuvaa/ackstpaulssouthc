"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Scale, Heart, ShieldCheck, BookOpen, Quote, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const pillars = [
  { icon: ShieldCheck, title: "Stewardship", desc: "Understanding that what we own is entrusted to us by God for a season." },
  { icon: Scale, title: "Justice & Fairness", desc: "Ensuring dignity and protection for widows, children, and dependants." },
  { icon: Heart, title: "Family Peace", desc: "Using thoughtful planning to prevent conflict and preserve unity." },
];

export default function SuccessionPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Badge className="bg-accent text-primary px-4 py-1.5 text-sm uppercase tracking-widest font-bold">
              Christian Stewardship
            </Badge>
            <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
              Succession in <br/><span className="text-accent">Christian Families</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-slate-300">
              Understanding stewardship, justice, and faith in matters of inheritance.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-primary" />
        </div>
      </section>

      {/* Intro Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-secondary">
              <Info className="h-6 w-6" />
              <span className="font-bold uppercase tracking-widest text-sm">Biblical Foundation</span>
            </div>
            <h2 className="text-4xl font-bold text-primary">A Matter of Faith & Responsibility</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Succession, commonly known as inheritance, is a legal process governed by Kenya’s Law of Succession Act. For Christians, it is also a matter of stewardship, faith, and responsibility.
              </p>
              <p>
                Scripture reminds us: “The earth is the Lord’s, and everything in it” (Psalm 24:1). What we own is entrusted to us by God. How we plan and distribute it should reflect wisdom, fairness, and accountability.
              </p>
              <p>
                Proverbs 13:22 teaches that a good person leaves an inheritance for future generations. Thoughtful planning is therefore an act of love—it protects families from conflict and ensures dignity for those left behind.
              </p>
            </div>
          </div>
          <div className="grid gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 10 }}
                className="flex gap-6 bg-white p-8 rounded-3xl border shadow-sm transition-all"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                  <p.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-primary mb-2">{p.title}</h4>
                  <p className="text-muted-foreground">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action/Insight Section */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
              <Quote className="h-12 w-12 text-secondary mx-auto opacity-50" />
              <h3 className="text-3xl font-bold text-primary">Pursuing Peace & Justice</h3>
              <p className="text-xl text-muted-foreground italic">
                “To act justly, love mercy, and walk humbly” (Micah 6:8). This is especially critical where widows, children, and dependants may be vulnerable.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white p-10 rounded-[3rem] border border-primary/5 shadow-sm text-left">
                <h4 className="font-bold text-2xl text-primary mb-4"> earthly Inheritance</h4>
                <p className="text-muted-foreground leading-relaxed">
                  While we plan for the future of our families on earth, we are called to pursue peace, practice transparency, and resist greed or entitlement.
                </p>
              </div>
              <div className="bg-primary text-white p-10 rounded-[3rem] shadow-xl text-left">
                <h4 className="font-bold text-2xl text-accent mb-4">True Inheritance</h4>
                <p className="text-slate-200 leading-relaxed">
                  Above all, we remember that earthly inheritance is temporary. Our true inheritance is eternal—“heirs of God and co-heirs with Christ” (Romans 8:17).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
