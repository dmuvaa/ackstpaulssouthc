"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Users, Heart, BookOpen, Music, Globe, Trophy, Compass, CheckCircle2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const initiatives = [
  { title: "RTF Fellowships", desc: "Revival Transformative Fellowships addressing mental health, relationships, and finances." },
  { title: "Mentorship", desc: "Brothers Konnect with KAMA and Sisters Keeper with Mothers’ Union." },
  { title: "Social Hangouts", desc: "Bible Study at Mamba Village and team building at Ngong Forest." },
  { title: "Outreach", desc: "Impactful missions like the visit to Nairobi West Men’s Prison." }
];

const departments = [
  "Worship & Choir", "Media & Tech", "Ushering & Hospitality", "Sports & Arts", "Bible Study", "Treasury & Sales"
];

export default function YouthPage() {
  return (
    <div className="flex flex-col">
      {/* Image Banner Section */}
      <section className="bg-slate-50 pt-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
          >
            <Image
              src="/images/spyce-images/bf9d2af2-ed7e-4221-af85-e37498ceff5a.jpg"
              alt="SPYCE Youth Ministry"
              fill
              className="object-cover object-center"
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
              <Badge className="bg-accent text-primary px-4 py-1.5 text-sm uppercase tracking-widest font-black">
                1 Peter 2:9 — Chosen & Set Apart
              </Badge>
              <h1 className="text-4xl md:text-7xl font-black text-primary tracking-tight">
                SPYCE <span className="text-secondary">Youth</span>
              </h1>
              <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto">
                Raising a Christ-centered generation chosen for light and purpose through spiritual enrichment and community impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-primary">A Ministry Beyond Sundays</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                SPYCE is more than just a youth fellowship—it is a movement. Here, young people are intentionally nurtured through fellowship, prayer, and the teaching of God’s Word in ways that speak directly to their realities.
              </p>
              <p>
                From vibrant worship sessions and engaging Bible studies to structured mentorship and community outreach, SPYCE creates an ecosystem where faith is not only learned but lived.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {initiatives.map((init, i) => (
                <div key={i} className="p-6 bg-muted rounded-2xl border border-primary/5">
                  <h4 className="font-bold text-primary mb-2">{init.title}</h4>
                  <p className="text-sm text-muted-foreground">{init.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div className="relative h-[500px] overflow-hidden rounded-[3rem] shadow-2xl">
              <Image src="/images/youths bible study hang out .jpeg" alt="Youth Fellowship" fill className="object-cover" />
            </div>
            <div className="bg-primary text-white p-10 rounded-[3rem] shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Leadership</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Led by Rev. Moses Agwet and a dedicated youth committee, shepherds of the vision ensuring alignment with our mission.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Weekly Bible Study: Wed 6 PM</Badge>
                <Badge variant="secondary">Online Prayers: Thu 8 PM</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Diverse Ministries</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Every young person belongs and contributes. Find your platform for service and growth.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl shadow-sm border flex items-center gap-4 transition-all"
              >
                <div className="h-10 w-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-black">
                  {i + 1}
                </div>
                <span className="text-xl font-bold text-primary">{dept}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outreach Feature */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[4rem] text-white overflow-hidden relative shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 lg:p-20 space-y-8">
                <Badge className="bg-accent text-primary">Outreach Spotlight</Badge>
                <h2 className="text-4xl font-bold">Nairobi West Men’s Prison</h2>
                <p className="text-xl text-slate-300 leading-relaxed">
                  In 2025, over 250 inmates were reached with worship, fellowship, and donations. SPYCE takes Christ to where He is needed most, carrying hope beyond church walls.
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Globe className="text-accent" />
                  </div>
                  <p className="font-bold">250+ Lives Impacted</p>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-auto">
                <Image src="/images/spyce-images/nairobi-west-prison.jpg" alt="Nairobi West Men's Prison Outreach" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-primary">Looking Ahead to 2026</h2>
          <p className="text-xl text-muted-foreground">
            Our focus is clear: deepen, expand, and impact. We are introducing career mentorship, financial stewardship programs, and revitalized youth initiatives.
          </p>
          <div className="bg-secondary/5 p-12 rounded-[3rem] border-2 border-secondary/20">
            <h3 className="text-2xl font-bold text-primary mb-4 italic">“A chosen people, God’s special possession.”</h3>
            <p className="text-muted-foreground mb-8">Join SPYCE today and step into your call to be light in the world.</p>
            <Button size="lg" variant="gold" className="h-14 px-10 text-lg font-bold">Contact Youth Office</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
