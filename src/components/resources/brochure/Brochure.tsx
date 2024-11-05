import { Download } from "lucide-react";
import Link from "next/link";
import React from "react";

// Example brochure data
const brochures = [
  {
    id: 1,
    title: "Annual Report 2024",
    description: "An overview of our yearly activities and achievements.",
    fileUrl: "/brochures/annual-report-2024.pdf",
  },
  {
    id: 2,
    title: "Membership Benefits",
    description: "Detailed information on the benefits of becoming a member.",
    fileUrl: "/brochures/membership-benefits.pdf",
  },
];

const Brochure: React.FC = () => {
  return (
    <div className="p-8 mx-auto max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Our Brochures</h1>
        <p className="text-lg mt-4">
          Browse and download our latest brochures for more information on our
          activities, reports, and membership benefits.
        </p>
      </header>

      <div className="space-y-6">
        {brochures.map((brochure) => (
          <div
            key={brochure.id}
            className="p-4 border rounded-lg shadow-lg bg-card flex items-center justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold">{brochure.title}</h3>
              <p className="mt-2">{brochure.description}</p>
            </div>
            <Link
              href={brochure.fileUrl}
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

export default Brochure;
