"use server";

import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

function getAdminClient() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );
}

type CreateMagazineRecordInput = {
  title: string;
  description: string;
  price: number;
  type: string;
  filePath: string;
  imagePath: string;
};

type UpdateMagazineInput = {
  title: string;
  description: string;
  price: number;
  type: string;
  filePath?: string;
  imagePath?: string;
  previousFilePath?: string;
  previousImagePath?: string;
};

async function removeMagazineFiles(filePath?: string, imagePath?: string) {
  const paths = [filePath, imagePath].filter(Boolean) as string[];
  if (paths.length === 0) return;

  const adminClient = getAdminClient();
  await adminClient.storage.from("magazines").remove(paths);
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "An unexpected error occurred";
}

export async function getMagazines() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
    
  if (error) {
    console.error("Error fetching magazines:", error);
    return [];
  }
  return data;
}

export async function getMagazineById(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
    
  if (error) {
    console.error("Error fetching magazine by id:", error);
    return null;
  }
  return data;
}

export async function createMagazineRecord(input: CreateMagazineRecordInput) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const adminClient = getAdminClient();

  try {
    if (!input.title.trim()) {
      throw new Error("Title is required");
    }
    if (!Number.isFinite(input.price)) {
      throw new Error("A valid price is required");
    }
    if (!input.filePath || !input.imagePath) {
      throw new Error("Magazine PDF and cover image uploads are required");
    }

    const { error: dbError } = await adminClient.from("products").insert({
      title: input.title.trim(),
      description: input.description.trim(),
      price: input.price,
      type: input.type || "Digital",
      file_path: input.filePath,
      image_path: input.imagePath,
    });

    if (dbError) throw dbError;

    revalidatePath("/admin/magazines");
    return { success: true };
  } catch (error: unknown) {
    await removeMagazineFiles(input.filePath, input.imagePath);
    console.error("Error creating magazine record:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function discardMagazineUploads(filePath?: string, imagePath?: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  try {
    await removeMagazineFiles(filePath, imagePath);
    return { success: true };
  } catch (error: unknown) {
    console.error("Error discarding magazine uploads:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function updateMagazine(id: string, input: UpdateMagazineInput) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const adminClient = getAdminClient();

  try {
    if (!input.title.trim()) {
      throw new Error("Title is required");
    }
    if (!Number.isFinite(input.price)) {
      throw new Error("A valid price is required");
    }

    const updatePayload: {
      title: string;
      description: string;
      price: number;
      type: string;
      file_path?: string;
      image_path?: string;
    } = {
      title: input.title.trim(),
      description: input.description.trim(),
      price: input.price,
      type: input.type || "Digital",
    };

    if (input.filePath) {
      updatePayload.file_path = input.filePath;
    }
    if (input.imagePath) {
      updatePayload.image_path = input.imagePath;
    }

    const { error } = await adminClient
      .from("products")
      .update(updatePayload)
      .eq("id", id);

    if (error) throw error;

    await removeMagazineFiles(
      input.filePath ? input.previousFilePath : undefined,
      input.imagePath ? input.previousImagePath : undefined
    );

    revalidatePath("/admin/magazines");
    revalidatePath("/shop");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error updating magazine:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function createMagazine(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };
  
  const adminClient = getAdminClient();
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const type = formData.get("type") as string || "Digital";
  
  const pdfFile = formData.get("pdf") as File;
  const imageFile = formData.get("image") as File;
  
  try {
    let filePath = "";
    let imagePath = "";
    
    // 1. Upload PDF
    if (pdfFile && pdfFile.size > 0) {
      const pdfExt = pdfFile.name.split(".").pop();
      const pdfName = `${Date.now()}-magazine.${pdfExt}`;
      const { data: pdfData, error: pdfError } = await adminClient.storage
        .from("magazines")
        .upload(`pdfs/${pdfName}`, pdfFile);
        
      if (pdfError) throw pdfError;
      filePath = pdfData.path;
    }
    
    // 2. Upload Image
    if (imageFile && imageFile.size > 0) {
      const imgExt = imageFile.name.split(".").pop();
      const imgName = `${Date.now()}-cover.${imgExt}`;
      const { data: imgData, error: imgError } = await adminClient.storage
        .from("magazines")
        .upload(`covers/${imgName}`, imageFile);
        
      if (imgError) throw imgError;
      imagePath = imgData.path;
    }
    
    // 3. Insert into DB
    const { error: dbError } = await adminClient.from("products").insert({
      title,
      description,
      price,
      type,
      file_path: filePath,
      image_path: imagePath,
    });
    
    if (dbError) throw dbError;
    
    revalidatePath("/admin/magazines");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error creating magazine:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function deleteMagazine(id: string, filePath: string, imagePath: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };
  
  const adminClient = getAdminClient();
  
  try {
    // 1. Delete files from storage
    if (filePath) {
      await adminClient.storage.from("magazines").remove([filePath]);
    }
    if (imagePath) {
      await adminClient.storage.from("magazines").remove([imagePath]);
    }
    
    // 2. Delete from DB
    const { error } = await adminClient.from("products").delete().eq("id", id);
    if (error) throw error;
    
    revalidatePath("/admin/magazines");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting magazine:", error);
    return { success: false, error: getErrorMessage(error) };
  }
}
