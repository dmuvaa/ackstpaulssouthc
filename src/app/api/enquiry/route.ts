import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Resend } from "resend";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, phone, message } = await req.json();
    
    // 1. Store in Supabase
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    const { error: dbError } = await supabase.from("enquiries").insert({
      name,
      email,
      phone,
      message,
    });
    
    if (dbError) throw dbError;
    
    // 2. Send Notification Email to Admin
    await resend.emails.send({
      from: "Website Inquiry <notifications@ackstpaulssouthc.co.ke>",
      to: "info@ackstpaulssouthc.co.ke",
      subject: `New Inquiry from ${name}`,
      html: `
        <h2>New Website Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-line;">${message}</p>
        <hr/>
        <p>This message was sent from the church website contact form.</p>
      `,
    });
    
    return NextResponse.json({ success: true });
    
  } catch (error: any) {
    console.error("Enquiry Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
