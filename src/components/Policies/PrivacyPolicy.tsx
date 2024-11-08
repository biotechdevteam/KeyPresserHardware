"use client";
import { About } from "@/types/aboutSchema";
import React from "react";
import { Separator } from "../ui/separator";
import { Link } from "next-view-transitions";

const PrivacyPolicy: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  let dateUpdated = "8th November 2024";
  let parentalGuide = 13;

  return (
    <div className="min-h-screen px-8 lg:px-16 py-12">
      <div className="container mx-auto max-w-4xl">
        <section className="mb-6">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Privacy Policy
          </h1>
          <Separator className="mx-auto w-24 mb-8" />
          <h3 className="text-sm mb-2">
            Last updated:{" "}
            <span className="italic font-semibold">{dateUpdated}</span>
          </h3>
          <p>
            Welcome to {aboutData.name}. We are committed to protecting your
            privacy and ensuring that your personal information is secure. This
            Privacy Policy outlines how we collect, use, disclose, and safeguard
            your data when you visit our website, use our services, or engage
            with us in any way.
          </p>
          <p>
            By using our services, you agree to the terms outlined in this
            Privacy Policy. If you disagree with any part of this policy, please
            discontinue the use of our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            1. Information We Collect
          </h2>
          <div>
            <h3 className="text-lg font-medium mb-1">
              1.1 Personal Information
            </h3>
            <p>
              When you use our website or services, we may collect personal
              information that you voluntarily provide, including:
            </p>
            <ul className="list-disc list-inside ml-6 text-muted-foreground">
              <li>Name</li>
              <li>Email address</li>
              <li>Contact number</li>
              <li>Billing and shipping address</li>
              <li>Payment information</li>
              <li>Other personal information necessary for service delivery</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-1 mt-4">
              1.2 Non-Personal Information
            </h3>
            <p>
              We may also collect non-personal data automatically through
              cookies, log files, or other similar technologies, including:
            </p>
            <ul className="list-disc list-inside ml-6 text-muted-foreground">
              <li>Browser type and version</li>
              <li>Device type (mobile or desktop)</li>
              <li>IP address</li>
              <li>Operating system</li>
              <li>Pages viewed on our website</li>
              <li>Time spent on the website</li>
              <li>Referring website addresses</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-1 mt-4">
              1.3 Cookies and Tracking Technologies
            </h3>
            <p>
              We use cookies and similar tracking technologies to enhance your
              experience. Cookies are small data files stored on your device
              that help us understand user behavior, provide personalized
              services, and improve our website functionality. For more
              information on our cookie practices, please refer to our{" "}
              <Link href="/cookie-settings">Cookie Settings.</Link>
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            2. How We Use Your Information
          </h2>
          <p>
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc list-inside ml-6 text-muted-foreground">
            <li>To provide, manage, and improve the services you request.</li>
            <li>
              To personalize your experience on our website by offering tailored
              content or recommendations.
            </li>
            <li>
              To send you updates, newsletters, marketing materials, or
              service-related announcements.
            </li>
            <li>To analyze website performance and improve our services.</li>
            <li>
              To protect our website, users, and systems from fraud,
              cyber-attacks, or unauthorized access.
            </li>
            <li>
              To comply with applicable laws, regulations, and contractual
              obligations.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            3. Sharing Your Information
          </h2>
          <p>
            We may share your personal information with trusted third parties in
            the following scenarios:
          </p>
          <ul className="list-disc list-inside ml-6 text-muted-foreground">
            <li>
              We may share your data with third-party vendors or service
              providers who help us operate our website and deliver services.
            </li>
            <li>
              We may disclose your data when required by law or in response to a
              valid request by public authorities.
            </li>
            <li>
              If our company undergoes a merger, acquisition, or sale, your
              information may be transferred as part of that transaction.
            </li>
          </ul>
          <p className="mt-2">
            We do not sell or rent your personal information to any third
            parties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to
            provide the services outlined in this Privacy Policy or as required
            by law. Once we no longer need your data for these purposes, we will
            securely delete or anonymize it.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
          <p>
            Depending on your location and applicable law, you may have the
            following rights:
          </p>
          <ul className="list-disc list-inside ml-6 text-muted-foreground">
            <li>
              Right to request a copy of the personal information we hold about
              you.
            </li>
            <li>
              Right to request that we correct any inaccurate or incomplete
              information.
            </li>
            <li>
              Right to request the deletion of your personal data when it is no
              longer necessary for us to retain it.
            </li>
            <li>
              Right to request that we limit how we process your data in certain
              circumstances.
            </li>
            <li>
              Right to object to our processing of your data for marketing or
              other purposes.
            </li>
            <li>Right to request a portable copy of your data.</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, please contact us at{" "}
            <Link href={`mailto:${aboutData.contact_email}`}>
              {aboutData.contact_email}.
            </Link>{" "}
            We will respond to your request within the time frames required by
            applicable laws.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            6. Security of Your Information
          </h2>
          <p>
            We take the security of your personal information seriously and
            implement industry-standard security measures, such as encryption
            and access controls, to protect your data. However, no method of
            data transmission or storage is 100% secure, and we cannot guarantee
            absolute security.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of{" "}
            {parentalGuide}, and we do not knowingly collect personal data from
            children. If we become aware that we have collected personal
            information from a child under {parentalGuide} without parental
            consent, we will delete that information as quickly as possible.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            8. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, legal requirements, or for other
            operational reasons. When we make updates, we will revise the{" "}
            <strong>"Last Updated"</strong> date at the top of this document. We
            encourage you to periodically review this page for the latest
            information on our privacy practices.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            how we handle your personal information, please contact us at:
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

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">10. Governing Law</h2>
          <p>
            This Privacy Policy shall be governed and construed in accordance
            with the laws of Cameroon, without regard to its conflict of law
            provisions.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
