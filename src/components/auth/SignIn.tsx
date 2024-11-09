"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/types/signupSchema";
import { useAuth } from "@/lib/useAuth";
import Link from "next/link";
import Image from "next/image";
import { About } from "@/types/aboutSchema";
import Logo from "../../../public/images/logo.png";

const SignIn: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  const { signIn, error, loading } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const logo = aboutData?.logo_url || Logo;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: any) => {
    setFormError(null);
    try {
      await signIn(data.email, data.password);
    } catch (err) {
      setFormError("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen -mt-24 p-4">
      <div className="w-full max-w-md border border-border bg-card shadow-lg rounded-lg p-6 space-y-4">
        <div className="flex flex-col items-center">
          <Image
            src={logo}
            alt={aboutData.name}
            width={50}
            height={50}
            className="rounded"
          />
          <h1 className="text-2xl font-semibold mt-4">Sign In</h1>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <div className="text-destructive text-sm">{error}</div>}
          {formError && <div className="text-destructive text-sm">{formError}</div>}

          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message as string | undefined}
            placeholder="Enter your email"
            className="w-full"
          />
          <Input
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password?.message as string | undefined}
            placeholder="Enter your password"
            className="w-full"
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="flex items-center justify-between">
          <Link href="/auth/forgot-password" className="text-sm">
            Forgot Password?
          </Link>
          <Link href="/auth/signup" className="text-sm">
            Don’t have an account yet? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
