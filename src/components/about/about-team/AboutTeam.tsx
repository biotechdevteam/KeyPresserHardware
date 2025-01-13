"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  LinkedinIcon,
  GithubIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  DribbbleIcon,
} from "lucide-react";
import { LeadershipTeam } from "@/types/aboutSchema";
import { useTransitionRouter } from "next-view-transitions";
import Image from "next/image";
import PlaceholderImg from "../../../../public/images/Profile_placeholder.png";
import Link from "next/link";
import Loader from "@/components/loader/Loader";
import Error from "@/app/[locale]/error";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { slideInOut } from "@/lib/utils/pageTransitions";

// Incremental Static Regeneration: Fetch about data
export const getStaticProps: GetStaticProps = async () => {
  try {
    const aboutData = await fetchAboutData();

    return {
      props: {
        aboutData,
        isError: false,
        error: null,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error: any) {
    return {
      props: {
        aboutData: null,
        isError: true,
        error: error.message || "An unexpected error occurred.",
      },
      revalidate: 60,
    };
  }
};

// Helper function to render the appropriate icon
const getSocialIcon = (url: string) => {
  if (url.includes("linkedin.com")) {
    return <LinkedinIcon className="w-5 h-5" />;
  }
  if (url.includes("facebook.com")) {
    return <FacebookIcon className="w-5 h-5" />;
  }
  if (url.includes("instagram.com")) {
    return <InstagramIcon className="w-5 h-5" />;
  }
  if (url.includes("twitter.com")) {
    return <TwitterIcon className="w-5 h-5" />;
  }
  if (url.includes("github.com")) {
    return <GithubIcon className="w-5 h-5" />;
  }
  if (url.includes("dribble.com")) {
    return <DribbbleIcon className="w-5 h-5" />;
  }
  return null; // If no match, return null
};

const AboutTeam = ({
  aboutData,
  isError,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isVisible, setIsVisible] = useState(false);
  const teamRef = useRef<HTMLDivElement | null>(null);

  const router = useTransitionRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the component is visible
    );

    if (teamRef.current) {
      observer.observe(teamRef.current);
    }

    return () => {
      if (teamRef.current) {
        observer.unobserve(teamRef.current);
      }
    };
  }, []);

  // Handle loading or error states
  if (isError) return <Error error={error} />;
  if (!aboutData) return <Loader />;

  return (
    <div className="py-12" ref={teamRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-center items-center gap-8 lg:px-24">
        {aboutData.leadershipTeam?.map(
          (leader: LeadershipTeam, index: number) => {
            const { member } = leader;

            // Ensure user_id and member exist
            if (!member || !member.user_id) {
              return null; // Skip rendering if any critical data is missing
            }

            return (
              <Card
                key={index}
                className={` rounded-lg shadow-lg hover:shadow-2xl transition-shadow bg-card ${
                  isVisible ? "animate-spinCard" : "opacity-0"
                }`}
                onClick={() =>
                  router.push(`/members/${leader.member._id}`, {
                    onTransitionReady: slideInOut,
                  })
                } // Redirect to the member profile page
              >
                <CardHeader className="relative">
                  <Image
                    src={
                      member?.user_id.profile_photo_url || PlaceholderImg.src
                    }
                    width={100}
                    height={100}
                    alt={`${member.user_id.first_name} ${member.user_id.last_name}`}
                    className="mx-auto object-cover rounded-full"
                  />
                </CardHeader>

                <CardContent className="p-2">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {`${member.user_id.first_name} ${member.user_id.last_name}`}
                  </CardTitle>
                  <p className="text-xs uppercase">
                    {member.specialization || null}
                  </p>
                  <p className="m-4">{member.bio || null}</p>
                </CardContent>

                <CardFooter className="flex justify-center space-x-4 p-4">
                  {member.social_links?.map((link: string, i: number) => (
                    <Link
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform transform hover:scale-110"
                    >
                      {getSocialIcon(link)}
                    </Link>
                  ))}
                </CardFooter>
              </Card>
            );
          }
        )}
      </div>
    </div>
  );
};

export default AboutTeam;
