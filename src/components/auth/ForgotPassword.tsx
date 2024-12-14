"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/types/forgotPasswordSchema";
import Link from "next/link";
import { z } from "zod";
import useAuth from "@/lib/useAuth";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [resetMethod, setResetMethod] = useState<"email" | "phone" | null>(
    null
  );

  const { forgotPassword, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // Handle form submission
  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    const { email, phone } = data;
    if (resetMethod === "email" && email) {
      const success = await forgotPassword(email);
      if (success) {
        alert(success);
        reset();
      }
    } else if (resetMethod === "phone" && phone) {
      const success = await forgotPassword(phone);
      if (success) {
        alert(success);
        reset();
      }
      console.log("Reset code sent to phone:", phone);
      reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 -mt-24 p-8">
      <h2 className="text-2xl font-semibold mt-4">Forgot Password</h2>
      <p className="text-center">
        Please choose how you would like to reset your password.
      </p>

      {!resetMethod && (
        <div className="space-x-4">
          <Button onClick={() => setResetMethod("email")} disabled={loading}>
            Reset via Email
          </Button>
          <Button onClick={() => setResetMethod("phone")} disabled={loading}>
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
              ? "Enter your email to receive a reset link."
              : "Enter your phone number to receive a reset code."}
          </p>

          {resetMethod === "email" && (
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              error={errors.email?.message}
            />
          )}

          {resetMethod === "phone" && (
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              {...register("phone")}
              error={errors.phone?.message}
            />
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? "Processing..."
              : resetMethod === "email"
              ? "Send Reset Link"
              : "Send Reset Code"}
          </Button>

          {error && <p className="text-red-500 text-center mt-4">{error === "email must be an email" ? "Please verify and try using a valid Email" : error}</p>}

          <p className="text-center mt-4">
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
