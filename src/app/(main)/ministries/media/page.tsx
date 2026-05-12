"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Globe, Video, Newspaper, Camera, Mic, Rocket, Users, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function MediaTeamPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section — Split Layout */}
      <section className="relative min-h-[calc(100vh-6rem)] flex flex-col md:flex-row">
        {/* Left: Image */}
        <div className="relative w-full md:w-[65%] aspect-[4/3] md:aspect-auto md:h-auto overflow-hidden">
          <Image
            src="/images/media-team.jpeg"
            alt="Media Team"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Right: Text Content */}
        <div className="w-full md:w-[35%] bg-primary flex flex-col justify-center relative overflow-hidden py-10 md:py-0">
          <div className="px-8 md:px-12 lg:px-16 py-12 md:py-0 space-y-6 text-white">
            <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1.5 text-sm uppercase tracking-widest font-bold">
              Communication & Visibility
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">
              Editorial, Media & <span className="text-secondary">Marketing</span>
            </h1>
            <p className="text-base md:text-lg text-slate-300 font-medium leading-relaxed">
              Strengthening Communication, Visibility and Storytelling at ACK St. Paul’s South C.
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
          <Badge className="bg-secondary text-white px-4 py-1">About the Department</Badge>
        </div>
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* Left Side: Welcome & Focus */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">Strengthening Communication</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Editorial, Media and Marketing Department plays a central role in strengthening communication, visibility, and documentation within ACK St. Paul’s Church South C.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">Our Core Focus</h3>
              <div className="space-y-4">
                {[
                  { icon: Newspaper, title: "Magazine Management", desc: "Overseeing The St. Paulians magazine production." },
                  { icon: Globe, title: "Digital Platforms", desc: "Managing the church website and social media." },
                  { icon: Video, title: "Media Production", desc: "Livestreaming, photography, and storytelling." },
                  { icon: Mic, title: "Hub Operations", desc: "Managing the media room and equipment." }
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

          {/* Right Side: Vision */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">Future Vision</h3>
            <div className="space-y-4">
              {[
                { title: "Church Podcast Platform", desc: "Launching a platform for audio content." },
                { title: "Modern Equipment Hub", desc: "Equipping the media room with modern tools." },
                { title: "Digital Evangelism", desc: "Expanding outreach through digital channels." },
                { title: "Livestreaming Quality", desc: "Improving production value for services." }
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

      {/* Magazine Section */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Newspaper className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold text-primary">Managing The St. Paulians Magazine</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The department oversees the production and management of The St. Paulians magazine, the church’s official publication platform.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The magazine serves as an important platform for documenting and sharing church life, ministry highlights, leadership reflections, feature stories, and financial reports.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border">
              <h4 className="font-bold text-xl mb-4 text-primary">What We Document:</h4>
              <ul className="space-y-3">
                {[
                  "Church life and ministry",
                  "Departmental highlights",
                  "Leadership reflections",
                  "Feature stories",
                  "Church financial reports",
                  "Community impact and outreach programs"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
            <div className="lg:order-last space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Globe className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold text-primary">Digital Communication Management</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The department is also responsible for managing the church’s digital communication platforms, including the church website and social media channels.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The website serves as an important communication and information platform where members and visitors can access announcements, updates, and resources.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Website", desc: "Announcements & Sermons" },
                { title: "TikTok", desc: "Short-form video content" },
                { title: "YouTube", desc: "Livestreams & full services" },
                { title: "Instagram", desc: "Visual storytelling" }
              ].map((item, i) => (
                <div key={i} className="bg-muted/50 p-6 rounded-xl border text-center">
                  <h4 className="font-bold text-primary mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Production & Media Room */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            <Card className="p-8 border-l-4 border-l-primary shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Video className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Media Production</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The department oversees media production during church services, conferences, concerts, outreach programs, and special events.
              </p>
              <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><span>•</span> Livestreaming</li>
                <li className="flex gap-2"><span>•</span> Photography</li>
                <li className="flex gap-2"><span>•</span> Graphic Design</li>
                <li className="flex gap-2"><span>•</span> Storytelling</li>
              </ul>
            </Card>

            <Card className="p-8 border-l-4 border-l-secondary shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                  <Mic className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Media Room Hub</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To support the growing demand for digital ministry, the church expanded its media room to create a more functional working space.
              </p>
              <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><span>•</span> Editing Suite</li>
                <li className="flex gap-2"><span>•</span> Equipment Hub</li>
                <li className="flex gap-2"><span>•</span> Podcast Setup</li>
                <li className="flex gap-2"><span>•</span> Operations Center</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-12 text-center bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-primary mb-6">Join the Movement!</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We welcome support, collaboration, and participation from anyone passionate about communication, media, and storytelling. Join us in sharing the message of Christ!
          </p>
          <div className="flex justify-center">
            <Button size="lg" variant="gold" className="font-bold h-12 px-8" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
          <p className="mt-8 font-bold text-primary">ACK St. Paul’s South C – Media: Storytelling with Purpose!</p>
        </div>
      </section>
    </div>
  );
}
