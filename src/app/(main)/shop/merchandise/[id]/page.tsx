import { notFound } from "next/navigation";
import { getMerchandiseById } from "@/app/actions/merchandise";
import { MerchCheckoutHub } from "./merch-checkout-hub";
import { Merchandise } from "@/types";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export default async function MerchDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const merchData = await getMerchandiseById(id);
  if (!merchData) {
    notFound();
  }

  const merch: Merchandise = merchData as Merchandise;
  let imageUrl = "";

  if (merch.image_path) {
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
      .createSignedUrl(merch.image_path, 3600); // 1 hour expiry
      
    if (data?.signedUrl) {
      imageUrl = data.signedUrl;
    }
  }

  return <MerchCheckoutHub merch={merch} imageUrl={imageUrl} />;
}
