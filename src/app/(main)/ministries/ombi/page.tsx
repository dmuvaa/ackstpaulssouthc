"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Users, Sparkles, CheckCircle2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const highlights = [
  { icon: Sparkles, title: "Free to Join", desc: "No cost to participate in this transformative journey." },
  { icon: Calendar, title: "Open Registration", desc: "New cohorts begin every three months." },
  { icon: Users, title: "Expert Guidance", desc: "Led by experienced leaders in prayer and reflection." }
];

const expectations = [
  { title: "Guided Prayer & Reflection", desc: "Participants receive manuals for daily reflections and spiritual growth." },
  { title: "Weekly Meetings", desc: "A space to share insights, encourage one another, and learn about prayer and fasting." },
  { title: "Prayer Retreats", desc: "Two dedicated retreats provide time for deeper learning and personal reflection." },
  { title: "Graduation Ceremony", desc: "A celebration of the journey, with additional materials to continue growing." }
];

export default function OmbiPage() {
  return (
    <div className="flex flex-col">
      {/* Image Banner Section */}
      <section className="bg-slate-50 pt-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-[3/2] md:aspect-[16/7] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
          >
            <Image
              src="/images/ombi-new.jpg"
              alt="OMBI Prayer Journey"
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
                10-Week Prayer Adventure
              </Badge>
              <h1 className="text-4xl md:text-7xl font-black text-primary tracking-tight">
                OMBI <span className="text-secondary">Prayer</span>
              </h1>
              <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto italic">
                “Call to me and I will answer you and tell you great and unsearchable things you do not know” — Jeremiah 33:3
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-primary">Deepen Your Prayer Life</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                OMBI is a ten-week structured prayer adventure designed to equip members with practical tools to deepen their prayer lives.
              </p>
              <p>
                Rooted in scripture, the program guides participants in applying biblical truths in daily prayer, fostering a powerful connection with God.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {highlights.map((h, i) => (
                <div key={i} className="text-center p-4 bg-muted rounded-xl">
                  <h.icon className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <h4 className="font-bold text-sm text-primary">{h.title}</h4>
                  <p className="text-[10px] text-muted-foreground mt-1">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">What to Expect</h3>
            <div className="space-y-4">
              {expectations.map((ex, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-6 bg-white rounded-2xl border shadow-sm"
                >
                  <div className="h-10 w-10 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">{ex.title}</h4>
                    <p className="text-sm text-muted-foreground">{ex.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-primary py-24 text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <Quote className="h-12 w-12 text-accent mb-8 opacity-50" />
              <blockquote className="text-2xl sm:text-3xl font-medium leading-relaxed mb-8">
                “My life is not the same. I am more connected and closer to God than ever before, and even my reasoning has been empowered. The learning materials and the scripture verses incorporated in the training have been the game changer.”
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="h-1 w-12 bg-secondary" />
                <p className="text-xl font-bold text-accent">Ms. Peggy Onyango</p>
                <p className="text-slate-400">OMBI Graduate</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-primary">Start Your Journey</h2>
          <p className="text-xl text-muted-foreground">
            Sign up for the next OMBI cohort at the church office or contact the Patron for more details. Join us on this incredible journey of prayer, reflection, and transformation!
          </p>
          <Button size="lg" variant="gold" className="h-14 px-10 text-lg font-bold">
            Sign Up for OMBI
          </Button>
        </div>
      </section>
    </div>
  );
}
