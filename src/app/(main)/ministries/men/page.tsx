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
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="/images/vicar.jpg"
          alt="Men's Ministry - KAMA"
          fill
          className="object-cover brightness-50 object-top"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl"
            >
              Kenya Anglican Men <span className="text-accent">Association (KAMA)</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-lg text-slate-200 sm:text-xl"
            >
              Growing in Faith, Serving in Love.
            </motion.p>
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
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold">KAMA 2025: <span className="text-accent">Ministry Highlights</span></h2>
              <div className="space-y-6">
                <div className="bg-white/10 p-6 rounded-xl border border-white/10">
                  <h4 className="font-bold text-xl text-accent mb-2">Ministry Focus</h4>
                  <ul className="space-y-2 text-slate-200">
                    <li className="flex items-center gap-2"><span>•</span> Transition from fellowship to active outreach</li>
                    <li className="flex items-center gap-2"><span>•</span> Men positioned as servants, mentors, and leaders</li>
                  </ul>
                </div>
                <div className="bg-white/10 p-6 rounded-xl border border-white/10">
                  <h4 className="font-bold text-xl text-accent mb-2">Key Impact Areas</h4>
                  <ul className="space-y-2 text-slate-200">
                    <li className="flex items-center gap-2"><span>•</span> Support for children and youth programmes</li>
                    <li className="flex items-center gap-2"><span>•</span> Active participation in church-wide events</li>
                    <li className="flex items-center gap-2"><span>•</span> Strengthened collaboration across ministries</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden border-8 border-white/10 shadow-2xl">
              <Image
                src="/images/congregation.jpg"
                alt="Impact Areas"
                fill
                className="object-cover"
              />
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
