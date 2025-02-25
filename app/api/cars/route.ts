import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/* import { NextResponse } from 'next/server';

// Mock data - in a real app, this would come from a database
let cars = [
  {
    id: 1,
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 75,
    image: 'https://images.unsplash.com/photo-1576972405668-2d020a01cbfa?auto=format&fit=crop&q=80',
    available: true,
  },
  {
    id: 2,
    make: 'BMW',
    model: 'M4',
    year: 2023,
    price: 120,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80',
    available: true,
  },
  {
    id: 3,
    make: 'Mercedes',
    model: 'S-Class',
    year: 2023,
    price: 150,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80',
    available: true,
  },
];

export async function GET() {
  return NextResponse.json(cars);
}

export async function POST(request: Request) {
  const car = await request.json();
  car.id = cars.length + 1;
  cars.push(car);
  return NextResponse.json(car);
  }*/

// export const dynamic = "force-dynamic"; // Forza il comportamento dinamico

export async function GET() {
  try {
    const { data, error } = await supabase.from("cars").select("*");

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { make, model, year, price, img } = await req.json();

    if (!make || !model || !year || !price || !img) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("cars")
      .insert([{ make, model, year, price, img }])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updatedFields } = await request.json(); // Prende tutti i campi tranne l'id

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("cars")
      .update(updatedFields) // Aggiorna solo i campi ricevuti
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/*export async function PUT(request: Request) {
  const car = await request.json();
  cars = cars.map(c => c.id === car.id ? car : c);
  return NextResponse.json(car);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));
  cars = cars.filter(car => car.id !== id);
  return NextResponse.json({ success: true });
} */
