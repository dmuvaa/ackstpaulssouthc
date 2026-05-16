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

export async function getMerchandise() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
    .from("merchandise")
    .select("*")
    .order("created_at", { ascending: false });
    
  if (error) {
    console.error("Error fetching merchandise:", error);
    return [];
  }
  return data;
}

export async function createMerchandise(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };
  
  const adminClient = getAdminClient();
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const imageFile = formData.get("image") as File;
  
  try {
    let imagePath = "";
    
    // Upload Image
    if (imageFile && imageFile.size > 0) {
      const imgExt = imageFile.name.split(".").pop();
      const imgName = `${Date.now()}-merch.${imgExt}`;
      const { data: imgData, error: imgError } = await adminClient.storage
        .from("magazines") // Reusing the same bucket for simplicity, or create a new one
        .upload(`merchandise/${imgName}`, imageFile);
        
      if (imgError) throw imgError;
      imagePath = imgData.path;
    }
    
    // Insert into DB
    const { error: dbError } = await adminClient.from("merchandise").insert({
      title,
      description,
      price,
      category,
      image_path: imagePath,
      in_stock: true
    });
    
    if (dbError) throw dbError;
    
    revalidatePath("/admin/merchandise");
    revalidatePath("/shop");
    return { success: true };
  } catch (error: any) {
    console.error("Error creating merchandise:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteMerchandise(id: string, imagePath: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };
  
  const adminClient = getAdminClient();
  
  try {
    // Delete file from storage
    if (imagePath) {
      await adminClient.storage.from("magazines").remove([imagePath]);
    }
    
    // Delete from DB
    const { error } = await adminClient.from("merchandise").delete().eq("id", id);
    if (error) throw error;
    
    revalidatePath("/admin/merchandise");
    revalidatePath("/shop");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting merchandise:", error);
    return { success: false, error: error.message };
  }
}

export async function updateMerchandise(id: string, formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };
  
  const adminClient = getAdminClient();
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const imageFile = formData.get("image") as File;
  const existingImagePath = formData.get("existingImagePath") as string;
  
  try {
    let imagePath = existingImagePath;
    
    // Upload New Image if provided
    if (imageFile && imageFile.size > 0) {
      // Delete old image if it exists
      if (existingImagePath) {
        await adminClient.storage.from("magazines").remove([existingImagePath]);
      }
      
      const imgExt = imageFile.name.split(".").pop();
      const imgName = `${Date.now()}-merch-update.${imgExt}`;
      const { data: imgData, error: imgError } = await adminClient.storage
        .from("magazines")
        .upload(`merchandise/${imgName}`, imageFile);
        
      if (imgError) throw imgError;
      imagePath = imgData.path;
    }
    
    // Update DB
    const { error: dbError } = await adminClient.from("merchandise").update({
      title,
      description,
      price,
      category,
      image_path: imagePath,
    }).eq("id", id);
    
    if (dbError) throw dbError;
    
    revalidatePath("/admin/merchandise");
    revalidatePath("/shop");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating merchandise:", error);
    return { success: false, error: error.message };
  }
}

export async function getMerchandiseById(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
    .from("merchandise")
    .select("*")
    .eq("id", id)
    .single();
    
  if (error) {
    console.error("Error fetching merchandise by id:", error);
    return null;
  }
  return data;
}
