"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function placeOrder(formData: {
  product_id: string;
  buyer_name: string;
  phone_number: string;
  amount: number;
}) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          ...formData,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    revalidatePath("/admin/orders");
    return { success: true, data };
  } catch (error) {
    console.error("Order error:", error);
    return { success: false, error };
  }
}
