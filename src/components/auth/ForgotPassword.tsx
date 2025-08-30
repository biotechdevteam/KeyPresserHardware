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
import { ArrowLeft, Mail, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRecaptcha, RECAPTCHA_ACTIONS } from "@/lib/useRecaptcha";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const { forgotPassword, loading, error } = useAuth();
  const { executeRecaptcha, isLoading: recaptchaLoading, error: recaptchaError } = useRecaptcha();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const emailValue = watch("email");
  const isFormValid = emailValue && !errors.email;

  // Handle form submission
  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    const { email } = data;
    if (email) {
      try {
        // Execute reCAPTCHA
        const recaptchaToken = await executeRecaptcha(RECAPTCHA_ACTIONS.FORGOT_PASSWORD);
        
        if (!recaptchaToken) {
          throw new Error('reCAPTCHA verification failed. Please try again.');
        }

        const success = await forgotPassword(email);
        if (success) {
          setEmailSent(true);
          reset();
        }
      } catch (error) {
        console.error("Error during forgot password:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center">
            {!emailSent
              ? "Enter your email to receive a password reset link"
              : "Check your email"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!emailSent ? (
            <form
              onSubmit={handleSubmit(handleForgotPassword)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  error={errors.email?.message}
                />
              </div>

              {error && (
                <Alert variant="error" className="mt-4">
                  <AlertDescription>
                    {error === "value must be an email"
                      ? "Please enter a valid email address"
                      : error}
                  </AlertDescription>
                </Alert>
              )}

              {recaptchaError && (
                <Alert variant="error" className="mt-4">
                  <AlertDescription className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    {recaptchaError}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading || recaptchaLoading || !isFormValid}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>

              <p className="text-xs text-muted-foreground flex items-center justify-center pt-2">
                <Shield className="mr-1 h-3 w-3" />
                This form is protected by reCAPTCHA
              </p>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div className="bg-accent text-primary-foreground p-4 rounded-md">
                <p className="font-medium">Reset link sent!</p>
                <p className="text-sm">
                  Check your email inbox for instructions to reset your
                  password.
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setEmailSent(false)}
              >
                Send to a different email
              </Button>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          <Link
            href="/auth/signin"
            className="flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Sign In</span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
