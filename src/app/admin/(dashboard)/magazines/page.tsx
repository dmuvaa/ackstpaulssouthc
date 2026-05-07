import { getMagazines } from "@/app/actions/magazines";
import { MagazineForm } from "@/components/admin/magazine-form";
import { MagazineActions } from "@/components/admin/magazine-actions";
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
import { FileText, ImageIcon } from "lucide-react";

export default async function AdminMagazinesPage() {
  const magazines = await getMagazines();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Magazines</h2>
          <p className="text-muted-foreground">
            Manage your digital and physical church magazines.
          </p>
        </div>
        <MagazineForm />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Magazine</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Assets</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {magazines.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    No magazines found. Upload your first one!
                  </TableCell>
                </TableRow>
              ) : (
                magazines.map((magazine) => (
                  <TableRow key={magazine.id}>
                    <TableCell>
                      <div className="font-medium">{magazine.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                        {magazine.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{magazine.type}</Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(magazine.price)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {magazine.file_path && (
                          <FileText className="h-4 w-4 text-blue-500" />
                        )}
                        {magazine.image_path && (
                          <ImageIcon className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(magazine.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <MagazineActions 
                        id={magazine.id} 
                        filePath={magazine.file_path} 
                        imagePath={magazine.image_path} 
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
