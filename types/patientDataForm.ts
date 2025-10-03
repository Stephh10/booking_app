export interface PatientDataForm {
  firstName: string;
  lastName: string;
  gender?: string;
  nationalId?: string;
  email?: string;
  phone?: string;
  city?: string;
  postalCode?: string;
  dateOfBirth?: Date | string;
  id?: string;
}
