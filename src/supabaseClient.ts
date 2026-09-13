import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string;
  vehicle_count: number;
  display_order: number;
  created_at: string;
}

export interface Car {
  id: string;
  name: string;
  price: string;
  fuel_type: string;
  transmission: string;
  match_score: number;
  image_url: string;
  category_id: string | null;
  is_trending: boolean;
  created_at: string;
}

export type CarInput = Omit<Car, 'id' | 'created_at'>;
export type CategoryInput = Omit<Category, 'id' | 'created_at'>;
