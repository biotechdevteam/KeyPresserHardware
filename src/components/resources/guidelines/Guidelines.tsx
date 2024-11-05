import { Download } from "lucide-react";
import React from "react";

// Sample guidelines data
const guidelines = [
  {
    id: 1,
    title: "Laboratory Safety Guidelines",
    summary:
      "Best practices for maintaining safety in biotechnology laboratories.",
    publicationDate: "2024-03-10",
    fileUrl: "/guidelines/laboratory-safety-2024.pdf",
  },
  {
    id: 2,
    title: "Biotechnology Research Standards",
    summary:
      "Standards and protocols for conducting biotechnology research ethically and efficiently.",
    publicationDate: "2023-09-05",
    fileUrl: "/guidelines/biotech-research-standards-2023.pdf",
  },
];

const Guidelines: React.FC = () => {
  return (
    <div className="p-8 mx-auto max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Guidelines</h1>
        <p className="text-lg mt-4">
          Access essential guidelines and protocols for biotechnology practices.
        </p>
      </header>

      <div className="space-y-6">
        {guidelines.map((guideline) => (
          <div
            key={guideline.id}
            className="p-4 border rounded-lg shadow-lg bg-card"
          >
            <div className="items-center">
              <div>
                <h3 className="text-2xl font-semibold">{guideline.title}</h3>
                <p className="mt-2">{guideline.summary}</p>
                <p className="text-sm mt-1">
                  Published on:{" "}
                  {new Date(guideline.publicationDate).toLocaleDateString()}
                </p>
              </div>
              <a
                href={guideline.fileUrl}
                download
                className="flex items-center space-x-2 mt-2 hover:underline"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guidelines;
