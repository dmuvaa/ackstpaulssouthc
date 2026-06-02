"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { createMagazineRecord, discardMagazineUploads } from "@/app/actions/magazines";
import { toast } from "sonner";

type SignedUpload = {
  signedUrl: string;
  path: string;
  token: string;
};

type UploadProgress = {
  pdf: number;
  image: number;
  total: number;
};

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Failed to upload magazine";
}

function uploadToSignedUrl(file: File, upload: SignedUpload, onProgress: (progress: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const body = new FormData();

    body.append("cacheControl", "3600");
    body.append("", file);

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      onProgress(Math.round((event.loaded / event.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100);
        resolve();
        return;
      }

      reject(new Error(xhr.responseText || `Upload failed with status ${xhr.status}`));
    };
    xhr.onerror = () => reject(new Error("Upload failed. Please check your connection and try again."));
    xhr.open("PUT", upload.signedUrl);
    xhr.send(body);
  });
}

export function MagazineForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState<UploadProgress>({
    pdf: 0,
    image: 0,
    total: 0,
  });

  function resetUploadState() {
    setStatus("");
    setProgress({ pdf: 0, image: 0, total: 0 });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const pdfFile = formData.get("pdf");
    const imageFile = formData.get("image");
    const title = String(formData.get("title") || "");
    const description = String(formData.get("description") || "");
    const price = parseFloat(String(formData.get("price") || ""));
    const type = String(formData.get("type") || "Digital");

    if (!(pdfFile instanceof File) || pdfFile.size === 0) {
      toast.error("Please choose a magazine PDF");
      return;
    }

    if (!(imageFile instanceof File) || imageFile.size === 0) {
      toast.error("Please choose a cover image");
      return;
    }

    setLoading(true);
    resetUploadState();

    let pdfUploaded = false;
    let imageUploaded = false;
    let uploads: { pdf: SignedUpload; image: SignedUpload } | null = null;

    const updateProgress = (key: "pdf" | "image", value: number) => {
      setProgress((current) => {
        const next = { ...current, [key]: value };
        const totalSize = pdfFile.size + imageFile.size;
        const total = Math.round(
          ((next.pdf * pdfFile.size) + (next.image * imageFile.size)) / totalSize
        );

        return { ...next, total };
      });
    };

    try {
      setStatus("Preparing secure upload...");
      const uploadResponse = await fetch("/api/admin/magazines/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pdf: {
            name: pdfFile.name,
            size: pdfFile.size,
            type: pdfFile.type,
          },
          image: {
            name: imageFile.name,
            size: imageFile.size,
            type: imageFile.type,
          },
        }),
      });
      const uploadPayload = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadPayload.success) {
        throw new Error(uploadPayload.error || "Failed to prepare upload");
      }

      const preparedUploads = uploadPayload.uploads as { pdf: SignedUpload; image: SignedUpload };
      uploads = preparedUploads;
      setStatus(`Uploading files (${formatFileSize(pdfFile.size + imageFile.size)})...`);
      const uploadResults = await Promise.allSettled([
        uploadToSignedUrl(pdfFile, preparedUploads.pdf, (value) => updateProgress("pdf", value))
          .then(() => {
            pdfUploaded = true;
          }),
        uploadToSignedUrl(imageFile, preparedUploads.image, (value) => updateProgress("image", value))
          .then(() => {
            imageUploaded = true;
          }),
      ]);
      const failedUpload = uploadResults.find((result) => result.status === "rejected");

      if (failedUpload?.status === "rejected") {
        await discardMagazineUploads(
          pdfUploaded ? preparedUploads.pdf.path : undefined,
          imageUploaded ? preparedUploads.image.path : undefined
        );
        throw failedUpload.reason;
      }

      setStatus("Saving magazine...");
      const result = await createMagazineRecord({
        title,
        description,
        price,
        type,
        filePath: preparedUploads.pdf.path,
        imagePath: preparedUploads.image.path,
      });

      if (!result.success) {
        await discardMagazineUploads(preparedUploads.pdf.path, preparedUploads.image.path);
        throw new Error(result.error || "Failed to save magazine");
      }

      toast.success("Magazine uploaded successfully!");
      setOpen(false);
      form.reset();
      resetUploadState();
      router.refresh();
    } catch (error: unknown) {
      if (uploads && (!pdfUploaded || !imageUploaded)) {
        await discardMagazineUploads(
          pdfUploaded ? uploads.pdf.path : undefined,
          imageUploaded ? uploads.image.path : undefined
        );
      }
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !loading && setOpen(nextOpen)}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Magazine
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Add New Magazine</DialogTitle>
          <DialogDescription>
            Upload a new magazine PDF and its cover image.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="e.g. Easter Edition 2024" required disabled={loading} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Brief overview of the content..." disabled={loading} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (KES)</Label>
              <Input id="price" name="price" type="number" step="0.01" placeholder="500" required disabled={loading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Category</Label>
              <select 
                id="type" 
                name="type" 
                disabled={loading}
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
              <Input id="pdf" name="pdf" type="file" accept=".pdf,application/pdf" required disabled={loading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Cover Image</Label>
              <Input id="image" name="image" type="file" accept="image/*" required disabled={loading} />
            </div>
          </div>

          {loading && (
            <div className="space-y-3 rounded-md border bg-muted/30 p-3" aria-live="polite">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="font-medium">{status}</span>
                <span className="tabular-nums text-muted-foreground">{progress.total}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${progress.total}%` }}
                />
              </div>
              <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
                <div className="space-y-1">
                  <div className="flex justify-between gap-3">
                    <span>PDF</span>
                    <span className="tabular-nums">{progress.pdf}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all"
                      style={{ width: `${progress.pdf}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between gap-3">
                    <span>Cover</span>
                    <span className="tabular-nums">{progress.image}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all"
                      style={{ width: `${progress.image}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading {progress.total}%
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
