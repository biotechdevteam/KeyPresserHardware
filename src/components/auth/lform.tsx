"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/useAuth";

const SignInForm = ({ onClose }: { onClose: () => void }) => {
  const { signIn, error, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const success = await signIn(data.email, data.password);
    if (success) onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <Input
        label="Email"
        {...register("email", { required: "Email is required" })}
        error={(errors.email?.message as string) || undefined}
      />
      <Input
        label="Password"
        type="password"
        {...register("password", { required: "Password is required" })}
        error={(errors.password?.message as string) || undefined}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
};

export default SignInForm;
