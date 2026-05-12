"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Users, ShieldCheck, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function WomenMinistryPage() {
  const [activeHero, setCurrentHero] = useState(0);
  const heroSlides = [
    {
      image: "/images/women-group1.jpeg",
      badge: "Building Stronger Families",
      title: <>Mothers&apos; Union & <br /><span className="text-secondary">Women&apos;s Group</span></>,
      desc: "Empowering women in faith, family, and service. A space for spiritual nourishment, fellowship, and empowerment.",
    },
    {
      image: "/images/women-group-2.jpeg",
      badge: "Spiritual Nourishment",
      title: <>Fellowship & <span className="text-secondary">Growth</span></>,
      desc: "Growing together in grace and love, supporting one another in our spiritual journey.",
    },
    {
      image: "/images/mothers-union.jpeg",
      badge: "Christian Family Life",
      title: <>Promoting <span className="text-secondary">Family Values</span></>,
      desc: "Upholding the institution of marriage and the promotion of family life according to Christian teachings.",
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
                alt="Women's Ministry"
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
          <Badge className="bg-secondary text-white px-4 py-1">Women's Ministry</Badge>
        </div>
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* Left Side: Welcome & Values */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">Strengthening the Christian Home</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our Women's Ministry is dedicated to supporting the church's mission through various social and spiritual initiatives, with a special focus on the welfare of families and the community.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">Core Values</h3>
              <div className="space-y-4">
                {[
                  { icon: Heart, title: "Compassion", desc: "Supporting the vulnerable and providing care for those in need." },
                  { icon: Flower2, title: "Spiritual Growth", desc: "Nurturing deep faith and personal development through shared prayer." },
                  { icon: Users, title: "Fellowship", desc: "Building strong bonds between women of all generations." },
                  { icon: ShieldCheck, title: "Empowerment", desc: "Equipping women with the tools to lead and serve." },
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

          {/* Right Side: Focus Areas */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">Our Core Focus</h3>
            <div className="space-y-4">
              {[
                { title: "Nurturing Families", desc: "Upholding the institution of marriage and family life." },
                { title: "Supporting Ministry", desc: "Assisting in church projects and spiritual initiatives." },
                { title: "Community Outreach", desc: "Caring for the vulnerable and less fortunate in society." },
                { title: "Leadership Development", desc: "Equipping women to lead and serve in church and society." }
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

      {/* CTA Section */}
      <section className="py-12 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-primary mb-6">Join the Movement!</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Mothers&apos; Union & Women&apos;s Group is a place for women seeking to grow in faith, support families, and serve the community. We invite you to join us on this transformative journey!
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="font-bold h-12 px-8" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
          <p className="mt-8 font-bold text-primary">ACK St. Paul’s South C – Women’s Ministry: Nurturing Families, Serving in Love!</p>
        </div>
      </section>
    </div>
  );
}
