"use client";

import React from "react";
import Link from "next/link";
import { registerAction } from "@/app/actions/auth";
import { useActionState } from "react";
import AuthError from "../_components/AuthError";

export default function page() {
  const [state, formAction] = useActionState(registerAction, {
    error: false,
    success: false,
  });

  return (
    <div className="min-h-[calc(100vh-60px)] w-full flex items-center justify-center">
      <div className="w-[450px] border border-amber-50 text-center rounded bg-[var(--bg)] p-7 shadow-lg">
        <h1 className="text-2xl font-bold text-[var(--btn-primary)]">
          Create your account
        </h1>
        <p className="text-lg mb-4">
          Join thousands of users and stay organized
        </p>
        <form className="authForm flex flex-col" action={formAction}>
          <input
            className="form-input"
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          <input
            className="form-input"
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
          <input
            className="form-input"
            name="email"
            type="text"
            placeholder="Email"
          />
          <input
            className="form-input"
            name="password"
            type="text"
            placeholder="Password"
          />
          <button className="formBtn bg-[var(--btn-primary)]">Register</button>
        </form>
        <p className="pt-2 text-gray-400">
          Already have an account?
          <Link className="ml-2" href={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
