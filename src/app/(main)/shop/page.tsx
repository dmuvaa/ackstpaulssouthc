import { getMagazines } from "@/app/actions/magazines";
import { getMerchandise } from "@/app/actions/merchandise";
import { ShopClient } from "./shop-client";
import { Product, Merchandise } from "@/types";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export default async function ShopPage() {
  const [magazinesData, merchandiseData] = await Promise.all([
    getMagazines(),
    getMerchandise()
  ]);
  
  const magazines = magazinesData as Product[];
  const merchandise = merchandiseData as Merchandise[];
  
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

  // Combine image paths from both sources
  const magazineImagePaths = magazines.map(m => m.image_path).filter(Boolean) as string[];
  const merchImagePaths = merchandise.map(m => m.image_path).filter(Boolean) as string[];
  const allImagePaths = [...magazineImagePaths, ...merchImagePaths];
  
  const urlMap: Record<string, string> = {};
  
  if (allImagePaths.length > 0) {
    const { data: signedUrls, error } = await adminClient.storage
      .from("magazines")
      .createSignedUrls(allImagePaths, 3600);
      
    if (!error && signedUrls) {
      signedUrls.forEach(item => {
        if (!item.error && item.path && item.signedUrl) {
          urlMap[item.path] = item.signedUrl;
        }
      });
    }
  }

  return <ShopClient magazines={magazines} merchandise={merchandise} imageUrls={urlMap} />;
}
