"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { createMerchandise, updateMerchandise } from "@/app/actions/merchandise";
import { toast } from "sonner";
import { Merchandise } from "@/types";

interface MerchandiseFormProps {
  merchandise?: Merchandise;
  trigger?: React.ReactNode;
}

export function MerchandiseForm({ merchandise, trigger }: MerchandiseFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEditing = !!merchandise;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    if (isEditing) {
      formData.append("existingImagePath", merchandise.image_path || "");
    }

    const result = isEditing 
      ? await updateMerchandise(merchandise.id, formData)
      : await createMerchandise(formData);
    
    setLoading(false);
    if (result.success) {
      toast.success(isEditing ? "Merchandise updated successfully!" : "Merchandise added successfully!");
      setOpen(false);
      if (!isEditing) (e.target as HTMLFormElement).reset();
    } else {
      toast.error(result.error || `Failed to ${isEditing ? "update" : "add"} merchandise`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Merchandise
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Merchandise" : "Add New Merchandise"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update item details." : "Add a new item to the church shop."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Item Name</Label>
            <Input 
              id="title" 
              name="title" 
              placeholder="e.g. Parish T-Shirt" 
              defaultValue={merchandise?.title}
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder="Size, material, etc..." 
              defaultValue={merchandise?.description}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (KES)</Label>
              <Input 
                id="price" 
                name="price" 
                type="number" 
                step="0.01" 
                placeholder="1000" 
                defaultValue={merchandise?.price}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category" 
                name="category" 
                defaultValue={merchandise?.category || "T-Shirts"}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="T-Shirts">T-Shirts</option>
                <option value="Pens">Pens</option>
                <option value="Notebooks">Notebooks</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">{isEditing ? "Change Image (Optional)" : "Product Image"}</Label>
            <Input id="image" name="image" type="file" accept="image/*" required={!isEditing} />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? "Updating..." : "Adding..."}
              </>
            ) : (
              isEditing ? "Update Details" : "Add to Shop"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
