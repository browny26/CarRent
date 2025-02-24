// supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getCars() {
  const { data, error } = await supabase.from("cars").select("*");

  if (error) {
    console.error("Errore nel recupero delle auto:", error);
    return [];
  }

  return data;
}

export async function addCar(
  make: string,
  model: string,
  year: string,
  price: string,
  img: string
) {
  const { data, error } = await supabase
    .from("cars")
    .insert([{ make, model, year, price, img }]);

  return { data, error };
}

export async function editCar(
  id: string,
  make?: string,
  model?: string,
  year?: string,
  price?: string,
  img?: string,
  available?: boolean
) {
  const { data, error } = await supabase
    .from("cars")
    .update([{ make, model, year, price, img, available }])
    .eq("id", id);

  return { data, error };
}

export default async function deleteCar(id: string) {
  const { data, error } = await supabase.from("cars").delete().eq("id", id); // Assuming 'id' is the primary key

  return { data, error };
}
