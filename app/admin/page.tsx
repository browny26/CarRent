"use client";

import { useState, useEffect } from "react";
import { Car, User } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import deleteCar, { addCar, editCar, getCars, getUser } from "@/lib/supabase";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

import { hatch } from "ldrs";

hatch.register();

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [account, setAccount] = useState<User>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const [editingCar, setEditingCar] = useState<Partial<Car> | null>(null);

  const fetchCars = async () => {
    const response = await fetch("/api/cars", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (Array.isArray(data.data)) {
      setCars(data.data);
    } else {
      console.error("Expected an array but got:", data);
      setCars([]); // Assicura che cars sia sempre un array
    }
  };

  async function currentUser() {
    const res = await getUser(String(user?.email));
    setAccount(res.data);

    if (res.data.role !== "admin") {
      router.push("/"); // Reindirizza se non è un admin
    } else {
      setIsLoading(false);
    }
  }

  function handleEvent(e: React.FormEvent) {
    editingCar?.id ? handleEditCar(e) : handleAddCar(e);
  }

  async function handleAddCar(e: React.FormEvent) {
    e.preventDefault();
    const data = await addCar(
      String(editingCar?.make),
      String(editingCar?.model),
      String(editingCar?.year),
      String(editingCar?.price),
      String(editingCar?.image)
    );

    if (data.error) {
      toast.error("Failed to add car");
    } else {
      toast.success("Car added successfully");
      fetchCars();
    }

    setIsOpen(false);

    /* const car = {
      make: String(editingCar?.make),
      model: String(editingCar?.model),
      year: String(editingCar?.year),
      price: String(editingCar?.price),
      img: String(editingCar?.image),
    };
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Car added successfully!");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to add car.");
    }

    setIsLoading(false); */
  }

  async function handleEditCar(e: React.FormEvent) {
    e.preventDefault();
    /* e.preventDefault();

    if (!editingCar?.id) {
      toast.error("Invalid car data.");
      return;
    }

    try {
      const response = await fetch("/api/cars", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCar), // Usa editingCar
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Car updated successfully!");
        fetchCars();
      } else {
        toast.error(result.error || "Failed to update car.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the car.");
    } */

    const data = await editCar(
      String(editingCar?.id),
      String(editingCar?.make),
      String(editingCar?.model),
      String(editingCar?.year),
      String(editingCar?.price),
      String(editingCar?.image)
    );

    if (data.error) {
      toast.error("Failed to edit car");
    } else {
      toast.success("Car edited successfully");
      fetchCars();
    }

    setIsOpen(false);
  }

  const handleDeleteCar = async (id: number) => {
    if (confirm("Are you sure you want to delete this car?")) {
      const data = await deleteCar(String(id));

      if (data.error) {
        toast.error("Failed to delete car");
      } else {
        toast.success("Car deleted successfully");
        fetchCars();
      }
    }

    setIsOpen(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if (user) {
      console.log("User email:", user.email);
      currentUser();
    }
  }, [user]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const method = editingCar?.id ? "PUT" : "POST";
  //     const response = await fetch("/api/cars", {
  //       method,
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(editingCar),
  //     });

  //     if (response.ok) {
  //       toast.success(
  //         editingCar?.id ? "Car updated successfully" : "Car added successfully"
  //       );
  //       setIsOpen(false);
  //       setEditingCar(null);
  //       fetchCars();
  //     }
  //   } catch (error) {
  //     toast.error("Failed to save car");
  //   }
  // };

  // const handleDelete = async (id: number) => {
  //   if (confirm("Are you sure you want to delete this car?")) {
  //     try {
  //       const response = await fetch(`/api/cars?id=${id}`, {
  //         method: "DELETE",
  //       });

  //       if (response.ok) {
  //         toast.success("Car deleted successfully");
  //         fetchCars();
  //       }
  //     } catch (error) {
  //       toast.error("Failed to delete car");
  //     }
  //   }
  // };

  // Se l'account non è caricato o se l'utente non è admin, non renderizza nulla (o mostra un loading)
  if (isloading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <l-hatch size="28" stroke="4" speed="3.5" color="black"></l-hatch>
      </div>
    );
  }

  return (
    <div className="container mx-auto h-screen px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Car Rental Admin Dashboard</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingCar({})}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Car
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCar?.id ? "Edit Car" : "Add New Car"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEvent} className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  value={editingCar?.make || ""}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, make: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={editingCar?.model || ""}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, model: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={editingCar?.year || ""}
                  onChange={(e) =>
                    setEditingCar({
                      ...editingCar,
                      year: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="price">Price per Day</Label>
                <Input
                  id="price"
                  type="number"
                  value={editingCar?.price || ""}
                  onChange={(e) =>
                    setEditingCar({
                      ...editingCar,
                      price: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={editingCar?.image || ""}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, image: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingCar?.id ? "Update Car" : "Add Car"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Make</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Price/Day</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.make}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>${car.price}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setEditingCar(car);
                        setIsOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteCar(car.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
