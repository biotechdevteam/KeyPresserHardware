import Image from "next/image";
import logo from "@/assets/images/logo.png";

// Accept the pre-fetched initialData as a prop
const Loader: React.FC = () => {

  
  return (
    <div className="flex flex-col justify-center items-center h-screen animate-pulse bg-background text-foreground">
      <Image
        width={50}
        height={50}
        className="animate-spin"
        src={logo.src}
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