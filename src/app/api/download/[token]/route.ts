import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
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

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    
    // 1. Validate Token
    const { data: download, error: tokenError } = await supabase
      .from("downloads")
      .select("*, payments(*, products(*))")
      .eq("token", token)
      .single();
      
    if (tokenError || !download) {
      return new Response("Invalid download link", { status: 404 });
    }
    
    // 2. Check Expiry
    if (new Date(download.expires_at) < new Date()) {
      return new Response("This download link has expired (7 days limit)", { status: 410 });
    }
    
    const product = download.payments?.products;
    if (!product || !product.file_path) {
      return new Response("File not found", { status: 404 });
    }
    
    // 3. Generate Signed URL (valid for 1 hour)
    const { data: signedUrlData, error: signedError } = await supabase.storage
      .from("magazines")
      .createSignedUrl(product.file_path, 3600);
      
    if (signedError) throw signedError;
    
    // 4. Increment Download Count
    await supabase
      .from("downloads")
      .update({ download_count: download.download_count + 1 })
      .eq("token", token);
      
    // 5. Redirect to File
    return NextResponse.redirect(signedUrlData.signedUrl);
    
  } catch (error: any) {
    console.error("Download Error:", error);
    return new Response("An error occurred during download", { status: 500 });
  }
}
