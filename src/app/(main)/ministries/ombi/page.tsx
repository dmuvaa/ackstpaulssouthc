"use client";

import Image from "next/image";
import Link from "next/link";
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
      {/* Hero Section — Split Layout */}
      <section className="relative min-h-[calc(100vh-6rem)] flex flex-col md:flex-row">
        {/* Left: Image */}
        <div className="relative w-full md:w-[65%] aspect-[4/3] md:aspect-auto md:h-auto overflow-hidden">
          <Image
            src="/images/ombi-new.jpg"
            alt="OMBI Prayer Journey"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Right: Text Content */}
        <div className="w-full md:w-[35%] bg-primary flex flex-col justify-center relative overflow-hidden py-10 md:py-0">
          <div className="px-8 md:px-12 lg:px-16 py-12 md:py-0 space-y-6 text-white">
            <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1.5 text-sm uppercase tracking-widest font-bold">
              10-Week Prayer Adventure
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">
              OMBI <span className="text-secondary">Prayer</span>
            </h1>
            <p className="text-base md:text-lg text-slate-300 font-medium leading-relaxed italic">
              “Call to me and I will answer you and tell you great and unsearchable things you do not know” — Jeremiah 33:3
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/contact" className="bg-secondary text-primary px-6 py-3 rounded-full font-bold hover:bg-secondary/90 transition-all text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-16 lg:grid-cols-2 items-start">
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
            <div className="space-y-4 pt-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-6 bg-white rounded-2xl border shadow-sm"
                >
                  <div className="h-10 w-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                    <h.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">{h.title}</h4>
                    <p className="text-sm text-muted-foreground">{h.desc}</p>
                  </div>
                </motion.div>
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
      <section className="bg-primary py-12 text-white overflow-hidden relative">
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
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-primary">Start Your Journey</h2>
          <p className="text-xl text-muted-foreground">
            Sign up for the next OMBI cohort at the church office or contact the Patron for more details. Join us on this incredible journey of prayer, reflection, and transformation!
          </p>
            <Button size="lg" className="font-bold h-12 px-8" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
