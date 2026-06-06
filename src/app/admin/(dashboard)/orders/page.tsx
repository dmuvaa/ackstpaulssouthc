import {
  getMagazinePayments,
  getMerchandisePayments,
} from "@/app/actions/orders";
import { OrdersHub } from "@/components/admin/orders-hub";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { BookOpen, CheckCircle2, Clock, Package, Truck } from "lucide-react";

export default async function AdminOrdersPage() {
  const [magazinePayments, merchandisePayments] = await Promise.all([
    getMagazinePayments(),
    getMerchandisePayments(),
  ]);

  const allPayments = [...magazinePayments, ...merchandisePayments];

  const totalRevenue = allPayments
    .filter((payment) => payment.status === "success")
    .reduce((sum, payment) => sum + Number(payment.amount), 0);

  const pendingMagazines = magazinePayments.filter(
    (payment) => payment.status === "pending"
  ).length;
  const pendingMerchandise = merchandisePayments.filter(
    (payment) => payment.status === "pending"
  ).length;

  const deliveredMagazines = magazinePayments.filter(
    (payment) => payment.delivered_at
  ).length;
  const deliveredMerchandise = merchandisePayments.filter(
    (payment) => payment.fulfillment_status === "delivered"
  ).length;

  const stats = [
    {
      title: "Confirmed Sales",
      value: formatCurrency(totalRevenue),
      caption: "Magazines and merchandise combined",
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      title: "Magazines Pending",
      value: pendingMagazines.toLocaleString(),
      caption: "Awaiting M-Pesa verification & email",
      icon: BookOpen,
      color: "text-amber-600",
    },
    {
      title: "Merchandise Pending",
      value: pendingMerchandise.toLocaleString(),
      caption: "Awaiting payment confirmation",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Fulfilled Orders",
      value: (deliveredMagazines + deliveredMerchandise).toLocaleString(),
      caption: `${deliveredMagazines} emails sent · ${deliveredMerchandise} delivered`,
      icon: Truck,
      color: "text-primary",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">
          Sales & Transactions
        </h2>
        <p className="max-w-3xl text-muted-foreground leading-relaxed">
          Review PayBill and M-Pesa payments in two separate workflows. Magazine
          orders are digital — verify the M-Pesa code, then send the reader email.
          Merchandise orders need physical fulfillment — confirm payment, then track
          pickup or delivery. When a transaction cannot be confirmed, use{" "}
          <span className="font-medium text-foreground">Other Actions</span> to
          reject it, request follow-up, correct the M-Pesa code, or add internal notes.
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
          <CardTitle>Orders</CardTitle>
          <p className="text-sm text-muted-foreground">
            Use the Magazines tab for digital reader delivery. Use the Merchandise
            tab for items that must be collected or delivered in person.
          </p>
        </CardHeader>
        <CardContent>
          <OrdersHub
            magazinePayments={magazinePayments}
            merchandisePayments={merchandisePayments}
          />
          <div className="mt-6 space-y-2 rounded-lg border border-muted bg-muted/20 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Admin quick reference</p>
            <ul className="list-disc space-y-1 pl-5 leading-relaxed">
              <li>
                <span className="font-medium text-foreground">Cannot verify M-Pesa?</span>{" "}
                Use Other Actions → Reject payment, or flag follow-up and call the buyer.
              </li>
              <li>
                <span className="font-medium text-foreground">Wrong code submitted?</span>{" "}
                Update the M-Pesa code after checking your PayBill statement (308937).
              </li>
              <li>
                <span className="font-medium text-foreground">Magazine email not received?</span>{" "}
                Resend the reader link from Other Actions after confirming payment.
              </li>
              <li>
                <span className="font-medium text-foreground">Merchandise ready?</span>{" "}
                Mark ready for pickup, shipped, or delivered as the order progresses.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {(pendingMagazines > 0 || pendingMerchandise > 0) && (
        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          <Clock className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            {pendingMagazines + pendingMerchandise} order
            {pendingMagazines + pendingMerchandise === 1 ? "" : "s"} waiting for review
            {pendingMagazines > 0 && pendingMerchandise > 0
              ? ` (${pendingMagazines} magazine, ${pendingMerchandise} merchandise)`
              : pendingMagazines > 0
                ? ` (${pendingMagazines} magazine)`
                : ` (${pendingMerchandise} merchandise)`}
            . Open each order to see buyer details and available actions.
          </p>
        </div>
      )}
    </div>
  );
}
