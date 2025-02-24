import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyA-lWxHPnbEfmaLXI3kgjH2pWzk2gbNaPA",
  authDomain: "carrent-12457.firebaseapp.com",
  projectId: "carrent-12457",
  storageBucket: "carrent-12457.firebasestorage.app",
  messagingSenderId: "561865996039",
  appId: "1:561865996039:web:c7f1e1d95f29237d4637a2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
