"use client";

import React from "react";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
import { useActionState } from "react";
import { useState } from "react";
import AuthError from "../_components/AuthError";
import Email from "next-auth/providers/email";

export default function page() {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [state, formAction] = useActionState(loginAction, {
    error: false,
    success: false,
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="min-h-[calc(100vh-60px)] w-full  flex items-center justify-center">
      <div className="w-[400px] border border-amber-50 text-center p-2 rounded">
        <h2 className="text-lg font-bold mb-2">Login</h2>
        <form action={formAction} className="authForm flex flex-col">
          <input
            className="form-input"
            type="text"
            name="email"
            placeholder="Email"
            value={inputValues.email}
            onChange={handleInputChange}
          />
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            name="password"
            value={inputValues.password}
            onChange={handleInputChange}
          />
          {state?.error && <AuthError message={state.error} />}
          <button className="formBtn">Login</button>
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
