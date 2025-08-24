export interface Appointment {
  id: string;
  date: string;
  duration: number;
  diagnose?: string;
  notes?: object[];
  title?: string | null;
  reason?: string | null;
  status: "scheduled" | string;
  doctorId: string;
  patientId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
