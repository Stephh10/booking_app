"use client";
import React from "react";
import EditableField from "@/app/dashboard/patient/_components/EditableField";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const isEditing = true;

  function submitFormData(data: FormValues) {
    reset();
    toast.success("Thank you for reaching out! We will get back to you soon.");
  }
  return (
    <section
      id="contact"
      className="min-h-[420px] flex flex-col md:flex-row items-center gap-2 md:gap-5"
    >
      <div className="contactContent flex-5 ">
        <h1 className="font-bold text-4xl text-[var(--lp-primary)]">
          Contact Us
        </h1>
        <p className="text-lg lp-text my-2">
          Email Us or complete the form to learn how the AppointDoc team can
          solve your problem and streamline your workflow.
        </p>
        <p className="lp-text underline ">appointdoc@gmail.com</p>
        <div className="flex flex-col md:flex-row gap-4 my-5">
          <div>
            <h2 className="font-bold text-md lg:text-lg">Support</h2>
            <p className="lp-text">
              If you need assistance with your account, technical issues, or
              general questions, our support team is here to help. Reach out to
              us anytime and we’ll get back to you as soon as possible.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-md lg:text-lg">
              Feedback and Suggestions
            </h2>
            <p className="lp-text">
              We value your thoughts. Share your ideas, suggestions, or feature
              requests to help us improve and deliver a better experience for
              everyone.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-md lg:text-lg">Media Inquiries</h2>
            <p className="lp-text">
              For press, interviews, partnerships, or media-related questions,
              please contact our communications team. We’ll be happy to provide
              the information you need.
            </p>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(submitFormData)}
        className="contactForm w-full md:flex-2 bg-[var(--lp-card)] h-full  rounded-lg p-4 py-6"
      >
        <h1 className="text-2xl font-bold text-[var(--lp-primary)]">
          Get in Touch
        </h1>
        <p className="lp-text mb-2">You can reach us anytime.</p>
        <div className="inputSection">
          <EditableField
            label="First Name"
            name="firstName"
            inputData={""}
            isEditing={isEditing}
            register={register}
            errors={errors}
            validation={{ required: "First name is required" }}
          />
          <EditableField
            label="Last Name"
            name="lastName"
            inputData={""}
            isEditing={isEditing}
            register={register}
            errors={errors}
            validation={{ required: "First name is required" }}
          />
        </div>
        <EditableField
          label="Email"
          name="email"
          inputData={null}
          isEditing={isEditing}
          register={register}
          errors={errors}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
        />
        <EditableField
          label="Phone"
          name="phone"
          inputData={""}
          isEditing={isEditing}
          register={register}
          errors={errors}
          validation={{ required: "Phone number is required" }}
        />
        <EditableField
          label="Message"
          name="message"
          inputData={""}
          isEditing={isEditing}
          register={register}
          inputType={"textarea"}
          errors={errors}
          validation={{ required: "Message is required" }}
        />
        <button
          type="submit"
          className="bg-[var(--lp-primary)] text-[var(--lp-card)] w-full py-2 rounded hoverScale"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
