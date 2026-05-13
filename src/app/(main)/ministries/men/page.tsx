"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  const [activeHero, setCurrentHero] = useState(0);
  const heroSlides = [
    {
      image: "/images/kama-men.jpg",
      badge: "Men’s Ministry",
      title: <>Kenya Anglican Men <span className="text-secondary">Association (KAMA)</span></>,
      desc: "Growing in Faith, Serving in Love. A vibrant fellowship dedicated to spiritual growth, leadership, and impactful service.",
    },
    {
      image: "/images/kama-men2.jpeg",
      badge: "Spiritual Growth",
      title: <>Building <span className="text-secondary">Godly Leaders</span></>,
      desc: "Strengthening men through prayer, worship, discipleship, and active community engagement across all generations.",
    },
    {
      image: "/images/kamakama.jpeg",
      badge: "Community Impact",
      title: <>Serving Our <span className="text-secondary">Community</span></>,
      desc: "Engaging in outreach programs, mentorship, and acts of service that positively transform lives and strengthen the church.",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section — Split Layout */}
      <section className="relative min-h-[calc(100vh-6rem)] flex flex-col md:flex-row">
        {/* Left: Image Slideshow */}
        <div className="relative w-full md:w-[65%] aspect-[4/3] md:aspect-auto md:h-auto overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeHero}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={heroSlides[activeHero].image}
                alt="Men's Ministry"
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Text Content — animates with slide */}
        <div className="w-full md:w-[35%] bg-primary flex flex-col justify-center relative overflow-hidden py-10 md:py-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeHero}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="px-8 md:px-12 lg:px-16 py-12 md:py-0 space-y-6"
            >
              <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1.5 text-sm uppercase tracking-widest font-bold">
                {heroSlides[activeHero].badge}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-white">
                {heroSlides[activeHero].title}
              </h1>
              <p className="text-base md:text-lg text-slate-300 font-medium leading-relaxed">
                {heroSlides[activeHero].desc}
              </p>
              <div className="flex gap-4 pt-4">
                <button className="bg-secondary text-primary px-6 py-3 rounded-full font-bold hover:bg-secondary/90 transition-all text-sm">
                  Learn More
                </button>
                <button className="border border-white/30 text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-all text-sm">
                  Contact Us
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          <div className="flex gap-2 px-8 md:px-12 lg:px-16 mt-6 md:mt-0 md:absolute md:bottom-12">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentHero(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  activeHero === i ? "w-10 bg-accent" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Intro & Objectives Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Badge className="bg-secondary text-white px-4 py-1">Men's Ministry</Badge>
        </div>
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* Left Side: Welcome & Objectives */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">Welcome to KAMA</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                KAMA is a vibrant fellowship dedicated to spiritual growth, leadership, and impactful service. It continues to transform lives and strengthen the church through faith, Christian family values, economic empowerment, and active community engagement.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">Core Objectives</h3>
              <div className="space-y-4">
                {objectives.slice(0, 4).map((obj, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-6 bg-white rounded-2xl border shadow-sm"
                  >
                    <div className="h-10 w-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                      <obj.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{obj.title}</h4>
                      <p className="text-sm text-muted-foreground">{obj.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Commissions */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">The Four Commissions</h3>
            <div className="space-y-4">
              {commissions.map((comm, i) => (
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
                    <h4 className="font-bold text-primary">{comm.title}</h4>
                    <p className="text-sm text-muted-foreground">{comm.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2025 Focus */}
      <section className="bg-primary py-12 text-white overflow-hidden relative">
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
      <section className="py-12 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-primary mb-6">Join the Movement!</h2>
          <p className="text-lg text-muted-foreground mb-8">
            KAMA is a place for men seeking to grow in faith, serve the community, and lead in excellence. We invite you to join us on this transformative journey!
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="font-bold h-12 px-8" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
          <p className="mt-8 font-bold text-primary">ACK St. Paul’s South C – KAMA: Growing in Faith, Serving in Love!</p>
        </div>
      </section>
    </div>
  );
}
