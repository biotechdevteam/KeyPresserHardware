"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAuth from "@/lib/useAuth";

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

  const { resetPassword, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Handle form submission
  const handleResetPassword = async (data: ResetPasswordFormData) => {
    if (!token) {
      alert("Invalid token. Please try again.");
      return;
    }

    const { newPassword } = data;
    const success = await resetPassword(token, newPassword);
    if (success) {
      alert("Password has been reset successfully!");
      reset();
      router.push("/auth/signin");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-6 -mt-24">
      <h2 className="text-2xl font-semibold">Reset Password token={token}</h2>
      <form
        onSubmit={handleSubmit(handleResetPassword)}
        className="space-y-4 w-full max-w-md"
      >
        <Input
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your new password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
