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
  } catch (error: any) {
    console.error("Error creating magazine:", error);
    return { success: false, error: error.message };
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
  } catch (error: any) {
    console.error("Error deleting magazine:", error);
    return { success: false, error: error.message };
  }
}
