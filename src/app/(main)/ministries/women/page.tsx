"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Users, ShieldCheck, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function WomenMinistryPage() {
  return (
    <div className="flex flex-col">
      {/* Image Banner Section */}
      <section className="bg-slate-50 pt-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
          >
            <Image
              src="/images/mothers-union.jpeg"
              alt="Mothers' Union & Women's Group"
              fill
              className="object-cover object-top"
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
                Building Stronger Families
              </Badge>
              <h1 className="text-4xl md:text-7xl font-black text-primary tracking-tight leading-tight">
                Mothers' Union & <br/><span className="text-secondary">Women's Group</span>
              </h1>
              <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto">
                Empowering women in faith, family, and service. A space for spiritual nourishment, fellowship, and empowerment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-primary">Strengthening the Christian Home</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our Women's Ministry is dedicated to supporting the church's mission through various social and spiritual initiatives, with a special focus on the welfare of families and the community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Heart, title: "Compassion", desc: "Supporting the vulnerable and providing care for those in need in our community." },
              { icon: Flower2, title: "Spiritual Growth", desc: "Nurturing deep faith and personal development through shared prayer and study." },
              { icon: Users, title: "Fellowship", desc: "Building strong bonds between women of all generations in the church." },
              { icon: ShieldCheck, title: "Empowerment", desc: "Equipping women with the tools to lead and serve in both church and society." },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-[2rem] bg-muted/30 border border-transparent hover:border-secondary/20 hover:bg-white transition-all"
              >
                <item.icon className="h-10 w-10 text-secondary mb-6" />
                <h4 className="text-xl font-bold text-primary mb-3">{item.title}</h4>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Button size="lg" variant="gold" className="h-14 px-10 text-lg font-bold">Join Our Next Gathering</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
