"use client";
import AuthForm from "@/components/AuthForm";
import { login } from "@/action/auth";
import { signInSchema, TSignInSchema } from "@/lib/validation";
import React from "react";

const page = () => {
  return (
    <AuthForm<TSignInSchema>
      schema={signInSchema}
      tipe="sign-in"
      defaultValue={{
        email: "",
        password: "",
      }}
      onSubmit={login}
    />
  );
};

export default page;
