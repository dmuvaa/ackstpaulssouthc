import { getMagazinePayments } from "@/app/actions/orders";
import { OrdersWorkspace } from "@/components/admin/orders-workspace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2, Clock, Mail, Receipt } from "lucide-react";

export default async function AdminOrdersPage() {
  const payments = await getMagazinePayments();
  const totalRevenue = payments
    .filter((payment) => payment.status === "success")
    .reduce((sum, payment) => sum + Number(payment.amount), 0);
  const pendingCount = payments.filter((payment) => payment.status === "pending").length;
  const deliveredCount = payments.filter((payment) => payment.delivered_at).length;
  const manualCount = payments.filter((payment) => payment.is_manual).length;

  const stats = [
    {
      title: "Confirmed Sales",
      value: formatCurrency(totalRevenue),
      caption: "Successful magazine payments",
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      title: "Pending Review",
      value: pendingCount.toLocaleString(),
      caption: "Need manual confirmation",
      icon: Clock,
      color: "text-amber-600",
    },
    {
      title: "Reader Emails Sent",
      value: deliveredCount.toLocaleString(),
      caption: "Magazine links delivered",
      icon: Mail,
      color: "text-blue-600",
    },
    {
      title: "Manual Orders",
      value: manualCount.toLocaleString(),
      caption: "Submitted with M-Pesa code",
      icon: Receipt,
      color: "text-primary",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Sales & Transactions</h2>
        <p className="text-muted-foreground">
          Review manual magazine payments, confirm M-Pesa details, and send the reader email.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.caption}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Magazine Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <OrdersWorkspace payments={payments} />
          <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
            <Mail className="mt-0.5 h-4 w-4 shrink-0" />
            Confirming a payment marks it successful, creates a private reader link, and emails the buyer.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
