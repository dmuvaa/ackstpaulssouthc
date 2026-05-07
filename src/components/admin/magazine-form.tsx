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
import { createMagazine } from "@/app/actions/magazines";
import { toast } from "sonner";

export function MagazineForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await createMagazine(formData);
    
    setLoading(false);
    if (result.success) {
      toast.success("Magazine uploaded successfully!");
      setOpen(false);
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(result.error || "Failed to upload magazine");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Magazine
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Magazine</DialogTitle>
          <DialogDescription>
            Upload a new magazine PDF and its cover image.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="e.g. Easter Edition 2024" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Brief overview of the content..." />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (KES)</Label>
              <Input id="price" name="price" type="number" step="0.01" placeholder="500" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Category</Label>
              <select 
                id="type" 
                name="type" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Digital">Digital</option>
                <option value="Physical">Physical</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pdf">Magazine PDF</Label>
              <Input id="pdf" name="pdf" type="file" accept=".pdf" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Cover Image</Label>
              <Input id="image" name="image" type="file" accept="image/*" required />
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Magazine"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
