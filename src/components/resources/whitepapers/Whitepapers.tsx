import { Download } from "lucide-react";
import Link from "next/link";
import React from "react";

// Example whitepaper data
const whitepapers = [
  {
    id: 1,
    title: "2024 Industry Trends",
    description:
      "Insights into this year’s major industry trends and predictions.",
    fileUrl: "/whitepapers/2024-industry-trends.pdf",
  },
  {
    id: 2,
    title: "Sustainable Practices in Biotech",
    description:
      "A detailed look at sustainable approaches within the biotech industry.",
    fileUrl: "/whitepapers/sustainable-practices.pdf",
  },
  {
    id: 1,
    title: "The Future of Biotechnology",
    description:
      "Exploring emerging trends and technologies in biotechnology for the next decade.",
    fileUrl: "/whitepapers/future-of-biotechnology.pdf",
  },
  {
    id: 2,
    title: "Genomics and Health",
    description:
      "An in-depth analysis of how genomics is transforming healthcare.",
    fileUrl: "/whitepapers/genomics-and-health.pdf",
  },
];

const WhitePapers: React.FC = () => {
  return (
    <div className="p-8 mx-auto max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Our Whitepapers</h1>
        <p className="text-lg mt-4">
          Download our whitepapers to gain insights into the latest research,
          innovations, and trends in biotechnology.
        </p>
      </header>

      <div className="space-y-6">
        {whitepapers.map((whitepaper) => (
          <div
            key={whitepaper.id}
            className="p-4 border rounded-lg shadow-lg bg-card flex items-center justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold">{whitepaper.title}</h3>
              <p className="mt-2">{whitepaper.description}</p>
            </div>
            <Link
              href={whitepaper.fileUrl}
              download
              className="flex items-center space-x-2 mt-2 hover:underline"
            >
              <Download className="w-5 h-5" />
              <span>Download</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhitePapers;
