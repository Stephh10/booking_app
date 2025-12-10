import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="flex items-center gap-4">
      <div className="contactContent flex-1">
        <h1 className="font-bold text-3xl text-[var(--lp-primary)]">
          Contact Us
        </h1>
        <p className="text-lg lp-text my-2">
          Email Us or complete the form to learn how the AppointDoc team can
          solve your problem and streamline your workflow.
        </p>
        <p className="lp-text underline">appointdoc@gmail.com</p>
      </div>
      <div className="contactForm flex-1">
        <p>Img area</p>
      </div>
    </section>
  );
}
