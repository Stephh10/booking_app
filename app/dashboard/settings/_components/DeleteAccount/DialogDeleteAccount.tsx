"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTransition } from "react";
import { deleteAccount } from "@/app/actions/user";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

export function DialogDeleteAccount({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDeletePatient() {
    startTransition(async () => {
      const response = await deleteAccount();

      if ("error" in response) {
        setIsOpen(false);
        toast.error(response.error);
      }

      signOut({ callbackUrl: "/register" });
    });
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Delete Patient</DialogTitle>

            <p>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <p>
              All your personal data, preferences, and history will be
              permanently removed from our system.
            </p>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="bg-inherit text-[var(--dark)] w-[120px] border-2 py-2 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={handleDeletePatient}
              disabled={isPending}
              className="bg-[var(--btn-danger)] text-[var(--text)] w-[120px] border-2 py-2 rounded-lg cursor-pointer"
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
