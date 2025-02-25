"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Car, User } from "../types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAuth } from "@/contexts/authContext";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getCars } from "@/lib/supabase";
import { CarCard } from "@/components/ui/car-card";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import ModalEdit from "./components/modal-edit";

export default function AccountPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  //const [user, setUser] = useState<User | null>(null);
  //const [isLoading, setIsLoading] = useState(true);

  // Se l'utente non è autenticato, redirigi alla pagina di login
  if (loading) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center px-4 py-8">
        Loading...
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null; // Renderizza null mentre la redirezione avviene
  }

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch('/api/auth/me');
  //       if (!response.ok) {
  //         throw new Error('Not authenticated');
  //       }
  //       const data = await response.json();
  //       setUser(data.user);
  //     } catch (error) {
  //       router.push('/login');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, [router]);

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

  async function fetchCars() {
    const data = await getCars();
    setCars(data);
  }

  useEffect(() => {
    fetchCars();
  }, []);

  // if (isLoading) {
  //   return <div className="container mx-auto px-4 py-8">Loading...</div>;
  // }

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.photoURL || "/default-avatar.png"} />
                  <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.displayName || "User"}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
              <div className="flex gap-5">
                {/* <Button variant="outline">Edit</Button> */}
                <ModalEdit />
                <Button
                  variant="destructive"
                  className="bg-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Account Details</h3>
                <p className="text-sm text-muted-foreground">
                  Member since{" "}
                  {new Date(
                    user?.metadata.creationTime || ""
                  ).toLocaleDateString()}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-medium mb-4">Recent Rentals</h3>

                {user &&
                cars?.some((car) => car.costumer_email === user.email) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars
                      .filter((car) => car.costumer_email === user.email)
                      .map((car) => (
                        <CarCard key={car.id} car={car} onRent={fetchCars} />
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No recent rentals found.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
