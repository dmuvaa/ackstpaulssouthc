"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
  const [activeHero, setCurrentHero] = useState(0);
  const heroSlides = [
    {
      image: "/images/dinner.jpeg",
      badge: "1 Peter 2:9 — Chosen & Set Apart",
      title: <>SPYCE <span className="text-secondary">Youth</span></>,
      desc: "Raising a Christ-centered generation chosen for light and purpose through spiritual enrichment and community impact.",
    },
    {
      image: "/images/youth-sing.jpeg",
      badge: "Worship & Praise",
      title: <>Vibrant <span className="text-secondary">Worship</span></>,
      desc: "Expressing our faith and devotion through music and creative arts, filling the sanctuary with praise.",
    },
    {
      image: "/images/youth-dinner.jpeg",
      badge: "Fellowship",
      title: <>Community & <span className="text-secondary">Connection</span></>,
      desc: "Building meaningful relationships and a supportive community for young people to thrive together.",
    },
    {
      image: "/images/spyce-images/bf9d2af2-ed7e-4221-af85-e37498ceff5a.jpg",
      badge: "Mentorship",
      title: <>Growth & <span className="text-secondary">Guidance</span></>,
      desc: "Empowering youth through mentorship, skills development, and practical life teachings.",
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
        <div className="relative w-full md:w-[65%] h-[50vh] md:h-auto overflow-hidden">
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
                alt="Youth Ministry"
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Text Content — animates with slide */}
        <div className="w-full md:w-[35%] bg-primary flex items-center relative overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeHero}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="px-8 md:px-12 lg:px-16 py-12 md:py-0 space-y-6"
            >
              <Badge className="bg-accent text-primary px-4 py-1.5 text-sm uppercase tracking-widest font-black">
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
          <div className="flex gap-2 px-8 md:px-12 lg:px-16 pb-8 md:pb-0 md:absolute md:bottom-12">
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
          <Badge className="bg-secondary text-white px-4 py-1">Youth Ministry</Badge>
        </div>
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* Left Side: Welcome & Initiatives */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">A Ministry Beyond Sundays</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  SPYCE is more than just a youth fellowship—it is a movement. Here, young people are intentionally nurtured through fellowship, prayer, and the teaching of God’s Word.
                </p>
                <p>
                  From vibrant worship sessions and engaging Bible studies to structured mentorship and community outreach, SPYCE creates an ecosystem where faith is lived.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">Core Initiatives</h3>
              <div className="space-y-4">
                {[
                  { icon: Sparkles, title: "RTF Fellowships", desc: "Addressing mental health, relationships, and finances." },
                  { icon: Users, title: "Mentorship", desc: "Brothers Konnect and Sisters Keeper programs." },
                  { icon: Heart, title: "Social Hangouts", desc: "Bible Study at Mamba Village and team building." },
                  { icon: Compass, title: "Outreach", desc: "Impactful missions like prison visits." }
                ].map((item, i) => (
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

          {/* Right Side: Departments */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">Our Departments</h3>
            <div className="space-y-4">
              {[
                { title: "Worship & Choir", desc: "Leading youth in vibrant worship." },
                { title: "Media & Tech", desc: "Managing digital content and production." },
                { title: "Ushering & Hospitality", desc: "Welcoming members and guests." },
                { title: "Sports & Arts", desc: "Engaging youth through creative talents." }
              ].map((item, i) => (
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

      {/* Leadership Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
          <div className="relative h-[400px] overflow-hidden rounded-[3rem] shadow-2xl">
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
