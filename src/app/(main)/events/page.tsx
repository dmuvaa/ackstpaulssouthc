export const dynamic = "force-dynamic";

import EventsClient from "@/components/EventsClient";
import { fetchSanity } from "@/lib/sanity";

const fallbackEvents = [
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

export default async function EventsPage() {
  let events = fallbackEvents;

  try {
    const sanityEvents = await fetchSanity<any[]>(`*[_type == "event"] | order(date asc) {
      title,
      date,
      time,
      location,
      description,
      category,
      attendees
    }`);

    if (sanityEvents) {
      events = sanityEvents; // If Sanity returns [], it will use it and show empty state
    }
  } catch (error) {
    console.error("Failed to fetch events from Sanity:", error);
  }

  return <EventsClient events={events} />;
}
