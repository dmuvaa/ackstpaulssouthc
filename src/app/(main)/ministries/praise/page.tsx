"use client";

import Image from "next/image";
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
      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[550px] w-full overflow-hidden bg-primary">
        <Image
          src="/images/band 1.jpg"
          alt="Melodies of Christ Band"
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
            <Badge className="bg-secondary text-white px-4 py-1.5 text-sm uppercase tracking-widest font-black">
              Rooted in Psalm 150
            </Badge>
            <h1 className="text-6xl font-black tracking-tighter sm:text-8xl">
              Melodies of <br/><span className="text-accent">Christ Band</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-slate-200 sm:text-2xl font-medium">
              Magnifying the greatness of God through music and authentic worship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-primary">Lead Us Into His Presence</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The Melodies of Christ Band at ACK St. Paul’s Parish, South C, is a passionate team dedicated to leading the congregation into heartfelt praise and worship. We aim to foster spiritual transformation and a deep connection with God.
            </p>
            <div className="space-y-4">
              <h4 className="text-2xl font-bold text-primary">Core Objectives</h4>
              <div className="grid gap-4">
                {objectives.map((obj, i) => (
                  <div key={i} className="flex items-center gap-3 bg-muted p-4 rounded-xl border border-primary/5">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                    <span className="font-medium text-primary">{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border shadow-sm text-center"
              >
                <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 font-black">
                  {v.title[0]}
                </div>
                <h4 className="font-bold text-primary mb-2">{v.title}</h4>
                <p className="text-xs text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rehearsals Section */}
      <section className="bg-primary py-24 text-white overflow-hidden relative">
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
                <Button size="lg" variant="gold" className="h-14 px-10 text-lg font-bold">Contact Brian Chiuri</Button>
              </div>
            </div>
            <div className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl">
              <Image src="/images/band 1.jpg" alt="Praise & Worship" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-24">
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
