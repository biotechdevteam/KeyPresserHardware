import React from "react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { About } from "@/types/aboutSchema";
import Link from "next/link";

const MembershipQualifications: React.FC<{ aboutData: About }> = ({
  aboutData,
}) => {
  return (
    <div className="container mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold">
          Membership Qualifications
        </h1>
        <Separator className="w-24 mx-auto mt-4" />
        <p className="mt-4 text-lg">
          Join a community of innovators driving the future of biotechnology. To
          ensure our members contribute to and benefit from our network, we have
          specific membership qualifications that applicants must meet.
        </p>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">General Qualifications</h2>
        <p className="mb-4">
          At {aboutData.name}, we welcome individuals and organizations who are
          passionate about biotechnology and committed to its advancement. To
          become a member, you must meet one or more of the following criteria:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Academic Background:</strong> Possess a degree (BSc, MSc,
            PhD) in Biotechnology, Biochemistry, Molecular Biology, Genetics,
            Bioinformatics, or any related life sciences field.
          </li>
          <li>
            <strong>Professional Experience:</strong> Individuals working in
            biotechnology, pharmaceuticals, agriculture, healthcare, or any
            related industry with a minimum of 2 years of experience.
          </li>
          <li>
            <strong>Institutional Membership:</strong> Universities, research
            institutes, and organizations working in biotechnology or life
            sciences are encouraged to apply.
          </li>
        </ul>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Documentation Required</h2>
        <p className="mb-4">
          When applying for membership, please be ready to submit the following
          documents:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Academic Transcripts</strong> or proof of current enrollment
            for student members.
          </li>
          <li>
            <strong>Professional Resume or CV</strong> outlining relevant work
            experience and contributions.
          </li>
          <li>
            <strong>Letter of Recommendation</strong> from a current member
            (optional) or a professional reference in the biotechnology sector.
          </li>
        </ul>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Membership Tiers</h2>
        <p className="mb-4">
          We offer different membership tiers based on your professional
          background and experience. These include:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Student Membership:</strong> Open to undergraduates,
            postgraduates, and PhD candidates.
          </li>
          <li>
            <strong>Professional Membership:</strong> For individuals working in
            the biotech field with 2+ years of experience.
          </li>
          <li>
            <strong>Institutional Membership:</strong> For organizations such as
            universities, biotech companies, and research centers.
          </li>
        </ul>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Code of Conduct</h2>
        <p className="mb-4">
          {aboutData.name} is a professional association that values ethical
          behavior and mutual respect among its members. All applicants are
          required to adhere to our <strong>Code of Conduct</strong>, which
          promotes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Integrity in research and biotechnology practices.</li>
          <li>Respect for intellectual property rights.</li>
          <li>
            Commitment to advancing the biotech industry and sharing knowledge
            with fellow members.
          </li>
        </ul>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">How to Apply</h2>
        <p>
          Interested in becoming a member? Simply fill out our{" "}
          <Link href="/membership/application-form" className="underline">
            Membership Application Form
          </Link>{" "}
          and attach your required documents. Once submitted, our team will
          review your application, and you will be notified within 14 business
          days.
        </p>
        <p className="mt-4">
          <strong>
            For any further inquiries about membership, please contact us at:
          </strong>{" "}
          <Link href="mailto:info@biotechuniverse.com" className="underline">
            info@biotechuniverse.com
          </Link>
          .
        </p>
      </Card>
    </div>
  );
};

export default MembershipQualifications;
