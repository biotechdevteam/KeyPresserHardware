"use client";
import { About } from "@/types/aboutSchema";
import { Link } from "next-view-transitions";
import React from "react";
import { Separator } from "../ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calendar, Clock, FileText, Info } from "lucide-react";

const MembershipAgreement: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  const lastUpdated = "8th November 2024";
  const membershipFee = "3,000 FCFA";
  const membershipValidity = "1 year";
  const cancelRequest = 30;
  const infoEmail = process.env.BTVERSE_INFO_EMAIL || "info@biotecuniverse.com";

  const SectionTitle = ({
    number,
    title,
  }: {
    number: number;
    title: string;
  }) => (
    <div className="flex items-center gap-2 mb-3">
      <Badge
        variant="outline"
        className="h-7 w-7 rounded-full flex items-center justify-center bg-primary/10 text-primary"
      >
        {number}
      </Badge>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );

  return (
    <div className="py-8 px-4 md:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-primary">
          Membership Agreement
        </h1>
        <Separator className="mx-auto w-32 mb-4" />
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock size={16} />
          <span>
            Last updated: <span className="font-medium">{lastUpdated}</span>
          </span>
        </div>
      </div>

      <Card className="mb-8 border-l-4 border-l-primary">
        <CardContent className="p-4 md:p-6">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <p className="text-sm md:text-base">
              This Membership Agreement outlines the terms and conditions
              governing your membership with{" "}
              <span className="font-medium">{aboutData.name}</span>. By
              registering as a member, you agree to comply with and be bound by
              the terms outlined below. If you do not agree with any of these
              terms, please refrain from registering or participating in the
              membership.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <section>
          <SectionTitle number={1} title="Eligibility for Membership" />
          <div className="pl-9 space-y-3">
            <p>
              Membership in{" "}
              <span className="font-medium">{aboutData.name}</span> is open to
              all individuals who meet the following conditions:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                Must be at least 13 years old or have the consent of a legal
                guardian.
              </li>
              <li>
                Must adhere to the Association's values of respect,
                professionalism, and inclusivity, regardless of gender,
                religion, political affiliation, or professional background.
              </li>
            </ul>
            <p>To become an active member, applicants must:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                Pay an annual membership fee of{" "}
                <Badge variant="secondary">{membershipFee}</Badge>
              </li>
              <li>
                Participate in at least one{" "}
                <span className="font-medium">mutual aid activity</span> per
                year.
              </li>
              <li>
                Subscribe to the Association's{" "}
                <span className="font-medium">
                  mutual development funding programs
                </span>
                .
              </li>
            </ul>
            <p>
              Membership is contingent upon approval by the {aboutData.name}
              committee. The committee reserves the right to approve or reject
              applications and review the status of members periodically.
            </p>
          </div>
        </section>

        <section>
          <SectionTitle number={2} title="Membership Registration" />
          <div className="pl-9 space-y-3">
            <p>
              To register, applicants must complete the online or offline
              application process by providing accurate, complete, and
              up-to-date information. Members are responsible for ensuring their
              details remain accurate throughout their membership.
            </p>
            <p>
              {aboutData.name} reserves the right to reject applications that do
              not meet the eligibility criteria or fail to comply with the
              Association's policies.
            </p>
          </div>
        </section>

        <section>
          <SectionTitle number={3} title="Membership Fees" />
          <div className="pl-9 space-y-3">
            <div className="flex flex-wrap gap-3 bg-primary/5 p-4 rounded-md">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                <span>
                  Annual fee: <Badge>{membershipFee}</Badge>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                <span>
                  Valid for: <Badge>{membershipValidity}</Badge>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle size={18} className="text-primary" />
                <span>
                  Fees are <Badge variant="destructive">non-refundable</Badge>
                </span>
              </div>
            </div>
            <p>
              Membership benefits will be suspended for unpaid fees beyond the
              renewal deadline.
            </p>
          </div>
        </section>

        <section>
          <SectionTitle number={4} title="Membership Benefits" />
          <div className="pl-9 space-y-3">
            <p>Members are entitled to the following benefits:</p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li className="pl-1">
                Access to exclusive resources such as research publications,
                whitepapers, and reports.
              </li>
              <li className="pl-1">
                Invitations to events, workshops, and conferences hosted by
                BioTec Universe.
              </li>
              <li className="pl-1">
                Participation in networking opportunities and development
                programs.
              </li>
            </ul>
            <p>
              {aboutData.name} reserves the right to modify benefits at its
              discretion.
            </p>
          </div>
        </section>

        <section>
          <SectionTitle number={5} title="Membership Term and Renewal" />
          <div className="pl-9 space-y-3">
            <p>
              Membership is valid for{" "}
              <span className="font-medium">{membershipValidity}</span> from the
              date of registration. Membership renewals occur annually, and
              members must pay the applicable fees before the renewal date to
              maintain active status.
            </p>
            <p>
              Members wishing to cancel must notify the Association at least{" "}
              <span className="font-medium">{cancelRequest} days</span> before
              their renewal date.
            </p>
          </div>
        </section>

        {/* Remaining sections follow the same pattern */}
        <section>
          <SectionTitle number={6} title="Member Conduct" />
          <div className="pl-9 space-y-3">
            <p>All members are expected to:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                Act professionally and respectfully in all Association-related
                activities.
              </li>
              <li>
                Avoid behavior that may harm the reputation of {aboutData.name}{" "}
                or its members.
              </li>
            </ul>
            <p>Prohibited behavior includes but is not limited to:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Harassment, discrimination, or unethical conduct.</li>
              <li>
                Misrepresentation of identity or affiliation with the
                Association.
              </li>
              <li>Any unlawful activities.</li>
            </ul>
            <p>
              {aboutData.name} reserves the right to terminate memberships of
              individuals found in violation of this agreement.
            </p>
          </div>
        </section>

        <section>
          <SectionTitle number={7} title="Privacy and Data Use" />
          <div className="pl-9 space-y-3">
            <p>
              We respect your privacy and handle your personal data in
              accordance with our{" "}
              <Link
                href="privacy-policy"
                className="text-primary hover:underline"
              >
                Privacy Policy.
              </Link>{" "}
              By becoming a member, you consent to the collection and use of
              your data for purposes related to membership management, event
              participation, and communication.
            </p>
          </div>
        </section>

        <section>
          <SectionTitle number={8} title="Intellectual Property" />
          <div className="pl-9 space-y-3">
            <p>
              {aboutData.name} retains ownership of all content, materials, and
              intellectual property shared with members. Members may not
              reproduce, distribute, or exploit these materials without explicit
              permission.
            </p>
          </div>
        </section>

        <section>
          <SectionTitle number={9} title="Payments and Transactions" />
          <div className="pl-9 space-y-3">
            <p>
              If you make payments or transactions through BioTec Universe's
              platform, you agree to provide valid payment details.{" "}
              {aboutData.name} is not responsible for fees or taxes associated
              with payments.
            </p>
          </div>
        </section>

        <section>
          <SectionTitle
            number={10}
            title="Termination or Suspension of Membership"
          />
          <div className="pl-9 space-y-3">
            <p>
              {aboutData.name} may terminate or suspend membership at its
              discretion for reasons including but not limited to failure to
              meet eligibility requirements, non-payment of membership fees and
              breach of this agreement or Association policies. And upon
              termination, members forfeit all rights and benefits associated
              with their membership.
            </p>
          </div>
        </section>

        <section>
          <SectionTitle number={11} title="Limitation of Liability" />
          <div className="pl-9 space-y-3">
            <p>
              To the fullest extent permitted by law, {aboutData.name} will not
              be liable for indirect, incidental, or consequential damages
              arising from membership or related activities. The Association's
              total liability will not exceed the membership fees paid in the
              preceding 12 months.
            </p>
          </div>
        </section>

        <section>
          <SectionTitle number={12} title="Changes to the Agreement" />
          <div className="pl-9 space-y-3">
            <p>
              {aboutData.name} reserves the right to update this Membership
              Agreement. Changes will be effective immediately upon posting, and
              the <span className="font-medium">Last Updated</span> date will be
              revised accordingly. Continued membership constitutes acceptance
              of the revised terms.
            </p>
          </div>
        </section>

        <section>
          <SectionTitle
            number={13}
            title="Governing Law and Dispute Resolution"
          />
          <div className="pl-9 space-y-3">
            <p>
              This Membership Agreement is governed by the laws of{" "}
              <span className="font-medium">Cameroon</span>. Any disputes
              arising from this agreement shall be resolved through binding
              arbitration in{" "}
              <span className="font-medium">Buea, South West, Cameroon</span>.
            </p>
          </div>
        </section>

        <section>
          <SectionTitle number={14} title="Termination by Member" />
          <div className="pl-9 space-y-3">
            <p>
              Members may terminate their membership by submitting a written
              notice to {aboutData.name}. Termination will take effect at the
              end of the current membership term. Fees for the remaining period
              are non-refundable.
            </p>
          </div>
        </section>

        <section>
          <SectionTitle number={15} title="Contact Information" />
          <div className="pl-9 space-y-3">
            <p>
              For questions, concerns, or further assistance, please contact us
              at:
            </p>

            <Card className="bg-muted/50 border-0">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="px-2">
                    Email
                  </Badge>
                  <Link
                    href={`mailto:${infoEmail}`}
                    className="text-primary hover:underline"
                  >
                    {infoEmail}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="px-2">
                    Phone
                  </Badge>
                  <div className="flex gap-2">
                    <Link
                      href={`tel:${aboutData.contact_phone}`}
                      className="text-primary hover:underline"
                    >
                      {aboutData.contact_phone}
                    </Link>
                    <span>|</span>
                    <Link
                      href={`tel:+237671400077`}
                      className="text-primary hover:underline"
                    >
                      +237671400077
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MembershipAgreement;
