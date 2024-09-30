import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useTranslations } from "next-intl";
import HeaderImg from "@/assets/images/events-header.jpg";

const EventsHeader = () => {
  const t = useTranslations("Header.events");

  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
        // style={`background-image: url(${HeaderImg})`}
      >
        <AspectRatio>
          <Image src={HeaderImg} alt="Events" className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat" />
        </AspectRatio>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70"></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-4 py-16 text-white">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-lg">{t("description")}</p>
      </div>
    </div>
  );
};

export default EventsHeader;
