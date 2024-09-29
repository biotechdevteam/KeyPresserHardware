"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/types/signupSchema";
import { useAuth } from "@/lib/useAuth";

const SignIn = () => {
  const { signIn, error, loading } = useAuth(); // useAuth hook for authentication logic

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: any) => {
    await signIn(data.email, data.password); // Use signIn function from the hook
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <Input
        label="Email"
        {...register("email")}
        error={errors.email?.message as string | undefined}
      />
      <Input
        label="Password"
        type="password"
        {...register("password")}
        error={errors.password?.message as string | undefined}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
};

export default SignIn;
