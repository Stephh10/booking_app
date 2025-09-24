export interface Note {
  id: string;
  isFlagged: boolean;
  content: string;
  appointmentId: string;
  createdAt: Date | string;
}
