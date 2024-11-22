import React, { useState } from "react";
import Link from "next/link";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface HeadingDashboardProps {
  children: React.ReactNode;
  path?: string;
  tabs?: Tab[];
}

const HeadingDashboard: React.FC<HeadingDashboardProps> = ({
  children,
  path,
  tabs,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div
      className={`mb-6 pb-5 ${
        !tabs ? " border-b-2 border-border dark:border-muted-foreground " : " "
      } `}
    >
      {/* Render the title and optional path link */}
      <div
        className={`${
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

      {/* Render tabs if they exist */}
      {tabs && tabs.length > 0 && (
        <div className="mt-4">
          <div className="flex gap-4 border-b-2 border-border dark:border-muted-foreground pb-3">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`px-4 py-2 font-semibold ${
                  activeTab === index
                    ? "text-muted-foreground border-b-2 border-primary"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-6">{tabs[activeTab].content}</div>
        </div>
      )}
    </div>
  );
};

export default HeadingDashboard;
