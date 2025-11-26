"use client";

import React from "react";
import Link from "next/link";
import { registerAction } from "@/app/actions/auth";
import { useActionState } from "react";
import AuthError from "../_components/AuthError";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export default function page() {
  const [state, formAction] = useActionState(registerAction, {
    error: false,
    success: false,
  });

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
            <button className="formBtn bg-[var(--lp-primary)]">Register</button>
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
