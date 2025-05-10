"use client"

import { useEffect } from "react";
import useAuth from "@/lib/useAuth";
import { Loader2 } from "lucide-react";

// Define the expected shape of a member profile
type UserId = {
  email: string;
  first_name: string;
  last_name: string;
};

type MemberProfile = {
  user_id: UserId;
  bio?: string;
  skills?: string[];
  interests?: string[];
  specialization?: string;
  address?: string;
  resume_url?: string;
  social_links?: string[];
  role?: string;
};

// Type guard to check if the profile is a MemberProfile
function isMemberProfile(profile: any): profile is MemberProfile {
  return (
    profile &&
    typeof profile === "object" &&
    profile.user_id &&
    typeof profile.user_id === "object" &&
    "first_name" in profile.user_id &&
    "last_name" in profile.user_id &&
    "email" in profile.user_id
  );
}

export default function MemberSipPage() {
  const { profile, getProfile, loading, error } = useAuth();

  useEffect(() => {
    if (!profile) {
      getProfile();
    }
  }, [profile, getProfile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-yellow-700">
        <Loader2 className="animate-spin mr-2" />
        Loading your profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center mt-10">
        <p>❌ {error}</p>
      </div>
    );
  }

  if (!profile || !isMemberProfile(profile)) {
    return (
      <div className="text-center mt-10 text-gray-500">
        <p>
          Member profile not found. Please ensure you’ve completed registration.
        </p>
      </div>
    );
  }

  const {
    user_id,
    bio,
    skills,
    interests,
    specialization,
    address,
    resume_url,
    social_links,
    role,
  } = profile;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">👤 Member Profile</h1>

      <div className="space-y-4 text-sm">
        <div>
          <strong>Full Name:</strong> {user_id.first_name} {user_id.last_name}
        </div>
        <div>
          <strong>Email:</strong> {user_id.email}
        </div>
        {role && (
          <div>
            <strong>Role:</strong> {role}
          </div>
        )}
        {specialization && (
          <div>
            <strong>Specialization:</strong> {specialization}
          </div>
        )}
        {bio && (
          <div>
            <strong>Bio:</strong> {bio}
          </div>
        )}
        {address && (
          <div>
            <strong>Address:</strong> {address}
          </div>
        )}
        {resume_url && (
          <div>
            <strong>Resume:</strong>{" "}
            <a
              href={resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Resume
            </a>
          </div>
        )}
        {Array.isArray(skills) && skills.length > 0 && (
          <div>
            <strong>Skills:</strong> {skills.join(", ")}
          </div>
        )}

        {Array.isArray(interests) && interests.length > 0 && (
          <div>
            <strong>Interests:</strong> {interests.join(", ")}
          </div>
        )}

        {Array.isArray(social_links) && social_links.length > 0 && (
          <div>
            <strong>Social Links:</strong>
            <ul className="list-disc list-inside space-y-1">
              {social_links.map((link: string, index: number) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
