import { About } from "@/types/aboutSchema";
import React from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";

const RefundPolicy: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  let dateUpdated = "8th November 2024";
  let refundRequest = 30;
  let refundReply = 7;

  return (
    <div className="min-h-screen px-8 lg:px-16 py-12">
      <div className="container mx-auto max-w-4xl">
        <section className="mb-6">
          <h1 className="text-3xl font-bold mb-4 text-center">Refund Policy</h1>
          <Separator className="mx-auto w-24 mb-8" />
          <h3 className="text-sm mb-2">
            Last updated:{" "}
            <span className="italic font-semibold">{dateUpdated}</span>
          </h3>
          <p>
            At {aboutData.name}, we value your trust and strive to support your
            professional growth through our services and programs. While
            membership fees contribute to our efforts, we understand there may
            be situations where a refund is necessary.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            1. Membership Application Fee Refund
          </h2>
          <p>
            If you are not satisfied with your decision to join {aboutData.name}
            , you may request a refund of your membership application fee within{" "}
            <strong>{refundRequest} days</strong> of your application date.
          </p>
          <p className="mt-4">To be eligible for a refund:</p>
          <ul className="list-disc list-inside ml-6 text-muted-foreground">
            <li>
              The refund request must be submitted within the {refundRequest}
              -day period.
            </li>
            <li>
              Refunds apply <strong>only</strong> to the membership application
              fee.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Refund Process</h2>
          <p>
            Once we receive your refund request, we will review it and notify
            you of the decision within{" "}
            <strong>{refundReply} business days</strong>.
          </p>
          <p className="mt-4">
            If approved, the refund will be processed to your original payment
            method. The time it takes to reflect in your account may vary
            depending on your payment provider.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            3. Late or Missing Refunds
          </h2>
          <p>
            If you haven’t received a refund after approval, please follow these
            steps:
          </p>
          <ul className="list-decimal list-inside ml-6 text-muted-foreground">
            <li>Check your bank account or payment method again.</li>
            <li>
              Contact your payment provider, as it may take time for the
              transaction to process.
            </li>
            <li>
              If you’ve completed these steps and still have not received your
              refund, please contact us at{" "}
              <Link href={`mailto:${aboutData.contact_email}`}>
                {aboutData.contact_email}
              </Link>
              .
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Contact Us</h2>
          <p>
            If you have any questions about this policy or need assistance with
            your refund request, please reach out to us:
          </p>
          <ul className="mt-2 text-muted-foreground">
            <li>
              Email:{" "}
              <Link href={`mailto:${aboutData.contact_email}`}>
                {aboutData.contact_email}
              </Link>
            </li>
            <li>
              Phone:{" "}
              <Link href={`tel:${aboutData.contact_phone}`}>
                {aboutData.contact_phone}
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
