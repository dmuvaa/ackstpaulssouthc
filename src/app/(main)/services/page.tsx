"use client";

import { motion } from "framer-motion";
import { Clock, Calendar, Heart, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const services = [
  { time: "8:00 AM - 9:30 AM", title: "First English Service", desc: "Our early morning service conducted in English." },
  { time: "10:00 AM - 12:20 PM", title: "Second English Service", desc: "The main morning service conducted in English." },
  { time: "12:30 PM - 1:30 PM", title: "Swahili Service", desc: "Worship service conducted in Kiswahili." },
  { time: "10:00 AM - 12:00 PM", title: "Youth Service", desc: "Dedicated service for the youth." },
  { time: "10:30 AM - 12:00 PM", title: "Teens Service", desc: "Focused service for teenagers." },
  { time: "10:30 AM - 12:00 PM", title: "Children Ministry Service", desc: "Sunday school and activities for children." },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1.5 text-sm uppercase tracking-widest font-bold">
              Worship With Us
            </Badge>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Church Services & Schedule
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Join us for transformative worship experiences throughout the week and on Sundays.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Office Hours & Sunday Services */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            
            {/* Office Hours */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl border shadow-sm sticky top-28">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Clock className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-primary mb-4">Church Office Hours</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <p className="font-bold text-foreground">Monday to Friday</p>
                    <p>8:00 AM - 5:00 PM</p>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Sundays</p>
                    <p>8:00 AM - 2:00 PM</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-5 w-5 text-secondary" />
                    <span>South C Mai Mahui Road, Nairobi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sunday Services */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-primary">Sunday Worship Services</h2>
                    <p className="text-muted-foreground">We offer multiple services to cater to our diverse congregation.</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {services.map((service, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all"
                    >
                      <Badge className="bg-secondary text-white mb-3">{service.time}</Badge>
                      <h3 className="text-xl font-bold text-primary mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Creche Note */}
                <Card className="bg-primary text-white border-none rounded-2xl overflow-hidden mt-8">
                  <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
                    <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Heart className="h-8 w-8 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Creche Available</h3>
                      <p className="text-slate-200 text-sm">
                        We also have a Creche for lactating mothers to worship with us comfortably.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
