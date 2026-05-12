import Link from "next/link";
import { ChevronRight, Heart, Users, BookOpen, Music, Camera, MessageSquare, Shield, Cross } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ministries = [
  { 
    name: "Kenya Anglican Men Association - KAMA", 
    href: "/ministries/men",
    description: "Empowering men to be effective leaders in their families, church, and community.",
    icon: Users
  },
  { 
    name: "Mothers Union – MU", 
    href: "/ministries/women",
    description: "Supporting marriage and family life through prayer, fellowship, and service.",
    icon: Heart
  },
  { 
    name: "Youth (SPYCE)", 
    href: "/ministries/youth",
    description: "A vibrant community for young people to grow in faith and discover their purpose.",
    icon: Cross
  },
  { 
    name: "Sunday School", 
    href: "/ministries/sunday-school",
    description: "Nurturing children in the knowledge and love of God through engaging lessons.",
    icon: BookOpen
  },
  { 
    name: "OMBI Prayer Ministry", 
    href: "/ministries/ombi",
    description: "Interceding for the church, community, and nation through continuous prayer.",
    icon: Shield
  },
  { 
    name: "Fellowship Groups", 
    href: "/fellowships",
    description: "Small groups meeting in homes for Bible study, prayer, and mutual support.",
    icon: Users
  },
  { 
    name: "Choir", 
    href: "/ministries/choir",
    description: "Leading the congregation in worship through hymns and spiritual songs.",
    icon: Music
  },
  { 
    name: "Praise and Worship", 
    href: "/ministries/praise",
    description: "Leading dynamic contemporary worship during our services.",
    icon: Music
  },
  { 
    name: "Media & Communication", 
    href: "/ministries/media",
    description: "Spreading the gospel through digital media, sound, and visual arts.",
    icon: Camera
  },
];

export default function MinistriesPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <section className="bg-primary py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Ministries</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Discover the various ways you can grow in faith, connect with others, and serve our community.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry, i) => (
            <Link href={ministry.href} key={i} className="group">
              <Card className="h-full border-2 border-transparent hover:border-primary/20 hover:shadow-lg transition-all duration-300 rounded-3xl overflow-hidden bg-white flex flex-col justify-between">
                <div>
                  <div className="p-6 pb-2">
                    <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <ministry.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <CardHeader className="pt-2">
                    <CardTitle className="text-xl font-bold text-primary group-hover:text-primary transition-colors">
                      {ministry.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {ministry.description}
                    </p>
                  </CardContent>
                </div>
                <div className="p-6 pt-0 flex items-center text-secondary font-bold text-sm group-hover:translate-x-1 transition-transform">
                  Learn More <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
