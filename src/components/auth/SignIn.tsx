"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/lib/useAuth";
import Link from "next/link";
import Image from "next/image";
import { About } from "@/types/aboutSchema";
import { useRouter } from "next/navigation";
import Logo from "../../../public/images/logo.png";
import { useRecaptcha, RECAPTCHA_ACTIONS } from "@/lib/useRecaptcha";
import { Shield } from "lucide-react";

const SignIn: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  const { signIn, error: authError, loading, user } = useAuth();
  const { executeRecaptcha, isLoading: recaptchaLoading, error: recaptchaError } = useRecaptcha();
  const [formError, setFormError] = useState<string | null>(null);
  const logo = aboutData?.logo_url || Logo;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter()

  const onSubmit = async (data: any) => {
    setFormError(null);
    
    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha(RECAPTCHA_ACTIONS.LOGIN);
      
      if (!recaptchaToken) {
        setFormError('reCAPTCHA verification failed. Please try again.');
        return;
      }

      const success = await signIn(data.email, data.password);
      if (!success) {
        setFormError("Failed to sign in. Please try again.");
      } 
      if (success) {
        if(user?.user_type === "member" || user?.user_type === "applicant"){
          router.push("/profile")
        }
        if(user?.user_type === "admin"){
          router.push("/admin")
        }
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      setFormError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen -mt-24 p-4">
      <div className="w-full max-w-md border border-border bg-card shadow-lg rounded-lg p-6 space-y-4">
        <div className="flex flex-col items-center">
          <Image
            src={logo}
            alt={aboutData.name || "Logo"}
            width={50}
            height={50}
            className="rounded"
          />
          <h1 className="text-2xl font-semibold mt-4">Sign In</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {(authError || formError) && (
            <div className="text-destructive text-sm">{authError || formError}</div>
          )}
          {recaptchaError && (
            <div className="text-destructive text-sm flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {recaptchaError}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
            error={(errors.email?.message as string) || undefined}
            placeholder="Enter your email"
            className="w-full"
          />
          <Input
            label="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            error={(errors.password?.message as string) || undefined}
            placeholder="Enter your password"
            className="w-full"
          />

          <Button type="submit" className="w-full" disabled={loading || recaptchaLoading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <p className="text-xs text-muted-foreground flex items-center justify-center pt-2">
            <Shield className="mr-1 h-3 w-3" />
            This form is protected by reCAPTCHA
          </p>
        </form>

        <div className="flex items-center justify-between pt-4">
          <Link href="/auth/forgot-password" className="text-sm">
            Forgot Password?
          </Link>
          <Link href="/membership-tiers" className="text-sm">
            Don’t have an account yet? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
