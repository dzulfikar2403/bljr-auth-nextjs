"use client";
import AuthForm from "@/components/AuthForm";
import { register } from "@/action/auth";
import { signUpSchema, TSignUpSchema } from "@/lib/validation";
import React from "react";

const page = () => {
  return (
    <AuthForm<TSignUpSchema>
      schema={signUpSchema}
      tipe="sign-up"
      defaultValue={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={register}
    />
  );
};

export default page;
