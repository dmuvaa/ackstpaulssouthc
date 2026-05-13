"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, History, Target, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Leader {
  name: string;
  role: string;
  bio: string;
  img: string;
  category?: string;
}

interface Stat {
  label: string;
  value: string;
}

interface AboutClientProps {
  leaders: Leader[];
  stats: Stat[];
}

export default function AboutClient({ leaders, stats }: AboutClientProps) {
  const clergy = leaders.filter(l => l.category === 'clergy');
  const officials = leaders.filter(l => l.category === 'official');
  const chairs = leaders.filter(l => l.category === 'chair');
  const other = leaders.filter(l => !l.category || !['clergy', 'official', 'chair'].includes(l.category));

  return (
    <div className="flex flex-col">
      {/* Top Section - About Us */}
      <section className="py-8 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Top: Image and Who We Are */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6">
              {/* Left: Full Church Image (Expanded) */}
              <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/ack-church.jpeg"
                  alt="ACK St. Paul's Church"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>

              {/* Right: Who We Are Text */}
              <div className="lg:col-span-5 space-y-4">
                <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1 text-xs uppercase tracking-widest font-bold">
                  About Us
                </Badge>
                <h1 className="text-3xl font-black text-primary">
                  Who We Are
                </h1>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    The Anglican Church of Christ is a faith-based organization deeply rooted in the Christian tradition. We are part of the Anglican Communion, a global fellowship of churches that traces its heritage back to the Church of England. Our foundation is firmly established in the teachings and values of Jesus Christ as revealed in the Holy Scriptures. We believe that Jesus Christ is the source of salvation and the cornerstone of our faith.
                  </p>
                  <p>
                    We are committed to fostering a spirit of unity among our members, while upholding the rich liturgical and sacramental traditions of the Anglican Church. Our faith is expressed not only in worship but also in our daily lives, as we seek to live out the teachings of Christ in our relationships, work, and service to others.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom: Vision, Values, Commitment */}
            <div className="space-y-4">
              
              {/* Vision */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <span className="font-bold uppercase tracking-widest text-xs text-secondary">Our Vision</span>
                <h2 className="text-xl font-bold text-primary mt-1 mb-1">To be an Empowered Church Transforming Humanity.</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We strive to empower individuals for holistic service, inspired by God’s will.
                </p>
              </div>

              {/* Values */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <span className="font-bold uppercase tracking-widest text-xs text-secondary block mb-2">Core Values</span>
                <div className="flex flex-wrap gap-2">
                  {["Unity", "Faith and Practice", "Integrity", "Accountability", "Service"].map((val, i) => (
                    <span key={i} className="bg-primary/5 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/10">
                      {val}
                    </span>
                  ))}
                </div>
              </div>

              {/* Commitment */}
              <div className="bg-gradient-to-br from-primary to-primary/90 text-white p-6 md:p-8 rounded-2xl shadow-xl">
                <div className="space-y-3">
                  <span className="font-bold uppercase tracking-widest text-sm text-accent">Our Commitment</span>
                  <h2 className="text-xl md:text-2xl font-bold">Integrity and Transparency</h2>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    We strive to be transparent in our mission and accountable to God and to one another. Ultimately, we are called to serve our communities and the world, reflecting the love and compassion of Christ in all that we do.
                  </p>
                  <div className="border-t border-white/20 pt-3 mt-3">
                    <p className="text-base font-bold italic text-accent">
                      "God’s work done God’s way shall never lack God’s resources."
                    </p>
                    <p className="text-xs text-slate-400 mt-1">— Our Clarion Call</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-primary mb-6">Our Leadership</h2>
            <p className="text-lg text-muted-foreground">
              Meet the dedicated team of Clergy, Lay Leaders, and Parochial Church Council committed to serving God and our community at ACK St Paul's South C Parish.
            </p>
          </div>

          {/* Clergy & Senior Leadership */}
          {clergy.length > 0 && (
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-secondary mb-10 flex items-center gap-3">
                <span className="h-px bg-secondary/20 flex-1"></span>
                Clergy, Lay Readers and PCC
                <span className="h-px bg-secondary/20 flex-1"></span>
              </h3>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                {clergy.map((leader, i) => (
                  <LeaderCard key={i} leader={leader} />
                ))}
              </div>
            </div>
          )}

          {/* Parish Officials */}
          {officials.length > 0 && (
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-secondary mb-10 flex items-center gap-3">
                <span className="h-px bg-secondary/20 flex-1"></span>
                Parish Officials
                <span className="h-px bg-secondary/20 flex-1"></span>
              </h3>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                {officials.map((leader, i) => (
                  <LeaderCard key={i} leader={leader} />
                ))}
              </div>
            </div>
          )}

          {/* Ministry & Committee Chairs */}
          {chairs.length > 0 && (
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-secondary mb-10 flex items-center gap-3">
                <span className="h-px bg-secondary/20 flex-1"></span>
                Ministry & Committee Chairs
                <span className="h-px bg-secondary/20 flex-1"></span>
              </h3>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                {chairs.map((leader, i) => (
                  <LeaderCard key={i} leader={leader} />
                ))}
              </div>
            </div>
          )}

          {/* Other Leaders (Fallback) */}
          {other.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-10 flex items-center gap-3">
                <span className="h-px bg-secondary/20 flex-1"></span>
                Other Leaders
                <span className="h-px bg-secondary/20 flex-1"></span>
              </h3>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                {other.map((leader, i) => (
                  <LeaderCard key={i} leader={leader} />
                ))}
              </div>
            </div>
          )}
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

function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-100 transition-all hover:shadow-2xl h-full"
    >
      <div className="relative aspect-square w-32 mx-auto mt-6 overflow-hidden rounded-full">
        <Image
          src={leader.img}
          alt={leader.name}
          fill
          className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3">
          <h4 className="text-lg md:text-xl font-black text-primary leading-tight group-hover:text-secondary transition-colors">{leader.name}</h4>
          <p className="text-secondary font-bold text-[10px] uppercase tracking-[0.15em] mt-1">{leader.role}</p>
        </div>
        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
          {leader.bio}
        </p>
      </div>
    </motion.div>
  );
}
