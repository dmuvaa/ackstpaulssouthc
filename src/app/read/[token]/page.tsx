import { getMagazineAccess } from "@/lib/magazine-access";
import { MagazineReaderLoader } from "@/components/magazine-reader-loader";
import Link from "next/link";

export default async function MagazineReadPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const access = await getMagazineAccess(token);

  if (!access.success) {
    return (
      <main className="min-h-screen bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-xl rounded-lg border bg-background p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-primary">Magazine unavailable</h1>
          <p className="mt-3 text-muted-foreground">{access.message}</p>
          <Link href="/shop" className="mt-6 inline-flex text-sm font-medium text-primary underline">
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <MagazineReaderLoader
      title={access.product.title}
      pdfUrl={`/api/read/${token}/pdf`}
      downloadUrl={`/api/download/${token}`}
      expiresAt={access.download.expires_at}
    />
  );
}
