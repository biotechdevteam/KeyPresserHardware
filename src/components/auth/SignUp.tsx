"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/types/signupSchema";
import { useAuth } from "@/lib/useAuth";

const SignUp = () => {
  const { signUp, error, loading } = useAuth(); // useAuth hook for authentication logic

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: any) => {
    await signUp(
      data.email,
      data.password,
      data.first_name,
      data.last_name,
      "user"
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <Input
        label="First Name"
        {...register("first_name")}
        error={(errors.first_name?.message as string) || undefined}
      />
      <Input
        label="Last Name"
        {...register("last_name")}
        error={errors.last_name?.message as string | undefined}
      />
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
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignUp;
