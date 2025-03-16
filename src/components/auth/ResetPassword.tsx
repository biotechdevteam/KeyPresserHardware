"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAuth from "@/lib/useAuth";
import { ArrowLeft, Eye, EyeOff, Lock, CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordProps {
  token: string;
}

const ResetPassword = ({ token }: ResetPasswordProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const { resetPassword, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = watch("newPassword");
  const confirmPasswordValue = watch("confirmPassword");
  const isFormValid =
    newPasswordValue &&
    confirmPasswordValue &&
    !errors.newPassword &&
    !errors.confirmPassword;

  // Handle form submission
  const handleResetPassword = async (data: ResetPasswordFormData) => {
    if (!token) {
      alert("Invalid token. Please try again.");
      return;
    }

    const { newPassword } = data;
    const success = await resetPassword(token, newPassword);
    if (success) {
      setResetSuccess(true);
      setTimeout(() => {
        router.push("/auth/signin");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center">
            {!resetSuccess
              ? "Create a new secure password"
              : "Password reset complete"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!resetSuccess ? (
            <form
              onSubmit={handleSubmit(handleResetPassword)}
              className="space-y-4"
            >
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    {...register("newPassword")}
                    error={errors.newPassword?.message}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-6 bg-transparent hover:bg-transparent text-gray-500 hover:text-primary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-6 bg-transparent hover:bg-transparent text-gray-500 hover:text-primary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="error">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-1 text-sm">
                <p className="text-gray-500">Password must:</p>
                <ul className="text-xs space-y-1 text-gray-500">
                  <li
                    className={`flex items-center gap-1 ${
                      newPasswordValue?.length >= 8 ? "text-green-600" : ""
                    }`}
                  >
                    {newPasswordValue?.length >= 8 && (
                      <CheckCircle className="h-3 w-3" />
                    )}
                    Be at least 8 characters long
                  </li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading || !isFormValid}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-lg">
                  Password Reset Successful!
                </h3>
                <p className="text-gray-500 text-sm">
                  You'll be redirected to sign in shortly.
                </p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          {!resetSuccess && (
            <Link
              href="/auth/signin"
              className="flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Sign In</span>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
