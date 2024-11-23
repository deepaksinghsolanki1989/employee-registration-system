"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessages from "@/components/ErrorMessages";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SIGNIN, SIGNUP } from "@/redux/action.types";
import { RootState } from "@/redux/store";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    fullName:
      formType === "sign-up"
        ? z.string().min(1, "Name is required")
        : z.string().optional(),
    employeeCode:
      formType === "sign-up"
        ? z
            .string()
            .min(1, "Employee code is required")
            .max(10, "Employee code must not exceed 10 characters.")
        : z.string().optional(),
    email: z.string().min(1, "Email is required").email(),
    password:
      formType === "sign-up"
        ? z
            .string()
            .min(1, "Password is required.")
            .min(8, "Password must be at least 8 characters long.")
            .regex(
              /[A-Z]/,
              "Password must include at least one uppercase letter."
            )
            .regex(
              /[a-z]/,
              "Password must include at least one lowercase letter."
            )
            .regex(/\d/, "Password must include at least one number.")
            .regex(
              /[!@#$%^&*(),.?":{}|<>]/,
              "Password must include at least one special character."
            )
        : z.string().min(1, "Password is required."),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.auth
  );

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      employeeCode: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!loading && success) {
      if (type === "sign-up") {
        setIsOpen(true);
      } else {
        router.push("/");
      }
    }
  }, [loading, success]);

  function onSubmit(payload: z.infer<typeof formSchema>) {
    if (type === "sign-up") {
      dispatch({ type: SIGNUP, payload });
    } else if (type === "sign-in") {
      dispatch({ type: SIGNIN, payload });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <ErrorMessages error={error} />
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
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
            disabled={loading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            {loading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="logo"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>
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
      {type === "sign-up" && !loading && success && (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent className="shad-alert-dialog">
            <AlertDialogHeader className="relative flex justify-center">
              <AlertDialogTitle className="h2 text-center ">
                <span className="text-brand">Account Created</span>
                <Image
                  src="/assets/icons/close-dark.svg"
                  alt="close"
                  width={20}
                  height={20}
                  onClick={() => setIsOpen(false)}
                  className="otp-close-button"
                />
              </AlertDialogTitle>
              <AlertDialogDescription className="subtitle-2 text-center text-light-100">
                Your account is created and pending for approval. We will notify
                once you account approved by admin.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <div className="flex w-full flex-col gap-4 items-center">
                <AlertDialogAction
                  onClick={() => {
                    setIsOpen(false);
                    form.reset();
                  }}
                  className="shad-submit-btn h-12 w-1/4"
                  type="button"
                >
                  Close
                </AlertDialogAction>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default AuthForm;
