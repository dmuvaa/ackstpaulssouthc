"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Music, Target, Award, Users, CheckCircle2, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const achievements = [
  "25 Years of Choir Ministry",
  "Inaugural Concert in honor of Mwalimu Dorrington Omondi",
  "Overall Best – Archdeaconry Music Festivals",
  "4th Position – Diocesan Music Festivals",
  "Inaugural Christmas Concert launched",
  "9 New Members Baptised",
  "Constitution & Code of Conduct launched",
];

const values = [
  { letter: "C", label: "Commitment to ministry and excellence" },
  { letter: "H", label: "Humility in service and leadership" },
  { letter: "O", label: "Organization in structure and delivery" },
  { letter: "I", label: "Inspiration through music and worship" },
  { letter: "R", label: "Respect for God, each other, and the worship experience" },
];

export default function ChoirPage() {
  const [activeHero, setCurrentHero] = useState(0);
  const heroSlides = [
    {
      image: "/images/choir 3.jpg",
      badge: "Music Ministry",
      title: <>ACK St. Paul’s <span className="text-secondary">Choir</span></>,
      desc: "Glorifying God through harmonious worship and the ministry of music.",
    },
    {
      image: "/images/choir 1.jpeg",
      badge: "Worship",
      title: <>Harmonious <span className="text-secondary">Praise</span></>,
      desc: "Leading the congregation in hymns and liturgical responses.",
    },
    {
      image: "/images/ack-choir.png",
      badge: "Fellowship",
      title: <>United in <span className="text-secondary">Song</span></>,
      desc: "A dedicated team of men and women serving God through music.",
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
                alt="Choir Ministry"
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
                <Link href="/contact" className="bg-secondary text-primary px-6 py-3 rounded-full font-bold hover:bg-secondary/90 transition-all text-sm">
                  Contact Us
                </Link>
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
          <Badge className="bg-secondary text-white px-4 py-1">Music Ministry</Badge>
        </div>
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* Left Side: Welcome & Values */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">Welcome to ACK St. Paul’s Choir</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The ACK St. Paul’s Choir is a dedicated team of men and women who serve God and the congregation through the ministry of music. Our choir plays a vital role in church liturgy, leading hymns and responses that enrich the worship experience.
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
                      {item.letter}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">{item.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Achievements */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">Our Achievements</h3>
            <div className="space-y-4">
              {achievements.slice(0, 5).map((item, i) => (
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

      {/* Video Section */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">Watch Us in Action</h2>
            <div className="h-1 w-20 bg-secondary mx-auto" />
            <div className="relative aspect-video overflow-hidden rounded-[2.5rem] shadow-2xl mt-8">
              <iframe
                src="https://www.youtube.com/embed/bDMeouu-d2c?si=MGs7dBmU_uByAlNi"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Role */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-8 border-l-4 border-l-primary shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                The mission is to evangelize, lead, and enrich congregational worship by glorifying God through music. The aim is to create a space for communal prayer, encourage spiritual growth, and inspire active participation in worship through song.
              </p>
            </Card>

            <Card className="p-8 border-l-4 border-l-secondary shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                  <Music className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Role in Worship</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Leading Worship – Guiding the congregation in hymns and liturgical responses.",
                  "Enhancing the Worship Experience – Creating an atmosphere of spiritual reflection.",
                  "Encouraging Spiritual Growth – Helping believers connect with God through music.",
                  "Fostering Unity – Strengthening the bonds of fellowship among members.",
                  "Developing Musical Excellence – Training members in music literacy.",
                ].map((role, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>



      {/* Joining Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">Join the Choir</h2>
              <p className="text-lg text-muted-foreground">
                Do you feel called to serve God through music? We welcome new members who are passionate about worship and dedicated to the ministry.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-bold text-xl flex items-center gap-2">
                  <Users className="h-5 w-5 text-secondary" />
                  Requirements:
                </h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-2"><span>•</span> Love for singing and a desire to minister.</li>
                  <li className="flex gap-2"><span>•</span> Commitment to Sunday services and practice.</li>
                  <li className="flex gap-2"><span>•</span> Profess the Anglican faith.</li>
                </ul>
              </div>

              <div className="bg-muted/50 p-6 rounded-2xl border space-y-4">
                <h4 className="font-bold flex items-center gap-2 text-primary">
                  <Clock className="h-5 w-5 text-secondary" />
                  Practice Schedule:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase text-muted-foreground">Wed & Fri</span>
                    <span className="font-bold">5:30 PM</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase text-muted-foreground">Sundays</span>
                    <span className="font-bold">8:30 AM (1.5 hrs)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <Button size="lg" className="font-bold h-12 px-8" asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
