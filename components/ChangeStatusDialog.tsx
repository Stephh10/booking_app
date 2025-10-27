"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deletePatient } from "@/app/actions/patients";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function ChangeStatusDialog({
  isOpen,
  setIsOpen,
  appointmentId,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  appointmentId: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDeletePatient() {
    startTransition(async () => {
      const response = await deletePatient(appointmentId);

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
            <DialogTitle>Cancel Appointment</DialogTitle>
            <p>Are you sure you want to change the status of this patient?</p>
            <p>This action can be undone only in Appointments Tab</p>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button
                onClick={() => setIsOpen(false)}
                className="outlineBtn border-1 px-5"
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
