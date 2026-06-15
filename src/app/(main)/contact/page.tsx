"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We will get back to you shortly.");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <section className="bg-primary py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Have a question, want to request a prayer, or interested in joining a ministry? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="space-y-8 lg:col-span-1 order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-primary">Contact Information</h2>
            
            <div className="space-y-6">
              {[
                { icon: MapPin, title: "Our Location", detail: "Mai Mahiu RD, South C, Nairobi, Kenya (Opposite South C Shopping Centre)" },
                { icon: Phone, title: "Phone Number", detail: "+254 792127407" },
                { icon: Mail, title: "Email Address", detail: "info@ackstpaulssouthc.co.ke" },
                { icon: MessageSquare, title: "Office Hours", detail: "Mon - Fri: 8:00 AM - 5:00 PM\nSun: 7:00 AM - 1:00 PM" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-muted-foreground whitespace-pre-line">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Follow Us</h3>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://www.instagram.com/ack_st_pauls_parish_southc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white border rounded-2xl hover:shadow-md transition-all text-primary font-bold"
                >
                  <svg className="h-5 w-5 fill-none stroke-secondary stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  Instagram
                </a>
                <a 
                  href="https://www.tiktok.com/@ackstpaulsparishsouthc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white border rounded-2xl hover:shadow-md transition-all text-primary font-bold"
                >
                  <svg className="h-5 w-5 fill-secondary" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.16.71-.13 1.46.1 2.13.26.9 1.03 1.6 1.93 1.86.82.23 1.7.11 2.43-.3.91-.51 1.47-1.43 1.57-2.45.09-1.28.01-2.56.02-3.84 0-5.32-.01-10.64 0-15.96z"/>
                  </svg>
                  TikTok
                </a>
                <a 
                  href="https://web.facebook.com/Ackstpaulssouthc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white border rounded-2xl hover:shadow-md transition-all text-primary font-bold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="18" height="18" fill="currentColor" className="text-secondary">
                    <path d="M80 299.3V512H196V299.3h86.5l12.8-100.3H196V133c0-29.1 13.9-43.6 42.1-43.6H296V0h-86.4C128.1 0 80 48 80 130.5v68.5H12.8v100.3H80z"/>
                  </svg>
                  Facebook
                </a>
                <a 
                  href="https://www.youtube.com/@ackstpaulsparishsouthc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white border rounded-2xl hover:shadow-md transition-all text-primary font-bold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="18" height="18" fill="currentColor" className="text-secondary">
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 42.152 48.284 48.474C117.22 448 288 448 288 448s170.781 0 213.371-11.486c23.497-6.321 42.003-24.823 48.284-48.474 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.537V175.185l142.739 81.205-142.739 81.23z"/>
                  </svg>
                  YouTube
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 w-full rounded-[2.5rem] bg-muted border-2 border-primary/5 overflow-hidden relative shadow-inner">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?q=ACK%20St.%20Paul's%20South%20C%20Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 order-1 lg:order-2"
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and our team will reach out to you.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Jane" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="jane@example.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Prayer Request / General Inquiry" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea 
                      id="message" 
                      className="flex min-h-[150px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Write your message here..."
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full h-12 text-lg font-bold gap-2">
                    <Send className="h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
