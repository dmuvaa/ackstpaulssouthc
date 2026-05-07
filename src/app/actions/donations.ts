"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { initiateStkPush } from "@/lib/mpesa";

export async function logDonation(formData: {
  amount: number;
  cause: string;
  name?: string;
  phone_number?: string;
}) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1. Log the donation record
    const { data: donation, error } = await supabase
      .from("donations")
      .insert([
        {
          ...formData,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // 2. Initiate M-Pesa STK Push if phone number is provided
    if (formData.phone_number) {
      const mpesaResponse = await initiateStkPush({
        amount: formData.amount,
        phone: formData.phone_number,
        reference: `DON-${donation.id.slice(0, 8)}`,
        description: `Donation for ${formData.cause}`,
      });

      // 3. Log the payment initiation
      if (mpesaResponse.ResponseCode === "0") {
        await supabase.from("payments").insert({
          type: "donation",
          amount: formData.amount,
          phone: formData.phone_number,
          status: "pending",
          checkout_request_id: mpesaResponse.CheckoutRequestID,
          metadata: { donation_id: donation.id },
        });
        
        revalidatePath("/admin/donations");
        return { 
          success: true, 
          stkSent: true, 
          checkoutID: mpesaResponse.CheckoutRequestID 
        };
      }
    }

    revalidatePath("/admin/donations");
    return { success: true, stkSent: false };
  } catch (error: any) {
    console.error("Donation logging error:", error);
    return { success: false, error: error.message };
  }
}
