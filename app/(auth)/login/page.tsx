"use client";

import React from "react";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
import { useActionState } from "react";
import { useState } from "react";
import AuthError from "../_components/AuthError";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import EditableField from "@/app/dashboard/patient/_components/EditableField";

export default function page() {
  const [isPending, startTransition] = useTransition();
  const isEditing = true;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  function handleUserLogin(data: any) {
    startTransition(async () => {
      if (!data.email || !data.password) return;
      const response = await loginAction(data);

      if ("error" in response) {
        setError("password", {
          type: "manual",
          message: response.error,
        });
      }
    });
    console.log("Submitting data");
    console.log(data);
  }

  return (
    <div className="min-h-[calc(100vh-60px)] w-full  flex items-center justify-center">
      <div className="w-[450px] border border-amber-50 text-center rounded bg-[var(--bg)] p-7 shadow-lg">
        <h1 className="text-3xl font-bold text-[var(--lp-primary)]">
          Welcome Back
        </h1>
        <p className="text-xl mb-4">Please login to access all features.</p>
        <form
          onSubmit={handleSubmit(handleUserLogin)}
          className="authForm flex flex-col text-left"
        >
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
            isEditing={isEditing}
            register={register}
            inputType="password"
            errors={errors}
            validation={{ required: "Password is required" }}
          />
          <button className="formBtn bg-[var(--lp-primary)] mt-5">
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="pt-2 text-gray-400">
          Don't have an account?
          <Link className="ml-2" href={"/register"}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
