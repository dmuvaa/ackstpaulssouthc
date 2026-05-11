"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Music, 
  Users, 
  BookOpen, 
  Heart, 
  Sparkles as PrayingHands, 
  MessageCircle, 
  MapPin, 
  ArrowRight 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  { icon: Music, title: "Praise & Worship", desc: "Engaging in heartfelt worship through songs and hymns." },
  { icon: PrayingHands, title: "Prayer & Intercession", desc: "Lifting each other’s needs before God." },
  { icon: BookOpen, title: "Biblical Teachings", desc: "Learning and growing through God’s Word." },
  { icon: MessageCircle, title: "Testimonies", desc: "Celebrating God’s work in our lives." },
  { icon: Heart, title: "Encouragement", desc: "Strengthening one another in Christian love." },
];

export default function FellowshipsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section — Split Layout */}
      <section className="relative min-h-[calc(100vh-6rem)] flex flex-col md:flex-row">
        {/* Left: Image */}
        <div className="relative w-full md:w-[65%] h-[50vh] md:h-auto overflow-hidden">
          <Image
            src="/images/home-fellowship.jpg"
            alt="Home Fellowships"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Right: Text Content */}
        <div className="w-full md:w-[35%] bg-primary flex items-center relative overflow-hidden">
          <div className="px-8 md:px-12 lg:px-16 py-12 md:py-0 space-y-6 text-white">
            <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1.5 text-sm uppercase tracking-widest font-bold">
              Fellowship Life
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">
              Home <span className="text-secondary">Fellowships</span>
            </h1>
            <p className="text-base md:text-lg text-slate-300 font-medium leading-relaxed">
              Strengthening Faith and Community through intimate connection and shared Christian journey.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/contact" className="bg-secondary text-primary px-6 py-3 rounded-full font-bold hover:bg-secondary/90 transition-all text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro & Objectives Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Badge className="bg-secondary text-white px-4 py-1">Fellowship Life</Badge>
        </div>
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* Left Side: Welcome & Features */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">Building a United Church Family</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our home fellowships provide an intimate space where members can grow spiritually, share their faith, and encourage one another in a setting beyond the Sunday service.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">What to Expect</h3>
              <div className="space-y-4">
                {[
                  { icon: Music, title: "Praise & Worship", desc: "Engaging in heartfelt worship through songs and hymns." },
                  { icon: PrayingHands, title: "Prayer & Intercession", desc: "Lifting each other’s needs before God." },
                  { icon: BookOpen, title: "Biblical Teachings", desc: "Learning and growing through God’s Word." },
                  { icon: MessageCircle, title: "Testimonies", desc: "Celebrating God’s work in our lives." }
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

          {/* Right Side: Life in Fellowship */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">Life in Fellowship</h3>
            <div className="space-y-4">
              {[
                { title: "Intercessory Prayer", desc: "A dedicated time to lift up one another and our nation." },
                { title: "Scripture Study", desc: "Diving deeper into God's word in a conversational setting." },
                { title: "Mutual Support", desc: "Standing with one another during life's triumphs and trials." },
                { title: "Mission Focus", desc: "Planning local outreach and community service projects." }
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

      {/* Scripture Quote */}
      <section className="py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto bg-primary text-white p-12 rounded-[2rem] shadow-2xl">
            <BookOpen className="h-12 w-12 text-accent mx-auto mb-8 opacity-50" />
            <blockquote className="text-2xl font-medium mb-8 italic">
              "They were continually devoting themselves to the apostles’ teaching and to fellowship, to the breaking of bread and to prayer."
            </blockquote>
            <cite className="text-accent font-bold text-xl not-italic">— Acts 2:42</cite>
          </div>
        </div>
      </section>



      {/* Our Fellowship Groups */}
      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Fellowship Groups</h2>
            <p className="text-lg text-muted-foreground">
              We have various fellowship groups meeting in different locations. Find one near you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Karen/Langata/Dam Fellowship",
              "South C Fellowship",
              "Nairobi West",
              "South B/Mombasa Road Fellowship",
              "Kiambu Road Fellowship",
              "Vicarage/Miller/Civil Servants Fellowship"
            ].map((group, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4"
              >
                <div className="h-10 w-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <span className="font-bold text-primary">{group}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Find a Fellowship */}
      <section className="bg-primary py-12 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <MapPin className="h-12 w-12 text-accent mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Find a Fellowship Near You</h2>
          <p className="text-xl text-slate-200 mb-10">
            With several home fellowships meeting across different locations, there’s a place for everyone!
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="font-bold h-12 px-8" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
          <p className="mt-12 text-slate-300 font-medium">
            Come and experience the beauty of Christian fellowship—where faith, love, and unity thrive. Shalom, and God bless you!
          </p>
        </div>
      </section>
    </div>
  );
}
