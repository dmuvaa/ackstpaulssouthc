import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Heart, 
  ShoppingBag, 
  FileText, 
  Calendar as CalendarIcon, 
  LogOut
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
            { name: "Donations", href: "/admin/donations", icon: Heart },
            { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
            { name: "Magazines", href: "/admin/magazines", icon: FileText },
            { name: "Events", href: "/admin/events", icon: CalendarIcon },
            { name: "Blog Posts", href: "/admin/blog", icon: FileText },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <form action={logout}>
            <Button type="submit" variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b bg-white flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold">Church Management System</h1>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end mr-2">
              <span className="text-sm font-medium">{user?.email}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Administrator</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
              {user?.email?.[0].toUpperCase() || "A"}
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
