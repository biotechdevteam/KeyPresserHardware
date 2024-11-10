"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/lib/useAuth";
import useImgbb from "@/lib/useImgBB"; // Import the custom useImgbb hook
import { z } from "zod";

// Define the schema directly in the component using zod
const signupSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: "First name is required" })
    .max(100, { message: "First name is too long" }),
  last_name: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(100, { message: "Last name is too long" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email is too long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password is too long" }),
  imageUrl: z
    .string()
    .min(1, { message: "Email is required" })
    .url({ message: "Please provide a valid image URL" })
    .optional(), // Make imageUrl optional, since it's only available after the image upload
});

const SignUpForm = ({ onClose }: { onClose: () => void }) => {
  const { signUp, error, loading } = useAuth();
  const {
    imageUrl,
    loading: imgLoading,
    error: imgError,
    uploadImage,
  } = useImgbb();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: any) => {
    console.log("Form Submitted: ", data);
    console.log("Image URL: ", imageUrl); // Check if image URL is correct

    // Ensure image URL is available before attempting to sign up
    if (!imageUrl) {
      console.error("No image uploaded");
      return;
    }

    try {
      const success = await signUp(
        data.email,
        data.password,
        data.first_name,
        data.last_name,
        "member",
        imageUrl // Pass the uploaded image URL
      );

      if (success) onClose();
    } catch (err) {
      console.error("SignUp Error: ", err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file); // Upload image when a file is selected
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Display authentication or image upload errors */}
      {error && <div className="text-red-500">{error}</div>}
      {imgError && <div className="text-red-500">{imgError}</div>}

      <Input
        label="First Name"
        {...register("first_name")}
        error={(errors.first_name?.message as string) || undefined}
      />
      <Input
        label="Last Name"
        {...register("last_name")}
        error={(errors.last_name?.message as string) || undefined}
      />
      <Input
        label="Email"
        {...register("email")}
        error={(errors.email?.message as string) || undefined}
      />
      <Input
        label="Password"
        type="password"
        {...register("password")}
        error={(errors.password?.message as string) || undefined}
      />

      {/* Profile Photo Input */}
      <div>
        <label className="block text-sm font-medium">Profile Photo</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imgLoading && <p>Uploading image...</p>}
        {imageUrl && (
          <div>
            <img
              src={imageUrl}
              alt="Profile Preview"
              className="h-20 w-20 object-cover mt-2"
            />
          </div>
        )}
      </div>

      <Button type="submit" disabled={loading || imgLoading}>
        {loading
          ? "Signing Up..."
          : imgLoading
          ? "Uploading Image..."
          : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignUpForm;
