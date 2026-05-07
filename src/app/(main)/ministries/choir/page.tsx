"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="/images/choir 3.jpg"
          alt="ACK St Paul's Choir"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl"
            >
              ACK St. Paul’s <span className="text-accent">Choir</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-lg text-slate-200 sm:text-xl"
            >
              Glorifying God through harmonious worship and the ministry of music.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">Welcome to ACK St. Paul’s Choir</h2>
            <div className="h-1 w-20 bg-secondary" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              The ACK St. Paul’s Choir is a dedicated team of men and women who serve God and the congregation through the ministry of music. Our choir plays a vital role in church liturgy, leading hymns and responses that enrich the worship experience and foster a deep sense of reverence.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Through harmonious worship, we seek to inspire, uplift, and unite the church community in faith and devotion.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] overflow-hidden rounded-2xl shadow-2xl"
          >
            <Image
              src="/images/choir .JPG"
              alt="Choir in Action"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission & Role */}
      <section className="bg-muted/30 py-24">
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

      {/* Core Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border group hover:border-secondary transition-all"
              >
                <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-black mb-4 group-hover:bg-secondary transition-colors">
                  {v.letter}
                </div>
                <p className="text-sm font-medium text-muted-foreground">{v.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-primary py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="bg-accent text-primary mb-4">Milestones</Badge>
            <h2 className="text-4xl font-bold">2025 Achievements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10"
              >
                <Award className="h-8 w-8 text-accent shrink-0" />
                <span className="font-medium">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Joining Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-xl lg:order-last">
              <Image
                src="/images/choir 1.jpeg"
                alt="Join the Choir"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">Join the Choir</h2>
              <p className="text-lg text-muted-foreground">
                Do you feel called to serve God through music? We welcome new members who are passionate about worship and dedicated to the ministry.
              </p>
              
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

              <Button size="lg" className="w-full sm:w-auto font-bold h-12 px-8">
                Sign Up Today
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
