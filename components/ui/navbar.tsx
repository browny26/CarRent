import Link from "next/link";
import { Car } from "lucide-react";

export default function Navbar() {
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
          </div>
        </div>
      </div>
    </nav>
  );
}
