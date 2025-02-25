import React from "react";
import { Car } from "@/app/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/authContext";
import { editCar } from "@/lib/supabase";

interface CarCardProps {
  car: Car;
  onRent: () => void;
}

export function CarCard({ car, onRent }: CarCardProps) {
  const { user, loading } = useAuth();

  const handleRent = async () => {
    if (user) {
      const data = await editCar(
        String(car.id),
        car.make,
        car.model,
        String(car.year),
        String(car.price),
        car.image,
        !car.available,
        String(user?.email)
      );

      if (data.error) {
        toast.error("Failed to rent car");
      } else {
        toast.success("Car rented successfully");
        onRent?.();
      }
    } else {
      toast.info("Please log in to rent this car");
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>
          {car.make} {car.model}
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          {car.year} • ${car.price}/day
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            Status:{" "}
            <span className={car.available ? "text-green-600" : "text-red-600"}>
              {car.available ? "Available" : "Rented"}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleRent}
          disabled={!car.available}
        >
          {car.available ? "Rent Now" : "Not Available"}
        </Button>
      </CardFooter>
    </Card>
  );
}
