"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Share2, Users, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const getNextWednesday = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    let daysUntilNextWednesday = (3 - dayOfWeek + 7) % 7;
    
    if (daysUntilNextWednesday === 0 && (hours > 19 || (hours === 19 && minutes >= 30))) {
      daysUntilNextWednesday = 7;
    }
    
    const nextWednesday = new Date(now);
    nextWednesday.setDate(now.getDate() + daysUntilNextWednesday);
    
    return nextWednesday.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getNextSecondSunday = () => {
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    
    while (true) {
      const firstOfMonth = new Date(year, month, 1);
      const dayOfWeekOfFirst = firstOfMonth.getDay();
      
      const daysToFirstSunday = (0 - dayOfWeekOfFirst + 7) % 7;
      const firstSunday = 1 + daysToFirstSunday;
      const secondSunday = firstSunday + 7;
      
      const secondSundayDate = new Date(year, month, secondSunday, 8, 0, 0);
      
      if (secondSundayDate > now) {
        return secondSundayDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      }
      
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
    }
  };

  const getCalendarUrls = (event: Event) => {
    const timeParts = event.time.split("-");
    const startTimeStr = timeParts[0].trim();
    
    const dateObj = new Date(`${event.date} ${startTimeStr}`);
    if (isNaN(dateObj.getTime())) {
      return null;
    }
    
    const start = dateObj.toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    let endObj = new Date(dateObj.getTime() + 60 * 60 * 1000);
    if (timeParts.length > 1) {
      const endTimeStr = timeParts[1].trim();
      const testEndObj = new Date(`${event.date} ${endTimeStr}`);
      if (!isNaN(testEndObj.getTime())) {
        endObj = testEndObj;
      }
    }
    const end = endObj.toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
    
    return { googleUrl, icsContent };
  };

  const handleIcsDownload = (event: Event, icsContent: string) => {
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.title.replace(/\s+/g, "_")}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const pinnedEvents: Event[] = [
    {
      title: "Weekly Online Prayer Meetings",
      date: mounted ? getNextWednesday() : "Loading...",
      time: "7:30 PM",
      location: "Online (Zoom)",
      description: "Every Wednesday at 7:30 p.m., providing a platform for intercession and encouragement.",
      category: "Prayer",
      attendees: "20+"
    },
    {
      title: "World Day of Prayer",
      date: "Annually in March",
      time: "TBD",
      location: "Main Sanctuary",
      description: "Held annually in March, bringing women together in prayer for the church and the world.",
      category: "Prayer",
      attendees: "100+"
    },
    {
      title: "Monthly Ladies’ Prayer Meeting",
      date: mounted ? getNextSecondSunday() : "Loading...",
      time: "8:00 AM",
      location: "Parish Hall",
      description: "Every second Sunday at 8:00 a.m., strengthening a culture of corporate prayer within the church.",
      category: "Prayer",
      attendees: "15+"
    }
  ];

  const renderEventCard = (event: Event, i: number) => {
    const calendarData = getCalendarUrls(event);
    
    return (
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

            {calendarData ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full" variant="outline">
                    Add to Calendar <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem onClick={() => window.open(calendarData.googleUrl, "_blank")}>
                    Google Calendar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleIcsDownload(event, calendarData.icsContent)}>
                    iCal / Outlook (.ics)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button className="w-full" variant="outline" disabled>
                Add to Calendar (Date TBD)
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

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

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Pinned Events Section */}
        {pinnedEvents.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-1 bg-secondary rounded-full"></div>
              <h2 className="text-3xl font-bold text-primary">Featured Events</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {pinnedEvents.map((event, i) => renderEventCard(event, i))}
            </div>
          </div>
        )}

        {/* Regular Events Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1 bg-secondary rounded-full"></div>
            <h2 className="text-3xl font-bold text-primary">All Events</h2>
          </div>
          {events.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No other upcoming events at this time.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {events.map((event, i) => renderEventCard(event, i))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
