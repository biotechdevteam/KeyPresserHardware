import React from "react";
import { useTranslations } from "next-intl";
import AboutPic from "@/assets/images/about-header.jpg"; // Image for AboutHeader
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const AboutHeader = () => {
  const t = useTranslations("Header.about");

  return (
    <div className="relative h-[32vh] top-[64px] right-0 left-0 overflow-hidden">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Image with Aspect Ratio */}
      <AspectRatio ratio={16 / 9} className="relative z-0">
        <Image
          src={AboutPic}
          alt="About Us Header"
          className="rounded object-cover w-full"
        />
      </AspectRatio>

      {/* Text Section */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-variant font-bold">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl text-card">
          {t("description")}
        </p>
      </div>
    </div>
  );
};

export default AboutHeader;
