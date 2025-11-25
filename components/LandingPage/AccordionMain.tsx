import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionMain() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full bg-[var(--lp-card)] my-5 p-4 rounded-lg"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Patient Records</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance text-lg">
          <p>
            View complete patient history including medical conditions,
            medications, allergies, and previous visits.
          </p>
          <p>Add or update patient information quickly.</p>
          <p>Search and filter patients by name, ID, or condition.</p>
          <p>
            Attach files, test results, and reports directly to patient
            profiles.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Appointments & Schedule</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            View all upcoming appointments in a daily, weekly, or monthly
            calendar view.
          </p>
          <p>
            See patient check-in status and appointment details at a glance.
          </p>
          <p>Highlight urgent or critical appointments for quick attention.</p>
          <p>Send automatic reminders to patients via email or SMS.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Booking Links</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>Generate a personalized booking link to send to patients.</p>
          <p>
            Patients can select from available time slots directly, reducing
            back-and-forth communication.
          </p>
          <p>Monitor which slots are booked, pending, or canceled.</p>
          <p>Track patient bookings and confirm appointments in real-time.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Reports & Analytics</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            View visual summaries of patient visits, treatment outcomes, and
            appointment trends.
          </p>
          <p>Generate reports for specific periods or patient groups.</p>
          <p>Export data for compliance, insurance, or research purposes.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
