"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Error from "@/app/[locale]/error";
import Loader from "@/components/loader/Loader";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch about data
    const aboutData = await fetchAboutData();

    // Return data as props (no ISR)
    return {
      props: {
        aboutData,
        isError: false,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        aboutData: [],
        isError: true,
        error: error,
      },
    };
  }
};

const MembershipBenefits = ({
  aboutData,
  isError,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // Handle loading state (Client-side simulation)
  const isLoading = aboutData.length === 0 && !isError;

  if (isLoading) {
    return <Loader />;
  }

  // Handle error state
  if (isError) {
    return <Error error={error} />;
  }

  return (
    <section className="container mx-auto py-12 px-6 lg:px-12">
      <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6">
        Membership Benefits
      </h1>
      <Separator className="mb-8 mx-auto w-1/4" />
      <p className="text-lg text-center mb-12">
        Joining {aboutData?.name} offers numerous advantages designed to enhance
        both your professional journey and the collective efforts of our
        community in advancing biotechnology.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Networking Opportunities
          </h2>
          <p className="text-base">
            As a member, you’ll gain exclusive access to a network of
            professionals, industry leaders, and like-minded individuals. You
            can attend events, participate in forums, and build meaningful
            connections that can open doors for collaboration and career growth.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Professional Development
          </h2>
          <p className="text-base">
            Our members have the opportunity to participate in workshops,
            webinars, and training sessions aimed at enhancing your skills and
            knowledge in biotechnology and related fields.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Exclusive Access to Resources
          </h2>
          <p className="text-base">
            Members receive access to our extensive library of research papers,
            whitepapers, guidelines, and industry reports. Stay ahead of trends
            with the latest updates and valuable resources.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Discounts on Events and Services
          </h2>
          <p className="text-base">
            Enjoy discounted or even free access to our association’s events,
            including conferences, exhibitions, and seminars. You’ll also
            benefit from special deals on professional services provided by our
            partners.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recognition and Awards</h2>
          <p className="text-base">
            Be recognized for your achievements and contributions to the field
            of biotechnology. Members are eligible for prestigious awards,
            grants, and fellowships, promoting your work to a wider audience.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Career Advancement</h2>
          <p className="text-base">
            As a member, you’ll have access to job boards, career advice, and
            mentorship programs, helping you navigate your career and find
            opportunities in your area of expertise.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Collaboration Opportunities
          </h2>
          <p className="text-base">
            Engage with other members on collaborative research projects,
            product development, or community initiatives. We provide a platform
            for cooperation that fosters innovation and progress.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Leadership Opportunities
          </h2>
          <p className="text-base">
            Members can take on leadership roles within the association, from
            serving on committees to organizing events, helping to shape the
            future direction of the organization.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default MembershipBenefits;
