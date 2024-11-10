"use client";
import { About } from "@/types/aboutSchema";
import { Link } from "next-view-transitions";
import React from "react";
import { Separator } from "../ui/separator";

const MembershipAgreement: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  let dateUpdated = "8th November 2024";
  let membershipFee = "3,000 FCFA";
  let membershipValidity = "1 year";
  let cancelRequest = 30;

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Membership Agreement</h1>
      <Separator className="mx-auto w-24 mb-8" />
      <h3 className="text-sm mb-2">
        Last updated:{" "}
        <span className="italic font-semibold">{dateUpdated}</span>
      </h3>

      <p>
        This Membership Agreement outlines the terms and conditions governing
        your membership with {aboutData.name}. By registering as a member, you
        agree to comply with and be bound by the terms outlined below. If you do
        not agree with any of these terms, please refrain from registering or
        participating in the membership.
      </p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1. Eligibility for Membership</h2>
        <p>
          Membership in {aboutData.name} is open to all individuals who meet the
          following conditions:
        </p>
        <ul className="list-disc list-inside text-muted-foreground">
          <li>
            Must be at least 13 years old or have the consent of a legal
            guardian.
          </li>
          <li>
            Must adhere to the Association’s values of respect, professionalism,
            and inclusivity, regardless of gender, religion, political
            affiliation, or professional background.
          </li>
        </ul>
        <p>To become an active member, applicants must:</p>
        <ul className="list-disc list-inside text-muted-foreground">
          <li>
            Pay an annual membership fee of <strong>{membershipFee}</strong>.
          </li>
          <li>
            Participate in at least one <strong>mutual aid activity</strong> per
            year.
          </li>
          <li>
            Subscribe to the Association’s{" "}
            <strong>mutual development funding programs</strong>.
          </li>
        </ul>
        <p>
          Membership is contingent upon approval by the {aboutData.name}
          committee. The committee reserves the right to approve or reject
          applications and review the status of members periodically.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">2. Membership Registration</h2>
        <p>
          To register, applicants must complete the online or offline
          application process by providing accurate, complete, and up-to-date
          information. Members are responsible for ensuring their details remain
          accurate throughout their membership.
        </p>
        <p>
          {aboutData.name} reserves the right to reject applications that do not
          meet the eligibility criteria or fail to comply with the Association’s
          policies.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">3. Membership Fees</h2>
        <p>
          The annual membership fee is <strong>{membershipFee}</strong>. Fees
          are <strong>non-refundable</strong>, except as outlined in exceptional
          circumstances reviewed by the committee. Membership benefits will be
          suspended for unpaid fees beyond the renewal deadline.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">4. Membership Benefits</h2>
        <p>Members are entitled to the following benefits:</p>
        <ul className="list-disc list-inside text-muted-foreground">
          <li>
            Access to exclusive resources such as research publications,
            whitepapers, and reports.
          </li>
          <li>
            Invitations to events, workshops, and conferences hosted by Biotech
            Universe.
          </li>
          <li>
            Participation in networking opportunities and development programs.
          </li>
        </ul>
        <p>
          {aboutData.name} reserves the right to modify benefits at its
          discretion.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          5. Membership Term and Renewal
        </h2>
        <p>
          Membership is valid for <strong>{membershipValidity}</strong> from the
          date of registration. Membership renewals occur annually, and members
          must pay the applicable fees before the renewal date to maintain
          active status.
        </p>
        <p>
          Members wishing to cancel must notify the Association at least{" "}
          <strong>{cancelRequest} days </strong>
          before their renewal date.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">6. Member Conduct</h2>
        <p>All members are expected to:</p>
        <ul className="list-disc list-inside text-muted-foreground">
          <li>
            Act professionally and respectfully in all Association-related
            activities.
          </li>
          <li>
            Avoid behavior that may harm the reputation of {aboutData.name} or
            its members.
          </li>
        </ul>
        <p>Prohibited behavior includes but is not limited to:</p>
        <ul className="list-disc list-inside text-muted-foreground">
          <li>Harassment, discrimination, or unethical conduct.</li>
          <li>
            Misrepresentation of identity or affiliation with the Association.
          </li>
          <li>Any unlawful activities.</li>
        </ul>
        <p>
          {aboutData.name} reserves the right to terminate memberships of
          individuals found in violation of this agreement.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">7. Privacy and Data Use</h2>
        <p>
          We respect your privacy and handle your personal data in accordance
          with our <Link href="privacy-policy">Privacy Policy.</Link> By
          becoming a member, you consent to the collection and use of your data
          for purposes related to membership management, event participation,
          and communication.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">8. Intellectual Property</h2>
        <p>
          {aboutData.name} retains ownership of all content, materials, and
          intellectual property shared with members. Members may not reproduce,
          distribute, or exploit these materials without explicit permission.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">9. Payments and Transactions</h2>
        <p>
          If you make payments or transactions through Biotech Universe’s
          platform, you agree to provide valid payment details. {aboutData.name}{" "}
          is not responsible for fees or taxes associated with payments.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          10. Termination or Suspension of Membership
        </h2>
        <p>
          {aboutData.name} may terminate or suspend membership at its discretion
          for reasons including but not limited to failure to meet eligibility
          requirements, non-payment of membership fees and breach of this
          agreement or Association policies. And upon termination, members
          forfeit all rights and benefits associated with their membership.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">11. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, {aboutData.name} will not be
          liable for indirect, incidental, or consequential damages arising from
          membership or related activities. The Association’s total liability
          will not exceed the membership fees paid in the preceding 12 months.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">12. Changes to the Agreement</h2>
        <p>
          {aboutData.name} reserves the right to update this Membership
          Agreement. Changes will be effective immediately upon posting, and the{" "}
          <strong>Last Updated</strong> date will be revised accordingly.
          Continued membership constitutes acceptance of the revised terms.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">
          13. Governing Law and Dispute Resolution
        </h2>
        <p>
          This Membership Agreement is governed by the laws of{" "}
          <strong>Cameroon</strong>. Any disputes arising from this agreement
          shall be resolved through binding arbitration in{" "}
          <strong>Buea, South West, Cameroon</strong>.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">14. Termination by Member</h2>
        <p>
          Members may terminate their membership by submitting a written notice
          to {aboutData.name}. Termination will take effect at the end of the
          current membership term. Fees for the remaining period are
          non-refundable.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">15. Contact Information</h2>
        <p>
          For questions, concerns, or further assistance, please contact us at:
        </p>
        <ul className="space-y-1 text-muted-foreground">
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
  );
};

export default MembershipAgreement;
