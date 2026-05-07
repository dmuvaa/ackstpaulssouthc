export type UserRole = "admin" | "user";

export interface Donation {
  id: string;
  name?: string;
  amount: number;
  cause: string;
  phone_number?: string;
  status: "pending" | "confirmed";
  created_at: string;
}

export interface DonationCause {
  id: string;
  title: string;
  description?: string;
  target_amount: number;
  current_amount: number;
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  file_path?: string;
  image_path?: string;
  type: "Physical" | "Digital" | "Both";
  created_at: string;
}

export interface Order {
  id: string;
  product_id: string;
  buyer_name: string;
  phone_number: string;
  amount: number;
  status: "pending" | "paid" | "delivered";
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  image_url: string;
  created_at: string;
}
