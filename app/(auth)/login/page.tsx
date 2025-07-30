import React from "react";
import Link from "next/link";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default function page() {
  return (
    <div className="min-h-[calc(100vh-60px)] w-full  flex items-center justify-center">
      <div className="w-[400px] border border-amber-50 text-center p-2 rounded">
        <h2 className="text-lg font-bold mb-2">Login</h2>
        <form
          action={async (formData: FormData) => {
            "use server";
            const email = formData.get("email");
            const password = formData.get("password");

            const res = await signIn("credentials", {
              email: email,
              password: password,
            });
          }}
          className="authForm flex flex-col"
        >
          <input
            className="form-input"
            type="text"
            name="email"
            placeholder="Email"
          />
          <input
            className="form-input"
            type="text"
            placeholder="Password"
            name="password"
          />
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
