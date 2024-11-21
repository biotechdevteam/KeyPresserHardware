"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/lib/useAuth";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Member } from "@/types/memberSchema";
import { Applicant } from "@/types/applicant";

// Define schema for the member form
const profileSchema = z.object({
  bio: z.string().min(5, "Bio must be at least 5 characters"),
  skills: z.array(z.string().min(1, "Skills are required")),
  interests: z.array(z.string().min(1, "Interests are required")),
  specialization: z.string().min(3, "Specialization is required"),
  address: z.string().min(5, "Address is required"),
  socialLinks: z.array(z.string().url("Please enter a valid URL")).optional(),
  resumeUrl: z.string().url("Please enter a valid URL"),
});

type ProfileFormSchema = z.infer<typeof profileSchema>;

const specializationOptions = [
  "Biotechnology",
  "Bioinformatics",
  "Genetics",
  "Data Science",
  "Other",
];

const socialPlatforms = [
  { name: "LinkedIn", icon: <Linkedin /> },
  { name: "Facebook", icon: <Facebook /> },
  { name: "Twitter", icon: <Twitter /> },
  { name: "Instagram", icon: <Instagram /> },
  { name: "GitHub", icon: <Github /> },
];

const predefinedSkills = [
  "Python",
  "JavaScript",
  "Data Analysis",
  "Machine Learning",
  "React",
  "Bioinformatics",
  "Genomics",
  "Data Science",
  "AI",
];

const predefinedInterests = [
  "Genomics",
  "CRISPR",
  "Microbiology",
  "Biotechnology",
  "Data Visualization",
  "AI Ethics",
  "Climate Change",
  "Healthcare",
  "Drug Discovery",
];

const ProfileForm = () => {
  const { profile, getProfile, createProfile, updateProfile, loading, error } =
    useAuth(); // Assume `profile` is a `Member` type

  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showOtherSpecialization, setShowOtherSpecialization] = useState(false);

  const isMember = (profile: Member | Applicant): profile is Member => {
    return "bio" in profile;
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: "",
      skills: [],
      interests: [],
      specialization: "",
      address: "",
      socialLinks: [],
      resumeUrl: "",
    },
  });

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile && isMember(profile)) {
      setValue("bio", profile.bio || "");
      setSkills(profile.skills || []);
      setInterests(profile.interests || []);
      setValue("specialization", profile.specialization || "");
      setValue("address", profile.address || "");
      setValue("socialLinks", profile.social_links || []);
      setValue("resumeUrl", profile.resume_url || "");
    }
  }, [profile, setValue]);

  const handleAddSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) setSkills([...skills, skill]);
  };

  const handleAddInterest = (interest: string) => {
    if (interest && !interests.includes(interest))
      setInterests([...interests, interest]);
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const onSubmit = async (data: ProfileFormSchema) => {
    const payload = {
      ...data,
      skills,
      interests,
    };

    if (profile) {
      await updateProfile(
        profile._id,
        data.bio,
        skills,
        interests,
        data.specialization,
        data.address,
        data.socialLinks || [],
        data.resumeUrl
      );
    } else {
      await createProfile(
        data.bio,
        skills,
        interests,
        data.specialization,
        data.address,
        data.socialLinks || [],
        data.resumeUrl
      );
    }

    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 max-w-lg mx-auto"
    >
      {error && <div className="text-red-500">{error}</div>}
      {successMessage && <div className="text-green-600">{successMessage}</div>}

      {/* Bio */}
      <label>Bio</label>
      <Textarea {...register("bio")} placeholder="Tell us about yourself" />
      {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}

      {/* Skills */}
      <label>Skills</label>
      <div className="flex gap-2 flex-wrap">
        {predefinedSkills.map((skill) => (
          <Button
            key={skill}
            onClick={() => handleAddSkill(skill)}
            className={skills.includes(skill) ? "bg-blue-500 text-white" : ""}
          >
            {skill}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        {skills.map((skill) => (
          <span key={skill} className="tag">
            {skill} <button onClick={() => handleRemoveSkill(skill)}>x</button>
          </span>
        ))}
      </div>

      {/* Interests */}
      <label>Interests</label>
      <div className="flex gap-2 flex-wrap">
        {predefinedInterests.map((interest) => (
          <Button
            key={interest}
            onClick={() => handleAddInterest(interest)}
            className={
              interests.includes(interest) ? "bg-blue-500 text-white" : ""
            }
          >
            {interest}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        {interests.map((interest) => (
          <span key={interest} className="tag">
            {interest}{" "}
            <button onClick={() => handleRemoveInterest(interest)}>x</button>
          </span>
        ))}
      </div>

      {/* Specialization */}
      <label>Specialization</label>
      <div className="flex gap-4">
        {specializationOptions.map((option) => (
          <Button
            key={option}
            type="button"
            onClick={() => {
              setValue("specialization", option);
              setShowOtherSpecialization(option === "Other");
            }}
          >
            {option}
          </Button>
        ))}
      </div>
      {showOtherSpecialization && (
        <Input
          {...register("specialization")}
          placeholder="Specify your specialization"
        />
      )}
      {errors.specialization && (
        <p className="text-red-500">{errors.specialization.message}</p>
      )}

      {/* Address */}
      <label>Address</label>
      <Input {...register("address")} placeholder="Your address" />

      {/* Social Links */}
      <label>Social Links</label>
      {socialPlatforms.map((platform, index) => (
        <div key={platform.name} className="flex items-center gap-2">
          {platform.icon}
          <Input
            {...register(`socialLinks.${index}`)}
            placeholder={`https://${platform.name.toLowerCase()}.com/user`}
          />
        </div>
      ))}
      {errors.socialLinks && (
        <p className="text-red-500">{errors.socialLinks.message}</p>
      )}

      {/* Resume URL */}
      <label>Resume URL</label>
      <Input {...register("resumeUrl")} placeholder="https://yourresume.com" />
      {errors.resumeUrl && (
        <p className="text-red-500">{errors.resumeUrl.message}</p>
      )}

      {/* Submit Button */}
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : profile ? "Update Profile" : "Create Profile"}
      </Button>
    </form>
  );
};

export default ProfileForm;
