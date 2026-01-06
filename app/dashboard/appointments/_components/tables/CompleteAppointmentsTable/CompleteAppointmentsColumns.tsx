import { Appointment } from "@prisma/client";
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
import { deleteAppointment } from "@/app/actions/appointments";

type AppointmentWithPatient = Appointment & {
  patient: {
    firstName: string;
    lastName: string;
  } | null;
};

export const completeAppointmentsColumns: ColumnDef<AppointmentWithPatient>[] =
  [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex justify-center items-center text-center mx-auto">
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
      id: "patientName",
      header: "Full Name",
      accessorFn: (row) =>
        row.patient
          ? `${row.patient.firstName} ${row.patient.lastName}`
          : "No Patient",
    },
    {
      accessorKey: "reason",
      header: "Reason",
    },
    {
      accessorKey: "date",
      header: "Time",
      cell: ({ row }) => {
        const date: Date = row.getValue("date");
        return new Date(date).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status: string = row.getValue("status");
        return <span className="capitalize">{status}</span>;
      },
    },
    {
      accessorKey: "duration",
      header: "Duration",
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
      header: () => <div className="mx-auto">Actions</div>,
      cell: ({ row }) => {
        const appointment = row.original;

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
                  onClick={() =>
                    redirect(`/dashboard/appointments/${appointment.id}`)
                  }
                >
                  View Appointment
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(appointment.id)}
                >
                  Copy Appointment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="h-[35px] bg-red-100">
                  <form
                    action={async () => {
                      await deleteAppointment(appointment.id);
                    }}
                  >
                    <button
                      type="submit"
                      className=" w-full text-center  mx-auto"
                    >
                      Delete Appointment
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
