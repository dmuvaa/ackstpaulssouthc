"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Users, ShieldCheck, Flower2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WomenMinistryPage() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[50vh] min-h-[300px] w-full overflow-hidden">
        <Image
          src="/images/MU 2.jpeg"
          alt="Women's Ministry"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="mb-4 text-4xl font-bold sm:text-6xl">Mothers' Union & Women's Group</h1>
            <p className="text-lg text-slate-200 opacity-90">Empowering women in faith, family, and service.</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Building Stronger Families</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our Women's Ministry is a space for spiritual nourishment, fellowship, and empowerment. We focus on strengthening the Christian home and supporting the church's mission through various social and spiritual initiatives.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                { icon: Heart, title: "Compassion", desc: "Supporting the vulnerable in our community." },
                { icon: Flower2, title: "Growth", desc: "Nurturing spiritual and personal development." },
              ].map((item, i) => (
                <Card key={i} className="p-6 border-none bg-muted/50">
                  <item.icon className="h-8 w-8 text-secondary mb-4" />
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/sisters keeper .jpeg"
              alt="Sisters Keeper"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
