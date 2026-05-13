"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, ShieldCheck, Sparkles } from "lucide-react";

const heroSlides = [
  {
    image: "/images/mph.jpeg",
    badge: "Venue Hire",
    title: <>Multipurpose <span className="text-secondary">Hall</span></>,
    desc: "Host your next event in our state-of-the-art facility. Perfect for weddings, conferences, and community gatherings.",
  },
  {
    image: "/images/mph-11.jpeg",
    badge: "State-of-the-art",
    title: <>Modern <span className="text-secondary">Facilities</span></>,
    desc: "Equipped with sophisticated audio-visual technology and flexible seating arrangements.",
  },
  {
    image: "/images/mph-dinner-enhanced.png",
    badge: "Event Solutions",
    title: <>Perfect for <span className="text-secondary">Celebrations</span></>,
    desc: "Creating a smooth and memorable experience for your special occasions.",
  },
  {
    image: "/images/mph-board.jpeg",
    badge: "Board Meetings",
    title: <>Professional <span className="text-secondary">Spaces</span></>,
    desc: "Perfect for board meetings, conferences, and corporate gatherings.",
  }
];

export default function HallHirePage() {
  const [activeHero, setCurrentHero] = useState(0);
  const currentSlide = heroSlides[activeHero] || heroSlides[0];

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
                src={currentSlide.image}
                alt="Multipurpose Hall"
                fill
                className="object-cover object-center"
                priority={activeHero === 0}
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
                {currentSlide.badge}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-white">
                {currentSlide.title}
              </h1>
              <p className="text-base md:text-lg text-slate-300 font-medium leading-relaxed">
                {currentSlide.desc}
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" variant="gold" className="font-bold h-12 px-8" asChild>
                  <Link href="/contact">Inquire Now</Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          <div className="flex gap-2 px-8 md:px-12 lg:px-16 mt-6 md:mt-0 md:absolute md:bottom-12">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentHero(i)}
                className={`h-2 rounded-full transition-all duration-500 ${activeHero === i ? "w-10 bg-accent" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">The Solution for Your Event</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              ACK St Paul's South C Multipurpose Hall offers a complete event solution with modern facilities, ample parking, and a serene environment.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our state-of-the-art facility accommodates over 500-600 guests, with 4 additional intimate halls for smaller gatherings. Equipped with sophisticated audio-visual technology and flexible seating arrangements, we ensure a smooth experience for conferences, weddings, and parties.
            </p>
            <p className="text-accent font-bold italic">“Tents are overrated, anyway!”</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, title: "500+ Capacity", desc: "Spacious main hall" },
              { icon: ShieldCheck, title: "Ample Parking", desc: "Secure and convenient" },
              { icon: Clock, title: "Flexible Hours", desc: "Day & evening rates" },
              { icon: Sparkles, title: "Modern AV", desc: "Sound & projection" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm text-center">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-primary mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rate Card Section */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Hall Hire Rate Card</h2>
            <p className="text-muted-foreground mt-2">Rates are inclusive of 16% VAT</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden max-w-4xl mx-auto">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left text-muted-foreground font-bold">
                    <th className="p-4">Name of Hall</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Capacity</th>
                    <th className="p-4">Day Rate</th>
                    <th className="p-4">Evening Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: "Victory Hall", loc: "Ground Floor", cap: "500 Guests", day: "Ksh 50,000", eve: "Ksh 15,000" },
                    { name: "Wisdom Hall", loc: "1st Floor (Door 1)", cap: "30 Guests", day: "Ksh 10,000", eve: "Ksh 3,000" },
                    { name: "Praise Hall", loc: "1st Floor (Door 2)", cap: "10 Guests", day: "Ksh 5,000", eve: "Ksh 2,000" },
                    { name: "Exploits Hall", loc: "1st Floor (Door 3)", cap: "50 Guests", day: "Ksh 15,000", eve: "Ksh 4,000" },
                    { name: "Exodus Hall", loc: "2nd Floor (Door 1)", cap: "30 Guests", day: "Ksh 10,000", eve: "Ksh 3,000" },
                    { name: "Courage Hall", loc: "2nd Floor (Door 2)", cap: "70 Guests", day: "Ksh 20,000", eve: "Ksh 8,000" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-primary">{row.name}</td>
                      <td className="p-4 text-muted-foreground">{row.loc}</td>
                      <td className="p-4 text-muted-foreground">{row.cap}</td>
                      <td className="p-4 font-bold text-secondary">{row.day}</td>
                      <td className="p-4 font-bold text-secondary">{row.eve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden divide-y divide-slate-100">
              {[
                { name: "Victory Hall", loc: "Ground Floor", cap: "500 Guests", day: "Ksh 50,000", eve: "Ksh 15,000" },
                { name: "Wisdom Hall", loc: "1st Floor (Door 1)", cap: "30 Guests", day: "Ksh 10,000", eve: "Ksh 3,000" },
                { name: "Praise Hall", loc: "1st Floor (Door 2)", cap: "10 Guests", day: "Ksh 5,000", eve: "Ksh 2,000" },
                { name: "Exploits Hall", loc: "1st Floor (Door 3)", cap: "50 Guests", day: "Ksh 15,000", eve: "Ksh 4,000" },
                { name: "Exodus Hall", loc: "2nd Floor (Door 1)", cap: "30 Guests", day: "Ksh 10,000", eve: "Ksh 3,000" },
                { name: "Courage Hall", loc: "2nd Floor (Door 2)", cap: "70 Guests", day: "Ksh 20,000", eve: "Ksh 8,000" },
              ].map((row, i) => (
                <div key={i} className="p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-primary text-lg">{row.name}</h4>
                    <span className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full font-bold">{row.cap}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{row.loc}</p>
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Day: </span>
                      <span className="font-bold text-secondary">{row.day}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Eve: </span>
                      <span className="font-bold text-secondary">{row.eve}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer & CTA */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="bg-accent/5 border border-accent/20 p-8 rounded-[2rem] text-center shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Special Offer</span>
            <h4 className="text-3xl font-black text-primary mt-1 mb-2">20% Discount in August!</h4>
            <p className="text-lg text-muted-foreground mb-6">Book with us today and enjoy a great deal in return.</p>
            <Button size="lg" variant="gold" className="font-bold h-12 px-8" asChild>
              <Link href="/contact">Inquire Now</Link>
            </Button>
          </div>
          
          <div className="pt-8">
            <h3 className="text-2xl font-bold text-primary mb-4">Book Your Event Today</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us to check availability and book the hall for your special occasion.
            </p>
            <div className="flex justify-center">
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
