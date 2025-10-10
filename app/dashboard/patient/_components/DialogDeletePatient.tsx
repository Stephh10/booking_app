"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deletePatient } from "@/app/actions/patients";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function DialogDeletePatient({
  isOpen,
  setIsOpen,
  patientId,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  patientId: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDeletePatient() {
    startTransition(async () => {
      const response = await deletePatient(patientId);

      if (response.success) {
        setIsOpen(false);
        router.push("/dashboard");
      }
    });
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Patient</DialogTitle>

            <p>
              Are you sure you want to delete this patient? This action cannot
              be undone.
            </p>
            <p>
              The patient’s data will be permanently removed from the system.
            </p>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button
                onClick={() => setIsOpen(false)}
                className="outlineBtn border border-black px-5"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={handleDeletePatient}
              className="primaryBtn"
              type="submit"
            >
              {isPending ? "Deleting..." : "Delete anyway"}
            </button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
