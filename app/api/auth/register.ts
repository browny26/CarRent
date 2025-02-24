// pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from "next";
import {
  getAuth,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../../../lib/firebase";

interface RegisterRequestBody {
  email: string;
  password: string;
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Controllo per il metodo POST
  if (req.method === "POST") {
    const { email, password, name }: RegisterRequestBody = req.body;

    // Verifica che tutti i campi siano presenti
    if (!email || !password || !name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      // Crea l'utente con Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Ottieni le informazioni dell'utente
      const user: FirebaseUser = userCredential.user;

      // Aggiungi il cast per evitare l'errore
      if (user) {
        await (
          user as FirebaseUser & {
            updateProfile: (profile: { displayName: string }) => Promise<void>;
          }
        ).updateProfile({
          displayName: name,
        });
      }

      // Risposta di successo
      res.status(201).json({ message: "User created successfully" });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        error: error.message || "An error occurred while creating the user",
      });
    }
  } else {
    // Metodo non consentito
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
