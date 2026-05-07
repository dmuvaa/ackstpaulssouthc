"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Heart, Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const roles = [
  "Welcoming and seating congregants",
  "Maintaining order and flow during services",
  "Distributing hymn books and service sheets",
  "Supporting offertory and thanksgiving collections",
  "Assisting visitors and guiding them within the church",
  "Supporting special services (Weddings & Funerals)"
];

const values = [
  { icon: Heart, title: "Hospitality", desc: "Warmth and kindness to all who enter." },
  { icon: ShieldCheck, title: "Order", desc: "Ensuring smooth and respectful services." },
  { icon: Star, title: "Alertness", desc: "Awareness of congregational needs." },
  { icon: Users, title: "Service", desc: "Serving God through people." }
];

export default function UshersPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-primary">
        <Image
          src="/images/congregation.jpg"
          alt="Ushers Ministry"
          fill
          className="object-cover brightness-[0.3]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Badge className="bg-secondary text-white px-4 py-1.5 text-sm uppercase tracking-widest font-bold">
              Ministry of Presence & Hospitality
            </Badge>
            <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
              Ushers <span className="text-accent">Ministry</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-200 sm:text-xl font-medium">
              Doorkeepers of the sanctuary, called to serve with humility, excellence, and attentiveness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-primary">Serving at the Doors of Worship</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                At ACK St. Paul’s South C, the Ushers Ministry is a cornerstone of every worship service. Ushers are the first point of contact, creating a welcoming and organized environment where worshippers can encounter God without distraction.
              </p>
              <p>
                They are more than volunteers—they are doorkeepers of the sanctuary, called to serve with humility, excellence, and attentiveness.
              </p>
            </div>
            <div className="bg-muted p-8 rounded-2xl border-l-4 border-secondary italic text-lg text-primary">
              "To welcome with warmth is to prepare hearts for worship."
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map((value, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border shadow-sm text-center"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-primary mb-1">{value.title}</h3>
                <p className="text-xs text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Do Ushers Do?</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              The Ushers Ministry ensures that every service runs smoothly through dedicated service in various practical roles.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-white/5 p-6 rounded-xl border border-white/10"
              >
                <CheckCircle2 className="h-6 w-6 text-accent shrink-0" />
                <span className="font-medium">{role}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-primary">Join the Ushers Ministry</h2>
          <p className="text-xl text-muted-foreground">
            Do you feel called to serve in church hospitality and order? We welcome new members who are committed to serving with dedication and excellence.
          </p>
          <div className="bg-secondary/10 p-10 rounded-[3rem] border-2 border-secondary/20">
            <h3 className="text-2xl font-bold text-primary mb-4">How to Join</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Visit the church office or speak to the People’s Warden after service.
            </p>
            <Button size="lg" variant="gold" className="h-14 px-10 text-lg font-bold">
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
