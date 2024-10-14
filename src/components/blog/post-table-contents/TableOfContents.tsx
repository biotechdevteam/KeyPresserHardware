import React, { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"; // Shadcn Collapsible components
import { Button } from "@/components/ui/button"; // Shadcn button
import { ChevronDown, ChevronRight, Menu } from "lucide-react"; // Lucide icons
import { ScrollArea } from "@/components/ui/scroll-area"; // Shadcn ScrollArea for desktop sidebar

interface TableOfContentsProps {
  sections: {
    id: string;
    label: string;
    subSections?: { id: string; label: string }[];
  }[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubSections, setOpenSubSections] = useState<{
    [key: string]: boolean;
  }>({});
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Update the currentId based on the current location hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // remove the '#' symbol
      const element = document.getElementById(hash);

      if (element) {
        const headerOffset = 70; // Adjust this value based on your header height
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        setCurrentId(hash);
      }
    };

    handleHashChange(); // Update on initial load
    window.addEventListener("hashchange", handleHashChange); // Update when hash changes

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const toggleSubSection = (sectionId: string) => {
    setOpenSubSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Only display subsections of "Post Content"
  const postContentSection = sections.find(
    (section) => section.label === "Post Content"
  );

  return (
    <nav>
      {/* Mobile view: Collapsible Menu for TOC */}
      <div className="block lg:hidden my-5">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <h2 className="text-lg font-bold text-foreground mb-4">
            In This Article
          </h2>
          <div className="w-full p-5">
            {postContentSection && postContentSection.subSections && (
              <ul>
                {postContentSection.subSections.map((subSection) => (
                  <li key={subSection.id} className="py-2">
                    <div className="flex justify-between items-center">
                      <a
                        href={`#${subSection.id}`}
                        className={`block ${
                          currentId === subSection.id
                            ? "text-primary font-semibold"
                            : "text-foreground"
                        }`}
                      >
                        {subSection.label}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Collapsible>
      </div>

      {/* Desktop view: Sidebar TOC */}
      <div className="hidden lg:block lg:w-64 lg:fixed lg:top-20 lg:left-0 lg:h-screen">
        <ScrollArea className="h-full p-4 border-r border-border bg-background shadow-lg">
          <h2 className="text-lg font-bold mb-4 text-foreground">
            Table of Contents
          </h2>
          <ul className="space-y-3">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`block font-medium py-2 ${
                    currentId === section.id
                      ? "text-primary font-semibold"
                      : "text-foreground"
                  }`}
                >
                  {section.label}
                </a>
                {section.subSections && (
                  <ul className="ml-4 space-y-2">
                    {section.subSections.map((subSection) => (
                      <li key={subSection.id}>
                        <a
                          href={`#${subSection.id}`}
                          className={`block py-1 ${
                            currentId === subSection.id
                              ? "text-primary font-semibold"
                              : "text-foreground"
                          }`}
                        >
                          {subSection.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </nav>
  );
};

export default TableOfContents;
