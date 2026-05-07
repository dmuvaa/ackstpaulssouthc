"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, History, Target, ShieldCheck } from "lucide-react";

const stats = [
  { label: "Active Members", value: "2,000+" },
  { label: "Weekly Services", value: "3" },
  { label: "Community Projects", value: "15+" },
  { label: "Years of Ministry", value: "30+" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold sm:text-5xl"
          >
            About ACK St Paul's South C
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-300"
          >
            Discover our journey, our values, and the people who lead us.
          </motion.p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-secondary">
                <ShieldCheck className="h-6 w-6" />
                <span className="font-bold uppercase tracking-widest text-sm">Who We Are</span>
              </div>
              <h2 className="text-4xl font-black text-primary">Anglican Church of Kenya <br/>St. Paul’s South C</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We are a faith-based organization deeply rooted in the Christian tradition and part of the global Anglican Communion. Our foundation is firmly established in the teachings and values of Jesus Christ as revealed in the Holy Scriptures.
                </p>
                <p>
                  We believe that Jesus Christ is the source of salvation and the cornerstone of our faith. Our liturgical and sacramental traditions guide our worship and daily lives, fostering a spirit of unity among our members.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] overflow-hidden rounded-[3rem] shadow-2xl">
              <Image
                src="/images/congregation.jpg"
                alt="Church Community"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-8 rounded-2xl border-l-4 border-secondary">
                <p className="text-xl font-bold text-primary italic">
                  "God’s work done God’s way shall never lack God’s resources."
                </p>
                <p className="mt-2 text-sm font-bold uppercase tracking-widest text-secondary">— Our Clarion Call</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3 mb-16">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-3xl shadow-sm border"
            >
              <Target className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground text-lg">
                To be an Empowered Church Transforming Humanity.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-3xl shadow-sm border"
            >
              <Users className="h-10 w-10 text-secondary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground text-lg">
                To Empower Humanity for Holistic Service inspired by God’s will.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-3xl shadow-sm border"
            >
              <ShieldCheck className="h-10 w-10 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Core Values</h3>
              <ul className="space-y-2 text-muted-foreground text-lg">
                <li className="flex items-center gap-2 font-medium">• Unity</li>
                <li className="flex items-center gap-2 font-medium">• Faith and Practice</li>
                <li className="flex items-center gap-2 font-medium">• Integrity</li>
                <li className="flex items-center gap-2 font-medium">• Accountability & Transparency</li>
                <li className="flex items-center gap-2 font-medium">• Service</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-12">Our Leadership</h2>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "The Ven. Vicar", role: "Vicar", img: "/images/vicar.jpg" },
              { name: "Rev. Assistant", role: "Assistant Priest", img: "/images/communion.jpg" },
              { name: "Lay Reader", role: "Lay Reader", img: "/images/congregation.jpg" },
            ].map((leader, i) => (
              <div key={i} className="group flex flex-col items-center">
                <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-muted transition-colors group-hover:border-secondary">
                  <Image
                    src={leader.img}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="mt-6 text-xl font-bold">{leader.name}</h4>
                <p className="text-muted-foreground">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="hero-gradient py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-extrabold md:text-5xl">{stat.value}</div>
                <div className="mt-2 text-sm uppercase tracking-widest text-slate-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
