import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ShoppingBag, Users, TrendingUp, FileText } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Donation } from "@/types";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Fetch total donations amount
  const { data: donationsData } = await supabase
    .from("donations")
    .select("amount")
    .eq("status", "confirmed");
  
  const totalDonations = donationsData?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;

  // Fetch total orders (placeholder for now as orders table might be empty/not exist)
  const { count: ordersCount } = await supabase
    .from("payments")
    .select("*", { count: 'exact', head: true })
    .eq("type", "purchase");

  // Fetch recent donations
  const { data: recentDonations } = await supabase
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch active magazines
  const { count: magazinesCount } = await supabase
    .from("products")
    .select("*", { count: 'exact', head: true });

  const stats = [
    { title: "Total Donations", value: `KES ${totalDonations.toLocaleString()}`, icon: Heart, color: "text-red-500" },
    { title: "Magazine Orders", value: ordersCount?.toString() || "0", icon: ShoppingBag, color: "text-blue-500" },
    { title: "Active Magazines", value: magazinesCount?.toString() || "0", icon: FileText, color: "text-green-500" },
    { title: "Engagement", value: "0%", icon: TrendingUp, color: "text-secondary" }, // Placeholder
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">Since project launch</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(!recentDonations || recentDonations.length === 0) ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No donations found yet.</p>
              ) : (
                recentDonations.map((donation: Donation) => (
                  <div key={donation.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {donation.name?.[0]?.toUpperCase() || "A"}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{donation.name || "Anonymous"}</p>
                        <p className="text-xs text-muted-foreground">{donation.cause}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">KES {donation.amount.toLocaleString()}</p>
                      <p className={`text-[10px] uppercase font-bold ${donation.status === 'confirmed' ? 'text-green-600' : 'text-amber-500'}`}>
                        {donation.status}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-center py-8">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">E-shop integration coming soon.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
