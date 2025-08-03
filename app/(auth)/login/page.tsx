"use client";

import React from "react";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
import { useActionState } from "react";
import { useState } from "react";
import AuthError from "../_components/AuthError";

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
      <div className="w-[450px] border border-amber-50 text-center rounded bg-[var(--bg)] p-7 shadow-lg">
        <h1 className="text-2xl font-bold text-[var(--btn-primary)]">
          Welcome Back
        </h1>
        <p className="text-lg mb-4">Login to your account</p>
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
