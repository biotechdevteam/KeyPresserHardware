"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Error from "@/app/[locale]/error";
import Loader from "@/components/loader/Loader";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch about data
    const aboutData = await fetchAboutData();

    // Return data as props (no ISR)
    return {
      props: {
        aboutData,
        isError: false,
        error: null,
      },
    };
  } catch (error: any) {
    return {
      props: {
        aboutData: null,
        isError: true,
        error: error.message || "An unexpected error occurred.",
      },
    };
  }
};

const AboutIntro = ({
  aboutData,
  isError,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const introRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.1 }
    );

    if (introRef.current) {
      observer.observe(introRef.current);
    }

    return () => {
      if (introRef.current) {
        observer.unobserve(introRef.current);
      }
    };
  }, []);

  // Handle loading or error states
  if (isError) return <Error error={error} />;
  if (!aboutData) return <Loader />;

  return (
    <div ref={introRef}>
      {/* Name and Slogan Section */}
      <div className="text-center">
        <h1
          className={`text-2xl xl:text-4xl font-bold transition-all duration-500 ease-in-out ${
            isVisible ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          {aboutData.name}
        </h1>
        {aboutData.slogan && (
          <p
            className={`xl:text-lg transition-all duration-500 ease-in-out ${
              isVisible ? "animate-fadeInUp delay-100" : "opacity-0"
            }`}
          >
            {aboutData.slogan}
          </p>
        )}
      </div>

      {/* Cover Photo Section */}
      <div className="mt-16">
        {aboutData.cover_photo_url && (
          <Image
            src={aboutData.cover_photo_url}
            alt={aboutData.name}
            width={700}
            height={700}
            priority={true}
            className={`w-auto h-auto mx-auto object-cover rounded-lg transition-all duration-500 ease-in-out ${
              isVisible ? "animate-fadeIn" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* Story/Bio Section */}
      <div className="p-8 mt-2 text-center">
        {aboutData.history && (
          <>
            <h3
              className={`text-lg xl:text-4lg font-bold transition-all duration-500 ease-in-out ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              Our Story
            </h3>
            <p className="mt-2">{aboutData.history}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutIntro;
