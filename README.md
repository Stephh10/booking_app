# Doctor Booking Application

## Overview

This project is a web-based booking application designed specifically for doctors to manage patient appointments efficiently.

The main goal of the application is to simplify the scheduling process by allowing doctors to define their availability and share a booking link with patients. Available time slots are generated dynamically based on the doctor's configured schedule and existing appointments.

Patients can book appointments only within the available time slots, ensuring no overlaps and reducing manual coordination.

---

## Key Features

- **Doctor-defined availability**
  - Doctors can configure their working hours and availability.
  - Available time slots are generated automatically based on these settings.

- **Shareable booking link**
  - Doctors can share a unique booking link with patients.
  - Patients can book appointments without needing an account.

- **Appointment management**
  - View upcoming, past, and scheduled appointments.
  - Prevent double-booking and overlapping time slots.

- **Patient management**
  - Maintain a record of patients and their appointment history.
  - Easily track upcoming and completed visits.

- **Responsive dashboard**
  - Optimized for both desktop and mobile devices.
  - Clean and intuitive UI focused on usability.

---

## Tech Stack

- **Frontend & Framework**
  - Next.js
  - React
  - TypeScript

- **Styling**
  - Tailwind CSS

- **State Management**
  - Zustand

- **Database**
  - MySQL

- **Other**
  - REST API integration
  - Modular component architecture
  - Reusable custom hooks

---

## Architecture & Development Notes

- The application follows a modular and scalable structure suitable for real-world production use.
- Global state is handled using Zustand where shared state is required.
- UI components are designed with reusability and maintainability in mind.
- Focus was placed on clean code, readable commit history, and incremental feature development.

---

## Use Case

This application is suitable for:
- Private clinics
- Independent doctors
- Medical practices looking for a lightweight appointment scheduling solution

---

## Future Improvements

- Authentication and role-based access
- Email notifications for appointment confirmations
- Calendar integration (Google / Outlook)
- Advanced availability rules and exceptions

---

## Author

Developed as a portfolio project to demonstrate real-world React and Next.js application architecture, state management, and UI/UX best practices.
