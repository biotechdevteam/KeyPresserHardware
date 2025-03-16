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
import { ArrowLeft, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const { forgotPassword, loading, error } = useAuth();

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
      const success = await forgotPassword(email);
      if (success) {
        setEmailSent(true);
        reset();
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

              <Button
                type="submit"
                className="w-full"
                disabled={loading || !isFormValid}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div className="bg-primary text-primary-foreground p-4 rounded-md">
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
