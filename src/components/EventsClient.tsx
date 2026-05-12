"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Share2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  attendees: string;
}

interface EventsClientProps {
  events: Event[];
}

export default function EventsClient({ events }: EventsClientProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <section className="bg-primary py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Stay engaged with our community. Mark your calendars for these upcoming spiritual and social activities.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {events.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-muted-foreground">No Events</h2>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full flex flex-col border-l-4 border-l-secondary">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-secondary border-secondary">{event.category}</Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon"><Share2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-primary">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">{event.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-secondary" />
                        <span className="font-medium text-foreground">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 text-secondary" />
                        <span className="font-medium text-foreground">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-secondary" />
                        <span className="font-medium text-foreground">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4 text-secondary" />
                        <span className="font-medium text-foreground">{event.attendees} expected</span>
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">Set Reminder</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
