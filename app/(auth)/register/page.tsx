"use client";

import React, { useState } from "react";
import Link from "next/link";
import { registerAction } from "@/app/actions/auth";
import { useActionState } from "react";
import AuthError from "../_components/AuthError";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import EditableField from "@/app/dashboard/patient/_components/EditableField";
import { useTransition } from "react";

export default function page() {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  function handleFormSubmit(data: any) {
    startTransition(async () => {
      const response = await registerAction(data);
      if ("error" in response) {
        console.log(response);
        return;
      }
    });
  }

  return (
    <div className="h-[90vh] w-full flex items-center justify-center">
      <div className="text-center p-7 flex items-center gap-5 w-[1200px] h-[700px]">
        <div className="relative flex-4 h-full rounded-lg overflow-hidden">
          <Image src="/register-image.jpg" alt="register-image" fill />
          <div className="absolute top-10 left-10 right-10 flex justify-between items-center text-[var(--lp-card)] z-10">
            <h1 className="text-2xl">AppointDoc</h1>
            <div className="flex items-center">
              <h1 className="text-2xl gap-1">We Care</h1>
              <ShieldCheck size={40} />
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(12,58,102,0.4)]"></div>
          <div className="text-[var(--lp-card)] z-10 absolute bottom-10 left-10 right-10">
            <h1 className="text-5xl text-[text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9]">
              Create an account to access your dashboard instantly.
            </h1>
            <h1 className="mt-3">
              Trusted by thousands of users. Secure and easy to use.
            </h1>
          </div>
        </div>
        <div className="flex-2 bg-[var(--bg)] h-full px-5 py-10 rounded-lg">
          <h1 className="text-3xl font-bold  text-left text-[var(--lp-primary)]">
            Start using your dashboard in minutes.
          </h1>
          <h1 className="text-3xl font-bold text-[var(--lp-primary)] text-left">
            No credit card required.
          </h1>
          <p className="text-xl text-left my-5 ">
            Join thousands of users and stay organized
          </p>
          <form
            className="authForm flex flex-col text-left"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
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
              inputData={null}
              isEditing={isEditing}
              register={register}
              errors={errors}
              validation={{ required: "Last name is required" }}
            />
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
              label="Password"
              name="password"
              inputData={""}
              inputType={"password"}
              isEditing={isEditing}
              register={register}
              errors={errors}
              validation={{
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
              }}
            />

            <button className="formBtn bg-[var(--lp-primary)] mt-5">
              {isPending ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="pt-2 text-lg text-gray-400">
            Already have an account?
            <Link className="ml-2" href={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
