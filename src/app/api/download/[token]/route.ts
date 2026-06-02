import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const url = new URL(`/read/${token}`, req.url);

  return NextResponse.redirect(url);
}
