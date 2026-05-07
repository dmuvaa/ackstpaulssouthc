"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Shield, 
  Users, 
  TrendingUp, 
  BookOpen, 
  Heart, 
  Anchor, 
  Briefcase, 
  Dumbbell 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const objectives = [
  { 
    title: "Spiritual Empowerment", 
    desc: "Strengthening faith through prayer, worship, and discipleship.",
    icon: Anchor
  },
  { 
    title: "Family & Marriage Values", 
    desc: "Supporting men as pillars of strong, godly families.",
    icon: Heart
  },
  { 
    title: "Economic Empowerment", 
    desc: "Encouraging financial stewardship, entrepreneurship, and sustainable livelihoods.",
    icon: Briefcase
  },
  { 
    title: "Community Service", 
    desc: "Engaging in outreach programs to positively impact society.",
    icon: Users
  },
  { 
    title: "Education & Training", 
    desc: "Providing mentorship, skills development, and leadership training.",
    icon: BookOpen
  },
];

const commissions = [
  {
    title: "Spiritual Empowerment & Welfare",
    desc: "Focuses on strengthening faith, intercessory ministry, and pastoral care.",
    icon: Shield
  },
  {
    title: "Finance & Resource Mobilization",
    desc: "Ensures financial stewardship and supports church projects through sustainable fundraising.",
    icon: TrendingUp
  },
  {
    title: "Events, Education & Training",
    desc: "Organizes activities, provides mentorship, and facilitates skill development.",
    icon: BookOpen
  },
  {
    title: "Social Service, Sports & Fitness",
    desc: "Promotes physical well-being, community outreach, and positive social impact.",
    icon: Dumbbell
  }
];

export default function MenMinistryPage() {
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
              src="/images/kama-men.jpg"
              alt="Men's Ministry - KAMA"
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
                Men's Ministry
              </Badge>
              <h1 className="text-4xl md:text-7xl font-black text-primary tracking-tight leading-tight">
                Anglican Men <span className="text-secondary">Association (KAMA)</span>
              </h1>
              <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto">
                Growing in Faith, Serving in Love. A vibrant fellowship dedicated to spiritual growth, leadership, and impactful service.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge className="bg-secondary text-white px-4 py-1">Men's Ministry</Badge>
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">Welcome to KAMA at St. Paul’s South C</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            KAMA is a vibrant fellowship dedicated to spiritual growth, leadership, and impactful service. We continue to transform lives and strengthen the church through faith, Christian family values, economic empowerment, and active community engagement.
          </p>
          <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
            <h3 className="text-xl font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-lg text-primary/80 italic">
              "To foster spiritual empowerment, Christian family values, economic independence, community service, and continuous learning."
            </p>
          </div>
        </div>
      </section>

      {/* Core Objectives */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-16">Core Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((obj, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary text-white flex items-center justify-center mb-4">
                    <obj.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{obj.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{obj.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commissions */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">The Four Commissions</h2>
            <p className="text-muted-foreground max-w-2xl">
              Our ministry is structured into foundational commissions that ensure every man is engaged, supported, and empowered to serve.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commissions.map((comm, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="flex gap-6 p-8 rounded-2xl border bg-white shadow-sm hover:border-secondary transition-all"
              >
                <div className="h-14 w-14 shrink-0 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                  <comm.icon className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-primary">{comm.title}</h4>
                  <p className="text-muted-foreground">{comm.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2025 Focus */}
      <section className="bg-primary py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 text-center">
              <h2 className="text-3xl font-bold text-white">Impact Areas</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white/10 p-8 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-2xl text-accent mb-4 text-left">Ministry Focus</h4>
                  <ul className="space-y-3 text-left text-slate-200">
                    <li className="flex items-center gap-3"><span>•</span> Transition from fellowship to active outreach</li>
                    <li className="flex items-center gap-3"><span>•</span> Men positioned as servants, mentors, and leaders</li>
                  </ul>
                </div>
                <div className="bg-white/10 p-8 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-2xl text-accent mb-4 text-left">Key Impact Areas</h4>
                  <ul className="space-y-3 text-left text-slate-200">
                    <li className="flex items-center gap-3"><span>•</span> Support for children and youth programmes</li>
                    <li className="flex items-center gap-3"><span>•</span> Active participation in church-wide events</li>
                    <li className="flex items-center gap-3"><span>•</span> Strengthened collaboration across ministries</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-primary mb-6">Join the Movement!</h2>
          <p className="text-lg text-muted-foreground mb-8">
            KAMA is a place for men seeking to grow in faith, serve the community, and lead in excellence. We invite you to join us on this transformative journey!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all">
              Inquire Today
            </button>
            <button className="border border-primary text-primary px-8 py-3 rounded-full font-bold hover:bg-primary/5 transition-all">
              Contact Church Office
            </button>
          </div>
          <p className="mt-8 font-bold text-primary">ACK St. Paul’s South C – KAMA: Growing in Faith, Serving in Love!</p>
        </div>
      </section>
    </div>
  );
}
