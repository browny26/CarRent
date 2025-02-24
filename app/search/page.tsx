"use client";

import { useEffect, useState } from "react";
import { Car } from "../types";
import { CarCard } from "@/components/ui/car-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getCars } from "@/lib/supabase";

export default function SearchPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    make: "All Makes",
    minPrice: 0,
    maxPrice: 500,
    year: "All Years",
  });

  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       const response = await fetch("/api/cars");
  //       const data = await response.json();
  //       setCars(data);
  //     } catch (error) {
  //       console.error("Error fetching cars:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCars();
  // }, []);

  useEffect(() => {
    async function fetchCars() {
      const data = await getCars();
      setCars(data);
    }
    setLoading(false);

    fetchCars();
  }, []);

  const uniqueMakes = Array.from(new Set(cars.map((car) => car.make)));
  const uniqueYears = Array.from(
    new Set(cars.map((car) => car.year.toString()))
  );

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.make.toLowerCase().includes(filters.search.toLowerCase()) ||
      car.model.toLowerCase().includes(filters.search.toLowerCase());

    const matchesMake =
      filters.make === "All Makes" || car.make === filters.make;
    const matchesYear =
      filters.year === "All Years" || car.year.toString() === filters.year;
    const matchesPrice =
      car.price >= filters.minPrice && car.price <= filters.maxPrice;

    return matchesSearch && matchesMake && matchesPrice && matchesYear;
  });

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Available Cars</h1>

          <div className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search cars..."
                className="pl-10"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mt-4">
                  <div className="space-y-2">
                    <Label>Make</Label>
                    <Select
                      value={filters.make}
                      onValueChange={(value) =>
                        setFilters({ ...filters, make: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Makes">All Makes</SelectItem>
                        {uniqueMakes.filter(Boolean).map((make) => (
                          <SelectItem key={make} value={make}>
                            {make}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Select
                      value={filters.year}
                      onValueChange={(value) =>
                        setFilters({ ...filters, year: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Years">All Years</SelectItem>
                        {uniqueYears.filter(Boolean).map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Price Range (per day)</Label>
                    <div className="pt-2">
                      <Slider
                        min={0}
                        max={500}
                        step={10}
                        value={[filters.minPrice, filters.maxPrice]}
                        onValueChange={([min, max]) =>
                          setFilters({
                            ...filters,
                            minPrice: min,
                            maxPrice: max,
                          })
                        }
                      />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${filters.minPrice}</span>
                      <span>${filters.maxPrice}</span>
                    </div>
                  </div>

                  <Separator />

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        search: "",
                        make: "All Makes",
                        minPrice: 0,
                        maxPrice: 500,
                        year: "All Years",
                      })
                    }
                  >
                    Reset Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading cars...</div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              {filteredCars.length} {filteredCars.length === 1 ? "car" : "cars"}{" "}
              founded
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
