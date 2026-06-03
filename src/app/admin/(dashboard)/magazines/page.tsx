import { getMagazines } from "@/app/actions/magazines";
import { MagazineCatalog } from "@/components/admin/magazine-catalog";
import { MagazineForm } from "@/components/admin/magazine-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { FileText, ImageIcon, Library, Wallet } from "lucide-react";

export default async function AdminMagazinesPage() {
  const magazines = await getMagazines();
  const totalCatalogValue = magazines.reduce((sum, magazine) => sum + Number(magazine.price || 0), 0);
  const withPdfCount = magazines.filter((magazine) => magazine.file_path).length;
  const withCoverCount = magazines.filter((magazine) => magazine.image_path).length;

  const stats = [
    {
      title: "Catalog Items",
      value: magazines.length.toLocaleString(),
      caption: "Magazine listings",
      icon: Library,
      color: "text-primary",
    },
    {
      title: "PDF Assets",
      value: withPdfCount.toLocaleString(),
      caption: "Reader-ready files",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Cover Assets",
      value: withCoverCount.toLocaleString(),
      caption: "Shop visuals uploaded",
      icon: ImageIcon,
      color: "text-green-600",
    },
    {
      title: "Catalog Value",
      value: formatCurrency(totalCatalogValue),
      caption: "Combined listed prices",
      icon: Wallet,
      color: "text-amber-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Magazines</h2>
          <p className="text-muted-foreground">
            Manage listings, reader files, cover assets, and shop visibility.
          </p>
        </div>
        <MagazineForm />
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
          <CardTitle>Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          {magazines.length === 0 ? (
            <div className="rounded-md border py-12 text-center text-sm text-muted-foreground">
              No magazines found. Upload the first one to build the catalog.
            </div>
          ) : (
            <MagazineCatalog magazines={magazines} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
