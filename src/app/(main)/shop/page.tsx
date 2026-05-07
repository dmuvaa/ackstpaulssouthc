import { getMagazines } from "@/app/actions/magazines";
import { ShopClient } from "./shop-client";
import { Product } from "@/types";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export default async function ShopPage() {
  const magazinesData = await getMagazines();
  
  // Cast the data to ensure it matches the Product type exactly
  const magazines: Product[] = magazinesData as Product[];
  
  const adminClient = createAdminClient(
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

  const imagePaths = magazines.map(m => m.image_path).filter(Boolean) as string[];
  
  const urlMap: Record<string, string> = {};
  
  if (imagePaths.length > 0) {
    const { data: signedUrls, error } = await adminClient.storage
      .from("magazines")
      .createSignedUrls(imagePaths, 3600); // 1 hour expiry
      
    if (!error && signedUrls) {
      signedUrls.forEach(item => {
        if (!item.error && item.path && item.signedUrl) {
          urlMap[item.path] = item.signedUrl;
        }
      });
    }
  }

  return <ShopClient magazines={magazines} imageUrls={urlMap} />;
}
