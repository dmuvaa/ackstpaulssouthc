"use server";

import { createAdminClient } from "@/utils/supabase/admin";
import { revalidatePath } from "next/cache";

export async function createCause(data: {
  title: string;
  description?: string;
  target_amount: number;
}) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("donation_causes")
    .insert([{ ...data, current_amount: 0, is_active: true }]);

  if (error) throw error;
  revalidatePath("/admin/donations/causes");
  revalidatePath("/donate");
}

export async function toggleCauseStatus(id: string, currentStatus: boolean) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("donation_causes")
    .update({ is_active: !currentStatus })
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/admin/donations/causes");
  revalidatePath("/donate");
}

export async function deleteCause(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("donation_causes")
    .delete()
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/admin/donations/causes");
  revalidatePath("/donate");
}

export async function getActiveCauses() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("donation_causes")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) return [];
  return data;
}

export async function getAllCauses() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("donation_causes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data;
}
