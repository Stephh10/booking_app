"use client";

import React from "react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import EditableField from "@/app/dashboard/patient/_components/EditableField";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { changePasswordLogin } from "@/app/actions/user";

interface SearchParams {
  token?: string;
}

export default function page({ searchParams }: any) {
  const [isPending, startTransition] = useTransition();
  const isEditing = true;
  const params = React.use(searchParams) as SearchParams;

  const token = params.token;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  function handleFormSubmit(data: any) {
    startTransition(async () => {
      const response = await changePasswordLogin(data, token);
      if (response?.error) {
        setError("password", {
          type: "manual",
          message: response.error,
        });
      }

      console.log(response);
    });
  }

  return (
    <div className="h-[90vh] w-full flex items-center justify-center">
      <div className="text-center p-7 flex items-center gap-5 w-[1200px] h-[600px]">
        <div className="relative flex-4 h-full rounded-lg overflow-hidden">
          <Image src="/login-image.jpg" alt="register-image" fill />
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
              A Powerful Dashboard for Doctors
            </h1>
            <h1 className="mt-3 text-lg">
              Trusted by thousands of users. Secure and easy to use.
            </h1>
          </div>
        </div>
        <div className="flex-2 bg-[var(--bg)] h-full px-5 py-10 rounded-lg ">
          <h1 className="text-3xl font-bold mb-1 text-[var(--lp-primary)]">
            Password Reset
          </h1>
          <p className="text-xl mb-4 ">
            Please create a new password for your account.
          </p>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="authForm relative h-full text-left"
          >
            <EditableField
              label="New Password"
              name="newPassword"
              inputData={null}
              isEditing={isEditing}
              register={register}
              errors={errors}
              validation={{
                required: "Password is required",
              }}
            />
            <EditableField
              label="Confirm Password"
              name="confirmPassword"
              inputData={""}
              isEditing={isEditing}
              register={register}
              inputType="password"
              errors={errors}
              validation={{ required: "Passwords do not match" }}
            />
            <div className="absolute left-0 bottom-30 w-full text-center">
              <button className="formBtn bg-[var(--lp-primary)] mt-5 justify-self-end w-full">
                {isPending ? "Updating password..." : "Change Password"}
              </button>
              <button className="pt-2 text-gray-400 cursor-pointer">
                <Link href="/login">Back to login</Link>
              </button>
              <p className="pt-2 text-gray-400">
                Note: For your security, avoid using common or easy-to-guess
                passwords.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
