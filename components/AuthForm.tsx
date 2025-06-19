"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { ZodTypeAny } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fieldNameAuth, fieldTypeAuth } from "@/constant";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginGithub } from "@/action/auth";

type AuthFormProps<T extends FieldValues> = {
  schema: ZodTypeAny;
  tipe: "sign-in" | "sign-up";
  defaultValue: T;
  onSubmit: (data: T) => Promise<{ success: boolean; message: string }>;
};

function AuthForm<T extends FieldValues>({
  schema,
  tipe,
  defaultValue,
  onSubmit,
}: AuthFormProps<T>) {
  const isSignIn = tipe === "sign-in";
  const router = useRouter();

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValue as DefaultValues<T>,
  });

  const handleSubmit = async (data: T) => {
    const response = await onSubmit(data);

    if (response.success && isSignIn) {
      // cek success login
      toast.success(response.message);
      router.push("/dashboard");
    } else if (response.success && !isSignIn) {
      // cek success register
      toast.success(response.message);
    } else if (!response.success) {
      // cek jika gagal
      toast.error(response.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen text-gray-700">
      <h1 className="font-bold text-2xl">
        {isSignIn ? "Welcome Back, bre!" : "Hi, Get Ready To Begin ?"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 py-8 w-80"
        >
          {Object.keys(defaultValue).map((eachField, i) => (
            <FormField
              key={i}
              control={form.control}
              name={eachField as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {fieldNameAuth[field.name as keyof typeof fieldNameAuth]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={
                        fieldTypeAuth[field.name as keyof typeof fieldTypeAuth]
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            Submit
          </Button>
        </form>
      </Form>
      <div className="w-lg h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      <div className="max-w-xl mx-auto flex justify-center gap-4 mt-4">
        <form action="" className="w-full cursor-pointer">
          <Button
            type="button"
            variant={"outline"}
            className="w-full cursor-pointer"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Google</title>
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Google
          </Button>
        </form>
        <form
          action={async () => await loginGithub()}
          className="w-full cursor-pointer"
        >
          <Button
            type="submit"
            variant={"outline"}
            className="w-full cursor-pointer"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>GitHub</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            Github
          </Button>
        </form>
      </div>

      <div className="flex mt-6 justify-center gap-1 text-xs">
        <span>
          {isSignIn
            ? "Don’t have an account already? "
            : "Have an account already?"}
        </span>
        <Link
          className="text-blue-400 hover:text-blue-500"
          href={isSignIn ? "/sign-up" : "/sign-in"}
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </Link>
      </div>
    </div>
  );
}

export default AuthForm;
