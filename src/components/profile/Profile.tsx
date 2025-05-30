import React from "react";
import { Member } from "@/types/memberSchema";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Linkedin,
  Globe,
  FileText,
  MapPin,
  Instagram,
  Github,
} from "lucide-react";
import { Applicant } from "@/types/applicant";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/useAuth";

interface ProfileProps {
  profile: Member | Applicant;
}

// Function to get the appropriate icon based on the platform
const getSocialIcon = (url: string) => {
  if (url.includes("facebook.com"))
    return <Facebook className="w-5 h-5 text-secondary" />;
  if (url.includes("twitter.com"))
    return <Twitter className="w-5 h-5 text-secondary" />;
  if (url.includes("instagram.com"))
    return <Instagram className="w-5 h-5 text-secondary" />;
  if (url.includes("github.com"))
    return <Github className="w-5 h-5 text-secondary" />;
  if (url.includes("linkedin.com"))
    return <Linkedin className="w-5 h-5 text-secondary" />;
  return <Globe className="w-5 h-5 text-secondary" />;
};

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  const { signOut } = useAuth(); // Use the `signOut` function from the store
  const router = useRouter();

  const handleSignOut = () => {
    signOut(); // Call the sign-out function
    alert("Please log in again to create your member profile.");
    router.push("/auth/signin"); // Redirect to the sign-in page
  };

  const isMember = "specialization" in profile;
  const isApplicant = "specialization_area" in profile;

  return (
    <Card className="max-w-3xl mx-auto p-6 shadow-lg rounded-lg bg-card text-card-foreground">
      {isMember ? (
        <>
          <CardHeader className="flex items-center gap-4">
            {/* Profile Avatar */}
            <Avatar>
              <AvatarImage
                src={profile.profile_photo_url}
                alt={`${profile.user.first_name} ${profile.user.last_name}`}
              />
              <AvatarFallback>
                {profile.user.first_name[0]}
                {profile.user.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-semibold">
                {profile.user.first_name} {profile.user.last_name}
              </CardTitle>
              <CardDescription>
                {profile.specialization || "No specialization"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="mt-6 space-y-6">
            {/* Bio */}
            <div>
              <h3 className="text-lg font-semibold">Bio</h3>
              <p>{profile.bio || "No bio provided"}</p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold">Skills</h3>
              {profile.skills?.length ? (
                <ul className="list-disc ml-5">
                  {profile.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              ) : (
                <p>No skills provided</p>
              )}
            </div>

            {/* Interests */}
            <div>
              <h3 className="text-lg font-semibold">Interests</h3>
              {profile.interests?.length ? (
                <ul className="list-disc ml-5">
                  {profile.interests.map((interest, index) => (
                    <li key={index}>{interest}</li>
                  ))}
                </ul>
              ) : (
                <p>No interests provided</p>
              )}
            </div>

            {/* Address */}
            <div className="flex items-center gap-2">
              <MapPin />
              <span>{profile.address || "No address provided"}</span>
            </div>

            {/* Resume */}
            <div className="flex items-center gap-2">
              <FileText />
              {profile.resume_url ? (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  View Resume
                </a>
              ) : (
                <span>No resume uploaded</span>
              )}
            </div>

            {/* Social Links */}
            {profile.social_links?.length ? (
              <div className="flex items-center gap-4 mt-6">
                {profile.social_links.map((link, index) => (
                  <Button key={index} variant="outline" asChild>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {getSocialIcon(link)}
                    </a>
                  </Button>
                ))}
              </div>
            ) : (
              <p>No social links provided</p>
            )}
          </CardContent>
        </>
      ) : isApplicant ? (
        <>
          <CardHeader className="flex items-center gap-4">
            {/* Profile Avatar */}
            <Avatar>
              <AvatarImage
                src={profile.profile_photo_url as string}
                alt={`${profile.user.first_name} ${profile.user.last_name}`}
              />
              <AvatarFallback>
                {profile.user.first_name[0]}
                {profile.user.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-semibold">
                {profile.user.first_name} {profile.user.last_name}
              </CardTitle>
              <CardDescription className="flex gap-1">
                Application Status:
                <div
                  className={
                    profile.application_status === "pending"
                      ? "text-yellow-500"
                      : profile.application_status === "approved"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {profile.application_status.toLocaleUpperCase()}
                </div>
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="mt-6 space-y-6">
            {/* Motivation Letter */}
            <div>
              <h3 className="text-lg font-semibold">Motivation Letter</h3>
              <p>{profile.motivation_letter}</p>
            </div>

            {/* Specialization Area */}
            <div>
              <h3 className="text-lg font-semibold">Specialization Area</h3>
              <p>
                {profile.specialization_area ||
                  "No specialization area provided"}
              </p>
            </div>

            {/* Resume */}
            <div className="flex items-center gap-2">
              <FileText />
              {profile.resume_url ? (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  View Resume
                </a>
              ) : (
                <span>No resume uploaded</span>
              )}
            </div>

            {/* Referred By */}
            {profile.referredByMember && (
              <div>
                <h3 className="text-lg font-semibold">Referred By</h3>
                <p>
                  {profile.referredByMember.user.first_name}{" "}
                  {profile.referredByMember.user.last_name}
                </p>
              </div>
            )}

            {profile.application_status === "approved" && (
              <div className="mt-6">
                <p className="text-green-500 font-semibold">
                  Your application has been approved! Please log in again to
                  create your member profile.
                </p>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="mt-4"
                >
                  Sign Out and Log In Again
                </Button>
              </div>
            )}
          </CardContent>
        </>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default Profile;
