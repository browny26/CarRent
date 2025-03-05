"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/authContext";
import { toast } from "sonner";
import { updateProfile, User } from "firebase/auth";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface ModalEditProps {
  user: User | null;
}

export default function ModalEdit({ user }: ModalEditProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState({
    displayName: user?.displayName,
    photoURL: user?.photoURL,
  });

  // Aggiorna il form ogni volta che cambia l'utente
  useEffect(() => {
    if (user) {
      setEdit({
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const updateUserProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        await updateProfile(user, edit);
        //setUser({ ...user, photoURL }); // Aggiorna lo stato globale
        toast.success("Profile updated!");
      } catch (error) {
        toast.error("Failed to update profile");
        console.error(error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={updateUserProfile} className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={edit?.displayName || ""}
              onChange={(e) =>
                setEdit({ ...edit, displayName: e.target.value })
              }
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="photoURL">Photo URL</Label>
            <Input
              id="photoURL"
              value={edit?.photoURL || ""}
              onChange={(e) => setEdit({ ...edit, photoURL: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full">
            Edit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
