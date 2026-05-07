import { NextResponse } from "next/server";
import { getMpesaToken, getMpesaPassword } from "@/lib/mpesa";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { phone, amount, type, product_id, metadata } = await req.json();
    
    // 1. Format phone (2547XXXXXXXX)
    let formattedPhone = phone.replace(/[^0-9]/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "254" + formattedPhone.slice(1);
    } else if (formattedPhone.startsWith("+")) {
      formattedPhone = formattedPhone.slice(1);
    }
    
    // 2. Get M-Pesa Auth
    const token = await getMpesaToken();
    const { password, timestamp } = getMpesaPassword();
    
    // 3. Initiate STK Push
    const stkResponse = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: process.env.MPESA_SHORTCODE,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: Math.round(amount),
          PartyA: formattedPhone,
          PartyB: process.env.MPESA_SHORTCODE,
          PhoneNumber: formattedPhone,
          CallBackURL: process.env.MPESA_CALLBACK_URL,
          AccountReference: "ACK St Pauls",
          TransactionDesc: type === "donation" ? "Church Donation" : "Magazine Purchase",
        }),
      }
    );
    if (!stkResponse.ok) {
      const errText = await stkResponse.text();
      throw new Error(`Daraja API STK Error: ${stkResponse.status} - ${errText}`);
    }
    
    const stkData = await stkResponse.json();
    
    if (stkData.ResponseCode === "0") {
      // 4. Store pending payment in Supabase
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);
      
      const { error } = await supabase.from("payments").insert({
        type,
        amount,
        phone: formattedPhone,
        status: "pending",
        checkout_request_id: stkData.CheckoutRequestID,
        product_id: product_id || null,
        metadata: metadata || {},
      });
      
      if (error) throw error;
      
      return NextResponse.json({ success: true, checkout_request_id: stkData.CheckoutRequestID });
    } else {
      return NextResponse.json({ success: false, error: stkData.CustomerMessage || "STK Push failed" }, { status: 400 });
    }
    
  } catch (error: any) {
    console.error("M-Pesa STK Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
