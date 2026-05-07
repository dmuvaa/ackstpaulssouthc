"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Share2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    title: "Annual Church Harambee",
    date: "June 14, 2026",
    time: "8:00 AM - 1:00 PM",
    location: "Main Sanctuary",
    description: "Our major fundraising event for the completion of the new community hall. Everyone is welcome to contribute and fellowship.",
    category: "Fundraiser",
    attendees: "500+"
  },
  {
    title: "Youth Night of Worship",
    date: "May 29, 2026",
    time: "6:00 PM - 9:00 PM",
    location: "Parish Hall",
    description: "An evening dedicated to our youth, featuring praise, worship, and guest testimonies.",
    category: "Youth",
    attendees: "200+"
  },
  {
    title: "Mothers' Union Conference",
    date: "May 15-17, 2026",
    time: "All Day",
    location: "Ack St Paul's Parish",
    description: "A three-day conference for the Mothers' Union focusing on 'Strong Families, Strong Nation'.",
    category: "Ministry",
    attendees: "150"
  },
  {
    title: "Bible Study: Acts of the Apostles",
    date: "Every Wednesday",
    time: "5:30 PM - 7:00 PM",
    location: "Online (Zoom)",
    description: "Join us weekly as we dive deep into the early church history and its lessons for us today.",
    category: "Study",
    attendees: "50+"
  }
];

export default function EventsPage() {
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
      </div>
    </div>
  );
}
