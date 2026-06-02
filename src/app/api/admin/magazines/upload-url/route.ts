import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type UploadFileRequest = {
  name: string;
  size: number;
  type: string;
};

type UploadUrlRequest = {
  pdf: UploadFileRequest;
  image: UploadFileRequest;
};

const MAX_PDF_SIZE = 100 * 1024 * 1024;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

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

function cleanExtension(fileName: string, fallback: string) {
  const extension = fileName.split(".").pop()?.toLowerCase() || fallback;
  return extension.replace(/[^a-z0-9]/g, "") || fallback;
}

function cleanBaseName(fileName: string, fallback: string) {
  const nameWithoutExtension = fileName.replace(/\.[^.]+$/, "");
  const cleaned = nameWithoutExtension
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

  return cleaned || fallback;
}

function validateFile(file: UploadFileRequest, options: {
  label: string;
  maxSize: number;
  isAllowedType: (file: UploadFileRequest) => boolean;
}) {
  if (!file?.name || !Number.isFinite(file.size) || file.size <= 0) {
    throw new Error(`${options.label} is required`);
  }

  if (file.size > options.maxSize) {
    throw new Error(`${options.label} is too large`);
  }

  if (!options.isAllowedType(file)) {
    throw new Error(`${options.label} has an unsupported file type`);
  }
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Failed to prepare upload";
}

async function createSignedUpload(path: string) {
  const adminClient = getAdminClient();
  const { data, error } = await adminClient.storage
    .from("magazines")
    .createSignedUploadUrl(path);

  if (error) throw error;
  return data;
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { pdf, image } = await req.json() as UploadUrlRequest;

    validateFile(pdf, {
      label: "Magazine PDF",
      maxSize: MAX_PDF_SIZE,
      isAllowedType: (file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"),
    });
    validateFile(image, {
      label: "Cover image",
      maxSize: MAX_IMAGE_SIZE,
      isAllowedType: (file) => file.type.startsWith("image/"),
    });

    const uploadId = `${Date.now()}-${randomUUID()}`;
    const pdfPath = `pdfs/${uploadId}-${cleanBaseName(pdf.name, "magazine")}.${cleanExtension(pdf.name, "pdf")}`;
    const imagePath = `covers/${uploadId}-${cleanBaseName(image.name, "cover")}.${cleanExtension(image.name, "jpg")}`;
    const [pdfUpload, imageUpload] = await Promise.all([
      createSignedUpload(pdfPath),
      createSignedUpload(imagePath),
    ]);

    return NextResponse.json({
      success: true,
      uploads: {
        pdf: pdfUpload,
        image: imageUpload,
      },
    });
  } catch (error: unknown) {
    console.error("Magazine upload URL error:", error);
    return NextResponse.json(
      { success: false, error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
