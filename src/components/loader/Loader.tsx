import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchAboutData } from "@/lib/fetchUtils";

// Accept the pre-fetched initialData as a prop
const Loader: React.FC<{ initialData: any }> = ({ initialData }) => {
  const {
    data: aboutData,
  } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    initialData,
    staleTime: Infinity,
  });
  
  return (
    <div className="flex flex-col justify-center items-center h-screen animate-pulse bg-background text-foreground">
      <Image
        width={50}
        height={50}
        className="animate-spin"
        src={aboutData.logo_url}
        alt="QuickPay-logo"
      />

      <div className="absolute top-[80%]">
        <div className="flex space-x-2 animate-pulse">
          <div
            className="w-4 h-4 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-4 h-4 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-4 h-4 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
          <div
            className="w-4 h-4 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0.6s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Loader