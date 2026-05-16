"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Loader2, Edit } from "lucide-react";
import { deleteMerchandise } from "@/app/actions/merchandise";
import { toast } from "sonner";
import { Merchandise } from "@/types";
import { MerchandiseForm } from "./merchandise-form";

interface MerchandiseActionsProps {
  item: Merchandise;
}

export function MerchandiseActions({ item }: MerchandiseActionsProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const result = await deleteMerchandise(item.id, item.image_path || "");
    setLoading(false);
    
    if (result.success) {
      toast.success("Item deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete item");
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <MerchandiseForm 
        merchandise={item} 
        trigger={
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
            <Edit className="h-4 w-4" />
          </Button>
        }
      />
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the item
              from the shop and remove its image from storage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
