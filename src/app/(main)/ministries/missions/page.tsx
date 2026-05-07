"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Globe, BookOpen, HeartHandshake as Hands, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const pillars = [
  { 
    icon: Globe, 
    title: "Evangelism & Outreach", 
    desc: "Street evangelism, home visits, and special outreach events to bring the message of salvation to the community." 
  },
  { 
    icon: BookOpen, 
    title: "Discipleship & Growth", 
    desc: "Bible study groups, mentorship, and training sessions to equip believers as ambassadors of Christ." 
  },
  { 
    icon: Heart, 
    title: "Humanitarian Support", 
    desc: "Practical support through food drives, medical camps, and social empowerment programs." 
  }
];

const waysToJoin = [
  "Volunteer in outreach missions",
  "Join discipleship programs",
  "Support missions financially",
  "Commit to intercessory prayer"
];

export default function MissionsPage() {
  return (
    <div className="flex flex-col">
      {/* Image Banner Section */}
      <section className="bg-slate-50 pt-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
          >
            <Image
              src="/images/missions.jpeg"
              alt="Missions Ministry"
              fill
              className="object-cover object-top"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Header Content Section */}
      <section className="bg-slate-50 pb-20 pt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1.5 text-sm uppercase tracking-widest font-bold">
                The Great Commission
              </Badge>
              <h1 className="text-4xl md:text-7xl font-black text-primary tracking-tight">
                Missions <span className="text-secondary">Department</span>
              </h1>
              <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto">
                “Go therefore and make disciples of all nations…” — Matthew 28:19
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-primary">The Heartbeat of Our Faith</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                At A.C.K. St. Paul’s South C, the Missions Department is dedicated to spreading the Gospel, nurturing believers, and extending Christ’s love through acts of service.
              </p>
              <p>
                Guided by Isaiah 60:1 — “Arise, shine, for your light has come” — we inspire and mobilize the church to actively participate in evangelism and humanitarian outreach.
              </p>
            </div>
          </div>
          <div className="bg-muted p-10 rounded-[3rem] border border-primary/10">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <Sparkles className="text-secondary" /> Our Core Vision
            </h3>
            <p className="text-lg text-muted-foreground italic leading-relaxed">
              "To see transformed lives and communities as we share the message of salvation and God’s unconditional love."
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Three Core Pillars</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              How we demonstrate the Gospel in word and action within our community and beyond.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-3xl border shadow-sm transition-all"
              >
                <div className="h-16 w-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-8">
                  <pillar.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[4rem] text-white overflow-hidden relative p-12 lg:p-20 text-center max-w-5xl mx-auto">
            <div className="space-y-8 relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold">Be Part of the Mission</h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                The mission field is vast, and there’s a place for everyone. Join us in fulfilling this divine calling.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {waysToJoin.map((way, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span className="font-medium text-slate-200">{way}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6">
                <Button size="lg" variant="gold" className="h-16 px-12 text-xl font-bold shadow-2xl">
                  Get Involved Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
