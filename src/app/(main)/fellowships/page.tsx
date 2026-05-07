"use client";

import Image from "next/image";
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
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="/images/communion.jpg"
          alt="Home Fellowships"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-4xl font-black sm:text-6xl"
            >
              Home <span className="text-accent">Fellowships</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-200 opacity-90 sm:text-xl max-w-2xl mx-auto"
            >
              Strengthening Faith and Community through intimate connection.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge className="bg-secondary text-white px-4 py-1">Fellowship Life</Badge>
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">Building a United Church Family</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At ACK St. Paul’s South C, we believe in the power of fellowship to build stronger believers and a united church family. Our home fellowships provide an intimate space where members can grow spiritually, share their faith, and encourage one another in a setting beyond the Sunday service.
          </p>
        </div>
      </section>

      {/* What to Expect */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">What to Expect</h2>
            <p className="text-muted-foreground max-w-2xl">
              Each gathering follows a structured yet spirit-led flow, ensuring a meaningful experience that lasts about an hour.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture Quote */}
      <section className="py-24 relative overflow-hidden">
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

      {/* Why Join */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-primary">Why Join a Fellowship?</h2>
            <div className="space-y-6">
              {[
                "Stay connected and accountable in our faith.",
                "Grow spiritually through shared learning and encouragement.",
                "Experience deeper relationships within the church community.",
                "Find a safe and supportive space for development."
              ].map((reason, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1">
                    <div className="h-2 w-2 bg-white rounded-full" />
                  </div>
                  <p className="text-lg text-muted-foreground">{reason}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <Image
              src="/images/congregation.jpg"
              alt="Community Life"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Find a Fellowship */}
      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <MapPin className="h-12 w-12 text-accent mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Find a Fellowship Near You</h2>
          <p className="text-xl text-slate-200 mb-10">
            With several home fellowships meeting across different locations, there’s a place for everyone!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="gold" className="h-14 px-10 text-lg font-bold">
              Contact Church Office
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold bg-white text-primary hover:bg-white/90 border-none">
              Inquire via Website
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
