import React, { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"; // Shadcn Collapsible components
import { ChevronDown, ChevronRight } from "lucide-react"; // Lucide icons

interface ContentsProps {
  sections: {
    id: string;
    label: string;
    subSections?: { id: string; label: string }[];
  }[];
}

const Contents: React.FC<ContentsProps> = ({ sections }) => {
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
    <nav className="max-w-4xl mx-auto mt-6 p-6">
      {/* Mobile view: Collapsible Menu for TOC */}
      <div className="block my-5">
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
                            ? "text-secondary font-semibold"
                            : "text-primary"
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
    </nav>
  );
};

export default Contents;
