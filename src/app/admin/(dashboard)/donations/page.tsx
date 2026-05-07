import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Donation } from "@/types";

export default async function AdminDonationsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data: donations } = await supabase
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-primary">Donations</h2>
          <p className="text-muted-foreground">Manage and track all church donations.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search donations..." className="pl-10" />
        </div>
        <select className="h-9 w-[180px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <option>All Statuses</option>
          <option>Confirmed</option>
          <option>Pending</option>
        </select>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Donor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Cause</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(!donations || donations.length === 0) ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No donations found.
                </TableCell>
              </TableRow>
            ) : (
              donations.map((donation: Donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">{donation.name || "Anonymous"}</TableCell>
                  <TableCell>KES {donation.amount.toLocaleString()}</TableCell>
                  <TableCell className="capitalize">{donation.cause}</TableCell>
                  <TableCell>{donation.phone_number || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={donation.status === "confirmed" ? "default" : "secondary"}>
                      {donation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(donation.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
