import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMagazinePayments } from "@/app/actions/orders";
import { formatCurrency } from "@/lib/utils";
import { Heart, ShoppingBag, Clock, FileText, Mail } from "lucide-react";
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

  const magazinePayments = await getMagazinePayments();
  const paidMagazineRevenue = magazinePayments
    .filter((payment) => payment.status === "success")
    .reduce((sum, payment) => sum + Number(payment.amount), 0);
  const pendingOrders = magazinePayments.filter((payment) => payment.status === "pending").length;
  const deliveredOrders = magazinePayments.filter((payment) => payment.delivered_at).length;

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
    { title: "Magazine Sales", value: formatCurrency(paidMagazineRevenue), icon: ShoppingBag, color: "text-blue-500" },
    { title: "Active Magazines", value: magazinesCount?.toString() || "0", icon: FileText, color: "text-green-500" },
    { title: "Pending Orders", value: pendingOrders.toLocaleString(), icon: Clock, color: "text-amber-500" },
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
            <div className="space-y-4">
              {magazinePayments.length === 0 ? (
                <div className="space-y-4 py-8 text-center">
                  <ShoppingBag className="mx-auto mb-2 h-12 w-12 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground">No magazine orders yet.</p>
                </div>
              ) : (
                magazinePayments.slice(0, 5).map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{payment.customer_name}</p>
                      <p className="truncate text-xs text-muted-foreground">{payment.product_title}</p>
                      <p className="text-xs text-muted-foreground">{payment.mpesa_receipt || "No M-Pesa code"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{formatCurrency(payment.amount)}</p>
                      <Badge variant={payment.delivered_at ? "default" : "secondary"} className="mt-1 gap-1">
                        {payment.delivered_at ? (
                          <>
                            <Mail className="h-3 w-3" />
                            Sent
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3" />
                            Review
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
              {magazinePayments.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {deliveredOrders.toLocaleString()} of {magazinePayments.length.toLocaleString()} order emails sent.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
