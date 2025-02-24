"use client";

import { useState, useEffect } from "react";
import { Car } from "../types";
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
import deleteCar, { addCar, editCar, getCars } from "@/lib/supabase";

export default function AdminDashboard() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Partial<Car> | null>(null);

  // const fetchCars = async () => {
  //   const response = await fetch("/api/cars");
  //   const data = await response.json();
  //   setCars(data);
  // };

  async function fetchCars() {
    const data = await getCars();
    setCars(data);
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
  }

  async function handleEditCar(e: React.FormEvent) {
    e.preventDefault();
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
