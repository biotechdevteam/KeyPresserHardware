import { Download } from "lucide-react";
import React from "react";

// Sample industry reports data
const industryReports = [
  {
    id: 1,
    title: "Global Biotechnology Market Analysis 2024",
    summary:
      "An in-depth analysis of the global biotechnology market, covering key trends, drivers, and forecasted growth.",
    publicationDate: "2024-02-15",
    fileUrl: "/reports/global-biotech-market-analysis-2024.pdf",
  },
  {
    id: 2,
    title: "Biotechnology in Agriculture: Emerging Trends",
    summary:
      "A report highlighting the latest biotechnology innovations and their applications in sustainable agriculture.",
    publicationDate: "2023-11-03",
    fileUrl: "/reports/biotech-agriculture-trends-2023.pdf",
  },
];

const IndustryReports: React.FC = () => {
  return (
    <div className="p-8 mx-auto max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Industry Reports</h1>
        <p className="text-lg mt-4">
          Explore detailed reports on biotechnology industry trends, market
          insights, and more.
        </p>
      </header>

      <div className="space-y-6">
        {industryReports.map((report) => (
          <div
            key={report.id}
            className="p-4 border rounded-lg shadow-lg bg-card"
          >
            <div className="items-center">
              <div>
                <h3 className="text-2xl font-semibold">{report.title}</h3>
                <p className="mt-2">{report.summary}</p>
                <p className="text-sm mt-1">
                  Published on:{" "}
                  {new Date(report.publicationDate).toLocaleDateString()}
                </p>
              </div>
              <a
                href={report.fileUrl}
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

export default IndustryReports;
