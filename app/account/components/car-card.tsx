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
  const handleRent = async () => {
    const data = await editCar(
      String(car.id),
      car.make,
      car.model,
      String(car.year),
      String(car.price),
      car.img,
      !car.available,
      String("")
    );

    if (data.error) {
      toast.error("Failed to cancel rent");
    } else {
      toast.success("Rent canceled successfully");
      onRent?.();
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={car.img}
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
      <CardFooter>
        <Button className="w-full" onClick={handleRent}>
          {"Cancel Rent"}
        </Button>
      </CardFooter>
    </Card>
  );
}
