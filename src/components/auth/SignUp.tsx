"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/types/signupSchema";
import useAuth from "@/lib/useAuth";
import { About } from "@/types/aboutSchema";
import { Link } from "next-view-transitions";
import Logo from "../../../public/images/logo.png";
import Image from "next/image";

const SignUp: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  const { signUp, error, loading } = useAuth(); // useAuth hook for authentication logic
  const logo = aboutData?.logo_url || Logo;

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
      "customer"
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-xl border border-border bg-card shadow-lg rounded-lg p-6 space-y-4">
        <div className="flex flex-col items-center">
          <Image
            src={logo}
            alt={aboutData.name}
            width={50}
            height={50}
            className="rounded"
          />
          <h2 className="text-2xl font-semibold text-center">
            Welcome to {aboutData.name}!
          </h2>
          <p className="text-center">
            Join us today and become part of our community dedicated to{" "}
            {aboutData.slogan}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <div className="text-destructive">{error}</div>}

          <Input
            label="First Name"
            {...register("first_name")}
            placeholder="Enter your first name"
            error={(errors.first_name?.message as string) || undefined}
          />

          <Input
            label="Last Name"
            {...register("last_name")}
            placeholder="Enter your last name"
            error={errors.last_name?.message as string | undefined}
          />

          <Input
            label="Email Address"
            type="email"
            {...register("email")}
            placeholder="Enter your email address"
            error={errors.email?.message as string | undefined}
          />

          <Input
            label="Password"
            type="password"
            {...register("password")}
            placeholder="Create a strong password"
            error={errors.password?.message as string | undefined}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          <p className="text-center text-sm">
            By signing up, you agree to our{" "}
            <Link href="/membership-agreement">Terms and Conditions</Link> and{" "}
            <Link href="/privacy-policy">Privacy Policy.</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
