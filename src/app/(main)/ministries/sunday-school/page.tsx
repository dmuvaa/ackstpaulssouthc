"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { BookOpen, Sparkles, Music, Users, Palette, Compass, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const programs = [
  { 
    icon: BookOpen, 
    title: "Bible Study Fellowship (BSF)", 
    desc: "Structured teachings to deepen faith and understanding of the Word." 
  },
  { 
    icon: Compass, 
    title: "Vacation Bible School (VBS)", 
    desc: "Interactive lessons, music, and games for biblical learning during holidays." 
  },
  { 
    icon: Palette, 
    title: "Plays & Worship", 
    desc: "Opportunities for children to express their faith through drama and music." 
  },
  { 
    icon: Users, 
    title: "Retreats & Outings", 
    desc: "Encouraging fellowship and practical application of Christian teachings." 
  }
];

const visions = [
  { icon: Music, title: "Brilliant Band", desc: "A music program to make learning more engaging." },
  { icon: Users, title: "Children’s Choir", desc: "A space for kids to worship through song." },
  { icon: Globe, title: "Outreach & Missions", desc: "Teaching children the importance of service." },
  { icon: Sparkles, title: "Digital Learning", desc: "Enhancing lessons with interactive tools." }
];

import { Globe } from "lucide-react";

export default function SundaySchoolPage() {
  const [activeHero, setCurrentHero] = useState(0);
  const heroSlides = [
    {
      image: "/images/children 3.jpeg",
      badge: "Building a Strong Foundation",
      title: <>Sunday <span className="text-secondary">School</span></>,
      desc: "Raising children in faith through a structured, engaging, and spiritually enriching environment.",
    },
    {
      image: "/images/kids-sing.jpeg",
      badge: "Worship & Praise",
      title: <>Joyful <span className="text-secondary">Worship</span></>,
      desc: "Teaching children to express their love for God through song and movement.",
    },
    {
      image: "/images/SundaySchool/sunday-school2.jpg",
      badge: "Bible Learning",
      title: <>Deepening <span className="text-secondary">Faith</span></>,
      desc: "Structured lessons that make the Bible come alive for young minds.",
    },
    {
      image: "/images/children 3.jpeg",
      badge: "Fellowship",
      title: <>Growing <span className="text-secondary">Together</span></>,
      desc: "Creating a space where children can build lasting Christian friendships.",
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
                alt="Sunday School Ministry"
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
          <Badge className="bg-secondary text-white px-4 py-1">Sunday School</Badge>
        </div>
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* Left Side: Welcome & Programs */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">Raising a Generation for Christ</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Sunday School Ministry is committed to raising children in faith by providing a structured, engaging, and spiritually enriching environment. The goal is to help children understand the Bible and develop Christian values.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">Our Programs</h3>
              <div className="space-y-4">
                {programs.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-6 bg-white rounded-2xl border shadow-sm"
                  >
                    <div className="h-10 w-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5" />
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

          {/* Right Side: Vision */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">Our Future Vision</h3>
            <div className="space-y-4">
              {visions.map((item, i) => (
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
                    <h4 className="font-bold text-primary">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Get Involved */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-primary">Get Involved</h2>
          <p className="text-xl text-muted-foreground">
            We invite parents, church members, and volunteers to support this ministry. Whether through teaching, mentoring, or prayer, your involvement will help shape the faith of the next generation.
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="font-bold h-12 px-8" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
