"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/types/forgotPasswordSchema";

interface ForgotPasswordProps {
  onClose: () => void;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleForgotPassword = async (data: any) => {
    // Logic for resetting via email
    console.log("Reset link sent to email:", data.email);
    onClose(); // Close the modal after submitting
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <h2 className="text-2xl font-semibold">Forgot Password</h2>
      <p className="text-center">
        Enter your email address, and we'll send you a link to reset your
        password.
      </p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-4 w-full max-w-md"
      >
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message as string | undefined}
        />

        <Button type="submit" className="w-full">
          Send Reset Link
        </Button>

      </form>
    </div>
  );
};

export default ForgotPassword;
