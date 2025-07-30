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

  console.log(state);

  return (
    <div className="min-h-[calc(100vh-60px)] w-full flex items-center justify-center">
      <div className="w-[400px] border border-amber-50 text-center p-2 rounded">
        <h2 className="text-lg font-bold mb-2">Register</h2>
        <form className="authForm flex flex-col" action={formAction}>
          <input
            className="form-input"
            name="username"
            type="text"
            placeholder="Username"
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
