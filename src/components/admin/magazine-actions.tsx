"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2, Edit, Loader2, FileText, ImageIcon } from "lucide-react";
import { deleteMagazine, discardMagazineUploads, updateMagazine } from "@/app/actions/magazines";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

interface MagazineActionsProps {
  id: string;
  filePath: string;
  imagePath: string;
  title: string;
  description: string;
  price: number;
  type: string;
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Failed to update magazine";
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

export function MagazineActions({
  id,
  filePath,
  imagePath,
  title,
  description,
  price,
  type,
}: MagazineActionsProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description || "");
  const [editPrice, setEditPrice] = useState(String(price));
  const [editType, setEditType] = useState(type || "Digital");
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

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const formData = new FormData(e.currentTarget);
    const pdfFile = formData.get("pdf");
    const imageFile = formData.get("image");
    const selectedPdfFile = pdfFile instanceof File && pdfFile.size > 0 ? pdfFile : null;
    const selectedImageFile = imageFile instanceof File && imageFile.size > 0 ? imageFile : null;

    setLoading(true);
    resetUploadState();

    let pdfUploaded = false;
    let imageUploaded = false;
    let uploads: { pdf?: SignedUpload; image?: SignedUpload } | null = null;

    const updateProgress = (key: "pdf" | "image", value: number) => {
      setProgress((current) => {
        const next = { ...current, [key]: value };
        const pdfWeight = selectedPdfFile?.size || 0;
        const imageWeight = selectedImageFile?.size || 0;
        const totalSize = pdfWeight + imageWeight || 1;
        const total = Math.round(
          ((next.pdf * pdfWeight) + (next.image * imageWeight)) / totalSize
        );

        return { ...next, total };
      });
    };

    try {
      if (selectedPdfFile || selectedImageFile) {
        setStatus("Preparing replacement upload...");
        const uploadResponse = await fetch("/api/admin/magazines/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pdf: selectedPdfFile
              ? {
                  name: selectedPdfFile.name,
                  size: selectedPdfFile.size,
                  type: selectedPdfFile.type,
                }
              : null,
            image: selectedImageFile
              ? {
                  name: selectedImageFile.name,
                  size: selectedImageFile.size,
                  type: selectedImageFile.type,
                }
              : null,
          }),
        });
        const uploadPayload = await uploadResponse.json();

        if (!uploadResponse.ok || !uploadPayload.success) {
          throw new Error(uploadPayload.error || "Failed to prepare replacement upload");
        }

        uploads = uploadPayload.uploads as { pdf?: SignedUpload; image?: SignedUpload };
        const totalUploadSize = (selectedPdfFile?.size || 0) + (selectedImageFile?.size || 0);
        setStatus(`Uploading replacement files (${formatFileSize(totalUploadSize)})...`);

        const uploadTasks: Promise<void>[] = [];
        if (selectedPdfFile && uploads.pdf) {
          uploadTasks.push(
            uploadToSignedUrl(selectedPdfFile, uploads.pdf, (value) => updateProgress("pdf", value)).then(() => {
              pdfUploaded = true;
            })
          );
        }
        if (selectedImageFile && uploads.image) {
          uploadTasks.push(
            uploadToSignedUrl(selectedImageFile, uploads.image, (value) => updateProgress("image", value)).then(() => {
              imageUploaded = true;
            })
          );
        }

        const uploadResults = await Promise.allSettled(uploadTasks);
        const failedUpload = uploadResults.find((result) => result.status === "rejected");

        if (failedUpload?.status === "rejected") {
          await discardMagazineUploads(
            pdfUploaded ? uploads.pdf?.path : undefined,
            imageUploaded ? uploads.image?.path : undefined
          );
          throw failedUpload.reason;
        }
      }

      setStatus("Saving magazine changes...");
      const result = await updateMagazine(id, {
        title: editTitle,
        description: editDescription,
        price: parseFloat(editPrice),
        type: editType,
        filePath: uploads?.pdf?.path,
        imagePath: uploads?.image?.path,
        previousFilePath: filePath,
        previousImagePath: imagePath,
      });

      if (!result.success) {
        await discardMagazineUploads(uploads?.pdf?.path, uploads?.image?.path);
        throw new Error(result.error || "Failed to update magazine");
      }

      toast.success("Magazine updated successfully");
      setShowEditDialog(false);
      resetUploadState();
    } catch (error: unknown) {
      if (uploads && (!pdfUploaded || !imageUploaded)) {
        await discardMagazineUploads(
          pdfUploaded ? uploads.pdf?.path : undefined,
          imageUploaded ? uploads.image?.path : undefined
        );
      }
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setLoading(true);
    const result = await deleteMagazine(id, filePath, imagePath);
    setLoading(false);
    
    if (result.success) {
      toast.success("Magazine deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete magazine");
    }
    setShowDeleteDialog(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-destructive focus:text-destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete magazine
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showEditDialog} onOpenChange={(open) => !loading && setShowEditDialog(open)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[760px]">
          <DialogHeader>
            <DialogTitle>Edit Magazine</DialogTitle>
            <DialogDescription>
              Update the magazine listing details.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-5 pt-4">
            <div className="space-y-2">
              <Label htmlFor={`title-${id}`}>Title</Label>
              <Input
                id={`title-${id}`}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`description-${id}`}>Description</Label>
              <Textarea
                id={`description-${id}`}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                disabled={loading}
                className="min-h-[220px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`price-${id}`}>Price (KES)</Label>
                <Input
                  id={`price-${id}`}
                  type="number"
                  step="0.01"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`type-${id}`}>Category</Label>
                <select
                  id={`type-${id}`}
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                  disabled={loading}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Digital">Digital</option>
                  <option value="Physical">Physical</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 rounded-md border p-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <Label htmlFor={`pdf-${id}`}>Replace Magazine PDF</Label>
                </div>
                <Input
                  id={`pdf-${id}`}
                  name="pdf"
                  type="file"
                  accept=".pdf,application/pdf"
                  disabled={loading}
                />
                <p className="break-all text-xs text-muted-foreground">
                  Current: {filePath || "No PDF uploaded"}
                </p>
              </div>
              <div className="space-y-2 rounded-md border p-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-green-600" />
                  <Label htmlFor={`image-${id}`}>Replace Cover Image</Label>
                </div>
                <Input
                  id={`image-${id}`}
                  name="image"
                  type="file"
                  accept="image/*"
                  disabled={loading}
                />
                <p className="break-all text-xs text-muted-foreground">
                  Current: {imagePath || "No cover uploaded"}
                </p>
              </div>
            </div>
            {loading && (
              <div className="space-y-3 rounded-md border bg-muted/30 p-3" aria-live="polite">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium">{status || "Saving magazine changes..."}</span>
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
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the magazine
              and remove the associated files from storage.
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
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
