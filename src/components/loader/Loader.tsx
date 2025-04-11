import Image from "next/image";
import logo from "../../../public/images/logo.png";

interface LoaderProps {
  size?: "small" | "medium" | "large";
}

const Loader: React.FC<LoaderProps> = ({ size = "medium" }) => {
  // Map size prop to actual dimensions
  const dimensions = {
    small: 30,
    medium: 50,
    large: 70,
  };

  const logoSize = dimensions[size];
  const dotSize = size === "small" ? 3 : size === "large" ? 5 : 4;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-background/95 backdrop-blur-sm text-foreground">
      {/* Logo with improved animation */}
      <div className="relative">
        <Image
          width={logoSize}
          height={logoSize}
          className="animate-pulse"
          src={logo.src}
          alt="QuickPlay logo"
          priority
        />
      </div>

      {/* Loading animation dots with improved spacing and animation */}
      <div className="mt-8">
        <div className="flex space-x-3">
          {[0, 0.2, 0.4, 0.6].map((delay, index) => (
            <div
              key={index}
              className={`w-${dotSize} h-${dotSize} bg-primary rounded-full animate-bounce`}
              style={{
                animationDelay: `${delay}s`,
                width: `${dotSize * 4}px`,
                height: `${dotSize * 4}px`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
