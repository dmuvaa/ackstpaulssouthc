import {
  getMagazineAccess,
  getMagazineAdminClient,
  incrementMagazineReadCount,
} from "@/lib/magazine-access";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const access = await getMagazineAccess(token, { allowExpired: true });

    if (!access.success) {
      return new Response(access.message, { status: access.status });
    }

    const supabase = getMagazineAdminClient();
    const { data, error } = await supabase.storage
      .from("magazines")
      .download(access.product.file_path);

    if (error) throw error;

    await incrementMagazineReadCount(access.download.id, access.download.download_count);

    return new Response(data, {
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error: unknown) {
    console.error("Magazine reader PDF error:", error);
    return new Response("Unable to load magazine", { status: 500 });
  }
}
