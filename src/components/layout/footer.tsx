import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe, ChevronRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-primary text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container relative z-10 mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative h-16 w-16 transition-transform group-hover:scale-110">
                <Image src="/ackimage.ico" alt="ACK Logo" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight leading-none text-white">ACK St Paul's</span>
                <span className="text-sm font-bold text-accent tracking-widest uppercase">South C Parish</span>
              </div>
            </Link>
            <p className="text-lg text-slate-300 leading-relaxed">
              To be an Empowered Church Transforming Humanity. Join us as we worship and serve our Lord Jesus Christ in faith, hope, and love.
            </p>
            <div className="flex space-x-5">
              <Link href="https://www.instagram.com/ack_st_pauls_parish_southc" target="_blank" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-primary transition-all duration-300">
                <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="https://www.tiktok.com/@ackstpaulsparishsouthc" target="_blank" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-primary transition-all duration-300">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.16.71-.13 1.46.1 2.13.26.9 1.03 1.6 1.93 1.86.82.23 1.7.11 2.43-.3.91-.51 1.47-1.43 1.57-2.45.09-1.28.01-2.56.02-3.84 0-5.32-.01-10.64 0-15.96z"/>
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div>
            <h4 className="mb-8 text-xl font-bold text-accent uppercase tracking-widest">Explore</h4>
            <ul className="space-y-4 text-base">
              {[
                { label: "Our Story", href: "/about" },
                { label: "Youth (SPYCE)", href: "/ministries/youth" },
                { label: "Sunday School", href: "/ministries/sunday-school" },
                { label: "Missions Dept.", href: "/ministries/missions" },
                { label: "Ushers Ministry", href: "/ministries/ushers" },
                { label: "OMBI Prayer", href: "/ministries/ombi" },
                { label: "Home Fellowships", href: "/fellowships" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-300 hover:text-white flex items-center gap-2 transition-all group">
                    <ChevronRight className="h-4 w-4 text-secondary group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Column */}
          <div>
            <h4 className="mb-8 text-xl font-bold text-accent uppercase tracking-widest">Resources</h4>
            <ul className="space-y-4 text-base">
              {[
                { label: "Support via M-Pesa", href: "/donate" },
                { label: "Magazine Store", href: "/shop" },
                { label: "Gallery & Photos", href: "/gallery" },
                { label: "Blog & News", href: "/blog" },
                { label: "Upcoming Events", href: "/events" },
                { label: "Sermons & Word", href: "/sermons" },
                { label: "Contact Us", href: "/contact" },
                { label: "Succession Planning", href: "/resources/succession" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-300 hover:text-white flex items-center gap-2 transition-all group">
                    <ChevronRight className="h-4 w-4 text-secondary group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="space-y-8">
            <h4 className="text-xl font-bold text-accent uppercase tracking-widest">Get in Touch</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group cursor-pointer">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
                  <MapPin className="h-5 w-5 text-accent group-hover:text-white" />
                </div>
                <span className="text-base text-slate-300 leading-relaxed">South C Mai Mahio Road, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
                  <Phone className="h-5 w-5 text-accent group-hover:text-white" />
                </div>
                <span className="text-base text-slate-300">+254 717 401333</span>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
                  <Mail className="h-5 w-5 text-accent group-hover:text-white" />
                </div>
                <span className="text-base text-slate-300">info@ackstpaulssouthc.co.ke</span>
              </div>
            </div>
            
            <div className="pt-4">
              <p className="text-sm font-bold text-slate-400 mb-4 tracking-widest uppercase">Office Hours</p>
              <p className="text-base text-slate-300">Mon - Fri: 8:00 AM - 5:00 PM</p>
              <p className="text-base text-slate-300">Sun: 7:00 AM - 2:00 PM</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-20 border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400">
          <div className="flex items-center gap-4">
            <div className="relative h-8 w-8">
              <Image src="/ackimage.ico" alt="ACK Logo" fill className="object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
            </div>
            <p className="text-base">
              © {new Date().getFullYear()} <span className="text-white font-bold">ACK St Paul's Parish South C</span>. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
            <Link href="/legal/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
