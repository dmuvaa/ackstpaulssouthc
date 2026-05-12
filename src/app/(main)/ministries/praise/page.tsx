"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Music, Music2, Mic2, Users, Heart, Sparkles, CheckCircle2, Quote, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const objectives = [
  "Atmosphere for individuals to connect with God",
  "Special worship experiences that strengthen fellowship",
  "Spiritual growth among team members and congregation",
  "Identify and develop new talent for the ministry"
];

const values = [
  { title: "Stewardship", desc: "Faithful use of talents for God's glory." },
  { title: "Humility", desc: "Leading from a place of surrendered hearts." },
  { title: "Unity", desc: "Harmonizing as one body in Christ." },
  { title: "Integrity", desc: "Living out the songs we sing." },
  { title: "Authenticity", desc: "Real worship that comes from within." }
];

const testimonials = [
  { name: "Ebby Nelima", role: "Vocalist", text: "Being in the team has enabled me to worship God deeply and bring people to His presence." },
  { name: "Mr. Karanja", role: "Congregant", text: "Their singing makes services lively and prepares our hearts to hear the sermon." },
  { name: "Rev. Faith Gathu", role: "Clergy", text: "They enable me to be in touch with God and celebrate His presence with joy." }
];

export default function PraisePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section — Split Layout */}
      <section className="relative min-h-[calc(100vh-6rem)] flex flex-col md:flex-row">
        {/* Left: Image */}
        <div className="relative w-full md:w-[65%] aspect-[4/3] md:aspect-auto md:h-auto overflow-hidden">
          <Image
            src="/images/praise-worship.jpg"
            alt="Melodies of Christ Band"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Right: Text Content */}
        <div className="w-full md:w-[35%] bg-primary flex flex-col justify-center relative overflow-hidden py-10 md:py-0">
          <div className="px-8 md:px-12 lg:px-16 py-12 md:py-0 space-y-6 text-white">
            <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1.5 text-sm uppercase tracking-widest font-black">
              Rooted in Psalm 150
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">
              Melodies of <br/><span className="text-secondary">Christ Band</span>
            </h1>
            <p className="text-base md:text-lg text-slate-300 font-medium leading-relaxed">
              Magnifying the greatness of God through music and authentic worship, leading the congregation into His presence.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/contact" className="bg-secondary text-primary px-6 py-3 rounded-full font-bold hover:bg-secondary/90 transition-all text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro & Objectives Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Badge className="bg-secondary text-white px-4 py-1">Praise & Worship</Badge>
        </div>
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* Left Side: Welcome & Values */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">Lead Us Into His Presence</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Melodies of Christ Band is a passionate team dedicated to leading the congregation into heartfelt praise and worship. We aim to foster spiritual transformation and a deep connection with God.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">Our Core Values</h3>
              <div className="space-y-4">
                {values.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-6 bg-white rounded-2xl border shadow-sm"
                  >
                    <div className="h-10 w-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 font-bold">
                      {item.title[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Objectives */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">Core Objectives</h3>
            <div className="space-y-4">
              {objectives.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-6 bg-white rounded-2xl border shadow-sm"
                >
                  <div className="h-10 w-10 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">{item}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rehearsals Section */}
      <section className="bg-primary py-12 text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-secondary text-white">Join the Ministry</Badge>
              <h2 className="text-4xl font-bold">Join the Band</h2>
              <p className="text-xl text-slate-300">
                We welcome individuals with vocal or instrumental talent who are committed to serving God through music.
              </p>
              <div className="flex items-center gap-6 p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                <Calendar className="h-12 w-12 text-accent" />
                <div>
                  <h4 className="font-bold text-xl">Weekly Rehearsals</h4>
                  <p className="text-slate-300">Saturdays: 4:00 PM – 7:00 PM in the Main Church</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="font-bold">Requirements:</p>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2 text-slate-300"><CheckCircle2 className="h-4 w-4 text-accent" /> Vocal ability and/or Instrumental skills</li>
                  <li className="flex items-center gap-2 text-slate-300"><CheckCircle2 className="h-4 w-4 text-accent" /> Committed to regular rehearsals and services</li>
                </ul>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <Button size="lg" className="font-bold h-12 px-8" asChild>
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl">
              <Image src="/images/band 1.jpg" alt="Praise & Worship" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-primary">Voices of Praise</h2>
          <p className="text-muted-foreground mt-4">Hear what our members and congregants say about the ministry.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="p-10 bg-muted rounded-[3rem] border border-primary/5 relative">
              <Quote className="h-8 w-8 text-secondary/30 absolute top-8 right-8" />
              <p className="text-lg text-primary italic mb-8">"{t.text}"</p>
              <div>
                <p className="font-black text-primary">{t.name}</p>
                <p className="text-sm text-secondary font-bold uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
