import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function getMpesaToken() {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  
  if (!consumerKey || !consumerSecret) {
    throw new Error("Missing M-Pesa Consumer Key or Secret in environment variables");
  }
  
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  
  const response = await fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );
  
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Daraja API Auth Error: ${response.status} - ${errText}`);
  }
  
  const data = await response.json();
  return data.access_token;
}

export function getMpesaPassword() {
  const shortCode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, -3);
    
  const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString("base64");
  
  return { password, timestamp };
}

export async function initiateStkPush(params: {
  amount: number;
  phone: string;
  reference: string;
  description: string;
}) {
  const token = await getMpesaToken();
  const { password, timestamp } = getMpesaPassword();
  const shortCode = process.env.MPESA_SHORTCODE;
  const callbackUrl = process.env.MPESA_CALLBACK_URL;
  
  // Format phone to 254...
  let formattedPhone = params.phone.replace(/[^0-9]/g, "");
  if (formattedPhone.startsWith("0")) {
    formattedPhone = "254" + formattedPhone.slice(1);
  } else if (formattedPhone.startsWith("+")) {
    formattedPhone = formattedPhone.slice(1);
  }
  
  const body = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.round(params.amount),
    PartyA: formattedPhone,
    PartyB: shortCode,
    PhoneNumber: formattedPhone,
    CallBackURL: callbackUrl,
    AccountReference: params.reference,
    TransactionDesc: params.description,
  };
  
  const response = await fetch(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  
  return await response.json();
}
