import { createClient } from "@supabase/supabase-js";

export type MagazineAccessResult =
  | {
      success: true;
      isExpired: boolean;
      download: {
        id: string;
        token: string;
        payment_id: string;
        expires_at: string;
        download_count: number;
      };
      payment: {
        id: string;
        product_id: string;
      };
      product: {
        id: string;
        title: string;
        file_path: string;
      };
    }
  | {
      success: false;
      status: number;
      message: string;
    };

type MagazineAccessOptions = {
  allowExpired?: boolean;
};

function getAdminClient() {
  return createClient(
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

export function getMagazineAdminClient() {
  return getAdminClient();
}

export async function getMagazineAccess(
  token: string,
  options: MagazineAccessOptions = {}
): Promise<MagazineAccessResult> {
  const supabase = getAdminClient();
  const { data: download, error: tokenError } = await supabase
    .from("downloads")
    .select("id,token,payment_id,expires_at,download_count")
    .eq("token", token)
    .single<{
      id: string;
      token: string;
      payment_id: string;
      expires_at: string;
      download_count: number;
    }>();

  if (tokenError || !download) {
    return { success: false, status: 404, message: "Invalid magazine link" };
  }

  const isExpired = new Date(download.expires_at) < new Date();

  if (isExpired && !options.allowExpired) {
    return { success: false, status: 410, message: "This magazine link has expired" };
  }

  const { data: payment, error: paymentError } = await supabase
    .from("payments")
    .select("id,product_id")
    .eq("id", download.payment_id)
    .single<{ id: string; product_id: string | null }>();

  if (paymentError || !payment?.product_id) {
    return { success: false, status: 404, message: "Payment not found" };
  }

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id,title,file_path")
    .eq("id", payment.product_id)
    .single<{ id: string; title: string; file_path: string | null }>();

  if (productError || !product?.file_path) {
    return { success: false, status: 404, message: "Magazine file not found" };
  }

  return {
    success: true,
    isExpired,
    download,
    payment: {
      id: payment.id,
      product_id: payment.product_id,
    },
    product: {
      id: product.id,
      title: product.title,
      file_path: product.file_path,
    },
  };
}

export async function incrementMagazineReadCount(downloadId: string, currentCount: number) {
  const supabase = getAdminClient();
  await supabase
    .from("downloads")
    .update({ download_count: currentCount + 1 })
    .eq("id", downloadId);
}
