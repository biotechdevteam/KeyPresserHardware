"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/types/forgotPasswordSchema";
import Link from "next/link";

const ForgotPassword = () => {
  const [resetMethod, setResetMethod] = useState<"email" | "phone" | null>(
    null
  ); // Manage selected reset option
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleForgotPassword = async (data: any) => {
    if (resetMethod === "email") {
      // Logic for resetting via email
      console.log("Reset link sent to email:", data.email);
    } else if (resetMethod === "phone") {
      // Logic for resetting via phone
      console.log("Reset code sent to phone:", data.phone);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      <h2 className="text-2xl font-semibold mt-4">Forgot Password</h2>
      <p className="text-center">
        To reset your password, please select one of the options below. You can
        choose to receive a reset link via email or a reset code via your phone
        number.
      </p>

      {!resetMethod && (
        <div className="space-x-4">
          <Button onClick={() => setResetMethod("email")}>
            Reset via Email
          </Button>
          <Button onClick={() => setResetMethod("phone")}>
            Reset via Phone
          </Button>
        </div>
      )}

      {resetMethod && (
        <form
          onSubmit={handleSubmit(handleForgotPassword)}
          className="space-y-4 w-full max-w-md"
        >
          <p className="text-center">
            {resetMethod === "email"
              ? "Enter your email address, and we'll send you a link to reset your password."
              : "Enter your phone number to receive a code for password reset."}
          </p>

          {resetMethod === "email" && (
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              error={errors.email?.message as string | undefined}
            />
          )}
          {resetMethod === "phone" && (
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              {...register("phone")}
              error={errors.phone?.message as string | undefined}
            />
          )}

          <Button type="submit" className="w-full">
            {resetMethod === "email" ? "Send Reset Link" : "Send Reset Code"}
          </Button>

          <p className="text-center">
            Not sure?{" "}
            <Link href="" onClick={() => setResetMethod(null)}>
              Choose Another Method
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
