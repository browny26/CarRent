// app/api/auth/register/route.ts

import { NextApiRequest, NextApiResponse } from "next";
import {
  getAuth,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../../../../lib/firebase";
import { NextResponse } from "next/server";

interface RegisterRequestBody {
  email: string;
  password: string;
  name: string;
}

export async function POST(req: Request) {
  const { email, password, name } = await req.json(); // Ottieni il corpo della richiesta

  if (!email || !password || !name) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    console.log(auth);
    console.log(email);
    console.log(password);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user: FirebaseUser = userCredential.user;

    console.log(user);

    // if (user) {
    //   await (
    //     user as FirebaseUser & {
    //       updateProfile: (profile: { displayName: string }) => Promise<void>;
    //     }
    //   ).updateProfile({
    //     displayName: name,
    //   });
    // }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "An error occurred while creating the user" },
      { status: 500 }
    );
  }
}
