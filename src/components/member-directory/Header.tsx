import Link from "next/link";
import { ReactNode } from "react";

interface HeadingDashboardProps {
  children: ReactNode;
  path?: string;
}

const HeadingDashboard: React.FC<HeadingDashboardProps> = ({
  children,
  path,
}) => {
  return (
    <div
      className={`mb-6 pb-5 border-b-2 border-border dark:border-muted-foreground ${
        path ? "flex items-center justify-between gap-2 flex-wrap" : ""
      }`}
    >
      <h2 className="text-2xl font-bold text-foreground dark:text-muted">
        {children}
      </h2>
      {path && (
        <Link
          href={path}
          className="text-muted dark:text-muted-foreground hover:text-primary dark:hover:text-primary leading-[1.8]"
        >
          See More...
        </Link>
      )}
    </div>
  );
};

export default HeadingDashboard;
