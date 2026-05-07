import { notFound } from "next/navigation";
import { getMagazineById } from "@/app/actions/magazines";
import { ProductClient } from "./product-client";
import { Product } from "@/types";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const magazineData = await getMagazineById(id);
  if (!magazineData) {
    notFound();
  }

  const magazine: Product = magazineData as Product;
  let imageUrl = "";

  if (magazine.image_path) {
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

    const { data } = await adminClient.storage
      .from("magazines")
      .createSignedUrl(magazine.image_path, 3600); // 1 hour expiry
      
    if (data?.signedUrl) {
      imageUrl = data.signedUrl;
    }
  }

  return <ProductClient magazine={magazine} imageUrl={imageUrl} />;
}
