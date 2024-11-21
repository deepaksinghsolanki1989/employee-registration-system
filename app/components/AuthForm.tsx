"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    fullName:
      formType === "sign-up"
        ? z.string().min(1, "Name is required")
        : z.string().optional(),
    employeeCode:
      formType === "sign-up"
        ? z.string().min(1, "Employee code is required").max(10)
        : z.string().optional(),
    email: z.string().min(1, "Email is required").email(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      employeeCode: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });

    setIsLoading(true);
    setErrorMessage("");

    try {
      router.push(type === "sign-up" ? "/sign-in" : "/");
    } catch {
      setErrorMessage("Failed to create account. Please try again.");
    } finally {
      console.log({ isLoading });
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          {type === "sign-up" && (
            <>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className="shad-form-item">
                      <FormLabel className="shad-form-label">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="shad-input"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="shad-form-message" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employeeCode"
                render={({ field }) => (
                  <FormItem>
                    <div className="shad-form-item">
                      <FormLabel className="shad-form-label">
                        Employee Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your employee code"
                          className="shad-input"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="shad-form-message" />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="logo"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-brand"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AuthForm;
