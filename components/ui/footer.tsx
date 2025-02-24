import { Car } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between">
          <Link
            href="/"
            className="text-xl font-bold flex items-center gap-2 h-fit"
          >
            <Car className="h-6 w-6" />
            <span>LuxDrive</span>
          </Link>
          <div className="flex flex-col space-y-3">
            <Link
              href="/search"
              className="hover:text-primary-foreground/80 text-sm"
            >
              Search Cars
            </Link>
            <Link
              href="/account"
              className="hover:text-primary-foreground/80 text-sm"
            >
              Account
            </Link>
            <Link
              href="/admin"
              className="hover:text-primary-foreground/80 text-sm"
            >
              Admin
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-6 text-sm">
            <p>Privacy policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
