import React from "react";
import Link from "next/link";

export default function ScheduleFooter() {
  return (
    <div className="scheduleFooter">
      <Link href="/about">Terms of service</Link>
      <p>&copy; 2025 AppDoc</p>
      <Link href="/contact">Contact: 22 234 2312</Link>
    </div>
  );
}
