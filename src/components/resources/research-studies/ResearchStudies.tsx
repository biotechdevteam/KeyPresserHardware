import { Download } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// Sample research studies data
const researchStudies = [
  {
    id: 1,
    title: "Advances in Genetic Engineering",
    abstract: "A comprehensive review of recent advancements in genetic engineering and its implications in medical research.",
    publicationDate: "2023-05-10",
    fileUrl: "/research/advances-in-genetic-engineering.pdf",
  },
  {
    id: 2,
    title: "Biotechnology and Sustainable Agriculture",
    abstract: "Exploring the role of biotechnology in promoting sustainable agriculture practices globally.",
    publicationDate: "2023-08-15",
    fileUrl: "/research/biotech-sustainable-agriculture.pdf",
  },
];

const ResearchStudies: React.FC = () => {
  return (
    <div className="p-8 mx-auto max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Research Studies</h1>
        <p className="text-lg mt-4">
          Discover our latest research studies covering a range of topics in biotechnology and related fields.
        </p>
      </header>

      <div className="space-y-6">
        {researchStudies.map((study) => (
          <div key={study.id} className="p-4 border rounded-lg shadow-lg bg-card">
            <div className="items-center">
              <div>
                <h3 className="text-2xl font-semibold">{study.title}</h3>
                <p className="mt-2">{study.abstract}</p>
                <p className="text-sm mt-1">Published on: {new Date(study.publicationDate).toLocaleDateString()}</p>
              </div>
              <Link
                href={study.fileUrl}
                download
                className="flex items-center space-x-2 mt-2 hover:underline"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchStudies;
