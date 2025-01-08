import Image from "next/image";
import logo from "../../../public/images/logo.png";

// Loader Component
const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-background text-foreground">
      {/* Logo */}
      <Image
        width={50}
        height={50}
        className="animate-pulse"
        src={logo.src}
        alt="QuickPlay-logo"
      />

      {/* Loading animation dots */}
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
};

export default Loader;
