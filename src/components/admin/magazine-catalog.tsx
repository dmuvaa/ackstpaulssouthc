"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MagazineActions } from "@/components/admin/magazine-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import {
  Calendar,
  ExternalLink,
  FileText,
  FolderOpen,
  ImageIcon,
  Search,
  Tag,
} from "lucide-react";

type MagazineRecord = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  type: string;
  file_path: string;
  image_path: string;
  created_at: string;
};

type MagazineCatalogProps = {
  magazines: MagazineRecord[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getAssetState(magazine: MagazineRecord) {
  if (magazine.file_path && magazine.image_path) return "Ready";
  if (magazine.file_path || magazine.image_path) return "Incomplete";
  return "Missing";
}

export function MagazineCatalog({ magazines }: MagazineCatalogProps) {
  const [query, setQuery] = useState("");
  const [selectedMagazine, setSelectedMagazine] = useState<MagazineRecord | null>(null);

  const filteredMagazines = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return magazines.filter((magazine) => {
      const searchable = [
        magazine.title,
        magazine.description,
        magazine.type,
        magazine.file_path,
        magazine.image_path,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [magazines, query]);

  return (
    <div className="space-y-4">
      <div className="relative max-w-lg">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search magazine title, category, or storage path"
          className="pl-9"
        />
      </div>

      {filteredMagazines.length === 0 ? (
        <div className="rounded-md border py-12 text-center text-sm text-muted-foreground">
          No magazines match this catalog view.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMagazines.map((magazine) => (
            <button
              key={magazine.id}
              type="button"
              onClick={() => setSelectedMagazine(magazine)}
              className="group text-left"
            >
              <Card className="h-full transition hover:border-primary/35 hover:shadow-md">
                <CardContent className="flex h-full flex-col gap-4 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 font-semibold leading-tight">{magazine.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {magazine.description || "No description added."}
                      </p>
                    </div>
                    <Badge variant="secondary">{magazine.type}</Badge>
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-md bg-muted/50 p-3">
                      <div className="text-xs text-muted-foreground">Price</div>
                      <div className="font-semibold">{formatCurrency(magazine.price)}</div>
                    </div>
                    <div className="rounded-md bg-muted/50 p-3">
                      <div className="text-xs text-muted-foreground">Assets</div>
                      <div className="font-semibold">{getAssetState(magazine)}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
                    <span>{formatDate(magazine.created_at)}</span>
                    <span className="font-medium text-primary group-hover:underline">Open details</span>
                  </div>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      )}

      <Dialog open={Boolean(selectedMagazine)} onOpenChange={(open) => !open && setSelectedMagazine(null)}>
        {selectedMagazine && (
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[760px]">
            <DialogHeader>
              <DialogTitle>{selectedMagazine.title}</DialogTitle>
              <DialogDescription>
                Catalog details, storage assets, shop visibility, and admin actions.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Tag className="h-4 w-4" />
                    Listing
                  </div>
                  <dl className="grid gap-3 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Description</dt>
                      <dd className="mt-1 whitespace-pre-wrap">{selectedMagazine.description || "No description added."}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <dt className="text-muted-foreground">Category</dt>
                        <dd className="font-medium">{selectedMagazine.type}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Price</dt>
                        <dd className="font-medium">{formatCurrency(selectedMagazine.price)}</dd>
                      </div>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Product ID</dt>
                      <dd className="mt-1 break-all font-mono text-xs">{selectedMagazine.id}</dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-md border p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <FolderOpen className="h-4 w-4" />
                    Storage Assets
                  </div>
                  <dl className="grid gap-3 text-sm">
                    <div>
                      <dt className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        PDF path
                      </dt>
                      <dd className="mt-1 break-all font-mono text-xs">{selectedMagazine.file_path || "Missing"}</dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-2 text-muted-foreground">
                        <ImageIcon className="h-4 w-4" />
                        Cover path
                      </dt>
                      <dd className="mt-1 break-all font-mono text-xs">{selectedMagazine.image_path || "Missing"}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Calendar className="h-4 w-4" />
                    Catalog State
                  </div>
                  <dl className="grid gap-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Created</dt>
                      <dd className="text-right">{formatDate(selectedMagazine.created_at)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Asset status</dt>
                      <dd>
                        <Badge variant={getAssetState(selectedMagazine) === "Ready" ? "default" : "secondary"}>
                          {getAssetState(selectedMagazine)}
                        </Badge>
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-md border p-4">
                  <div className="mb-3 text-sm font-semibold">Admin Actions</div>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <Link href={`/shop/${selectedMagazine.id}`}>
                        <ExternalLink className="h-4 w-4" />
                        View shop page
                      </Link>
                    </Button>
                    <MagazineActions
                      id={selectedMagazine.id}
                      filePath={selectedMagazine.file_path}
                      imagePath={selectedMagazine.image_path}
                      title={selectedMagazine.title}
                      description={selectedMagazine.description || ""}
                      price={selectedMagazine.price}
                      type={selectedMagazine.type}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
