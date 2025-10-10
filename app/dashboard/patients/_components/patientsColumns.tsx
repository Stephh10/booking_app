import { Patient } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { redirect } from "next/navigation";
import { deletePatient } from "@/app/actions/patients";

export const patientColumns: ColumnDef<Patient>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-center items-center">
        <input
          type="checkbox"
          {...{
            checked: table.getIsAllRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
          className="w-4 h-4"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <input
          type="checkbox"
          {...{
            checked: row.getIsSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
          className="w-4 h-4"
        />
      </div>
    ),
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date: Date = row.getValue("createdAt");
      return new Date(date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(patient.id)}
              >
                Copy patient ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => redirect(`/dashboard/patient/${patient.id}`)}
              >
                View Profile Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <form
                  action={async () => {
                    await deletePatient(patient.id);
                  }}
                >
                  <button
                    type="submit"
                    className=" w-full text-center  mx-auto"
                  >
                    Delete Patient
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
