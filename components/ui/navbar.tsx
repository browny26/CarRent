"use client";
import Link from "next/link";
import { Car } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import { Button } from "./button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react"; // Stato per gestire la visibilità del drawer

export default function Navbar() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Stato per aprire/chiudere il drawer

  const handleLogout = async () => {
    try {
      await signOut(auth);
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
    <nav className="bg-[#fafafa] border-b border-neutral-50 text-neutral-950 sticky top-0 z-10">
      <div className="container mx-auto px-10 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <Car className="h-6 w-6" />
            <span>LuxDrive</span>
          </Link>

          {/* Hamburger Menu Button (Visible on mobile only) */}
          <button
            className="lg:hidden text-xl"
            onClick={() => setIsDrawerOpen(true)} // Apri il drawer
          >
            ☰
          </button>

          {/* Desktop Navbar (Visible on larger screens) */}
          <div className="hidden lg:flex items-center space-x-10">
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
                className="text-neutral-950 bg-inherit flex items-center gap-2 hover:text-neutral-950/80"
              >
                <i className="bi bi-box-arrow-right h-4 w-4 mb-1"></i>
                <span>Logout</span>
              </Button>
            )}
          </div>
        </div>

        {/* Drawer: Menu che appare da destra (Visibile su mobile) */}
        <div
          className={`fixed top-0 right-0 z-20 h-full w-64 bg-white shadow-lg transform transition-transform ease-in-out duration-300 ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between p-4">
            {/* Close Button */}
            <button onClick={() => setIsDrawerOpen(false)} className="text-xl">
              ✕
            </button>
          </div>
          <div className="flex flex-col items-start space-y-4 p-4">
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
                className="text-black bg-inherit flex items-center gap-2 hover:text-white"
              >
                <i className="bi bi-box-arrow-right h-4 w-4 mb-1"></i>
                <span>Logout</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
