"use client";
import Link from "next/link";
import { Car } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import { Button } from "./button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // const response = await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Logged out successfully");
      const checkUser = setInterval(() => {
        if (!auth.currentUser) {
          clearInterval(checkUser);
          router.push("/login");
        }
      }, 300);
    } catch (error) {
      toast.error("Failed to logout");
    }
  };
  return (
    <nav className="bg-white text-neutral-950">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <Car className="h-6 w-6" />
            <span>LuxDrive</span>
          </Link>
          <div className="flex items-center space-x-10">
            <Link href="/search" className="hover:text-neutral-950/80">
              Search
            </Link>
            <Link href="/account" className="hover:text-neutral-950/80">
              Account
            </Link>
            <Link href="/admin" className="hover:text-neutral-950/80">
              Admin
            </Link>
            {!user && !loading && (
              <Link href="/register" className="hover:text-neutral-950/80">
                Sign Up
              </Link>
            )}
            {user && !loading && (
              <Button
                variant={"default"}
                onClick={() => handleLogout()}
                className="text-black bg-inherit"
              >
                <i className="bi bi-box-arrow-right h-4 w-4 text-black"></i>{" "}
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
