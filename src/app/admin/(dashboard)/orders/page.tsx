import { getMagazinePayments } from "@/app/actions/orders";
import { OrderActions } from "@/components/admin/order-actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2, Clock, Mail, Receipt } from "lucide-react";

function statusVariant(status: string) {
  if (status === "success") return "default";
  if (status === "failed") return "destructive";
  return "secondary";
}

export default async function AdminOrdersPage() {
  const payments = await getMagazinePayments();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Sales & Transactions</h2>
        <p className="text-muted-foreground">
          Confirm manual magazine payments and email secure download links.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Magazine Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Magazine</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    No magazine purchases yet.
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div className="font-medium">{payment.customer_name}</div>
                      <div className="text-xs text-muted-foreground">{payment.customer_email}</div>
                      <div className="text-xs text-muted-foreground">{payment.phone}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{payment.product_title}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(payment.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{formatCurrency(payment.amount)}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Receipt className="h-3 w-3" />
                        {payment.mpesa_receipt || "No code"}
                      </div>
                      {payment.is_manual && (
                        <Badge variant="secondary" className="mt-1">
                          Manual
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(payment.status)}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {payment.delivered_at ? (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          Sent
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          Waiting
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <OrderActions
                        paymentId={payment.id}
                        disabled={Boolean(payment.delivered_at)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
            <Mail className="mt-0.5 h-4 w-4 shrink-0" />
            Confirming a payment marks it successful, creates a 7-day download link, and emails the buyer.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
