"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
  return (
    <div className="flex flex-col">
      {/* Image Banner Section */}
      <section className="bg-slate-50 pt-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
          >
            <Image
              src="/images/SundaySchool/sunday-school2.jpg"
              alt="Sunday School Ministry"
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Header Content Section */}
      <section className="bg-slate-50 pb-20 pt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1.5 text-sm uppercase tracking-widest font-bold">
                Building a Strong Foundation
              </Badge>
              <h1 className="text-4xl md:text-7xl font-black text-primary tracking-tight">
                Sunday <span className="text-secondary">School</span>
              </h1>
              <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto">
                Raising children in faith through a structured, engaging, and spiritually enriching environment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-primary">Raising a Generation for Christ</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The Sunday School Ministry is committed to raising children in faith by providing a structured, engaging, and spiritually enriching environment. The goal is to help children understand the Bible, develop Christian values, and form a strong connection with the church community.
            </p>
            <div className="flex items-center gap-4 p-6 bg-muted rounded-2xl">
              <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-white shadow-sm">
                <Image src="/images/vicar.jpg" alt="Ann Dada" width={64} height={64} className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-primary">Ann Dada</h4>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Chairperson</p>
              </div>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {programs.map((program, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border shadow-sm transition-all"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6">
                  <program.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-primary mb-2">{program.title}</h3>
                <p className="text-sm text-muted-foreground">{program.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Future Vision</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              We are excited to introduce new initiatives to further enrich our children's spiritual experience.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {visions.map((v, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mx-auto text-accent">
                  <v.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold">{v.title}</h4>
                <p className="text-sm text-slate-300">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-primary">Get Involved</h2>
          <p className="text-xl text-muted-foreground">
            We invite parents, church members, and volunteers to support this ministry. Whether through teaching, mentoring, or prayer, your involvement will help shape the faith of the next generation.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="gold" className="h-14 px-10 text-lg font-bold shadow-xl shadow-accent/20">
              Visit Church Office
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
