import { getMerchandise } from "@/app/actions/merchandise";
import { MerchandiseForm } from "@/components/admin/merchandise-form";
import { MerchandiseActions } from "@/components/admin/merchandise-actions";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { ImageIcon, Package } from "lucide-react";

export default async function AdminMerchandisePage() {
  const merchandise = await getMerchandise();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Merchandise</h2>
          <p className="text-muted-foreground">
            Manage church T-shirts, pens, notebooks, and other physical items.
          </p>
        </div>
        <MerchandiseForm />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {merchandise.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    No merchandise found. Add your first item!
                  </TableCell>
                </TableRow>
              ) : (
                merchandise.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center overflow-hidden">
                          {item.image_path ? (
                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Package className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(item.price)}</TableCell>
                    <TableCell>
                      {item.in_stock ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                          In Stock
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Out of Stock</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(item.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <MerchandiseActions 
                        item={item} 
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
