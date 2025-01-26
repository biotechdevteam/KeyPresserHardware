import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "../../../lib/utils/pageTransitions";

const EventExhibitions: React.FC = () => {
  const router = useTransitionRouter();

  return (
    <div className="p-8 mx-auto max-w-4xl">
      {/* Page Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Exhibitions & Sponsorship</h1>
        <p className="text-lg mt-4">
          Join us in showcasing the future of biotechnology. Discover unique
          opportunities to exhibit and sponsor our events.
        </p>
      </header>

      {/* Exhibition Opportunities Section */}
      <section className="my-10">
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-semibold">Exhibition Opportunities</h2>
          <Separator className="w-24 mx-auto my-4" />
          <p className="text-base">
            Present your products, services, and innovations to a targeted
            audience. Our exhibitions offer prime visibility for biotech
            companies, research institutions, and entrepreneurs.
          </p>
          <Button
            className="mt-4 animate-beep"
            variant="default"
            onClick={() =>
              router.push("/contact", { onTransitionReady: slideInOut })
            }
          >
            Contact Us
          </Button>
        </Card>
      </section>

      {/* Sponsorship Packages Section */}
      <section className="my-10">
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-semibold">Sponsorship Packages</h2>
          <Separator className="w-24 mx-auto my-4" />
          <p className="text-base">
            Partner with us and gain visibility, enhance your brand image, and
            engage with the biotech community. We offer tailored sponsorship
            packages to suit diverse needs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="border p-4 rounded-lg">
              <h3 className="text-lg font-bold">Gold Sponsor</h3>
              <p className="text-sm mt-2">
                Maximum visibility, keynote speaking slots, and promotional
                opportunities.
              </p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="text-lg font-bold">Silver Sponsor</h3>
              <p className="text-sm mt-2">
                Branding on event materials, exhibit space, and networking
                sessions.
              </p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="text-lg font-bold">Bronze Sponsor</h3>
              <p className="text-sm mt-2">
                Brand recognition, exhibit space, and access to the community.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Benefits of Sponsorship Section */}
      <section className="my-10">
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-semibold">Benefits of Sponsorship</h2>
          <Separator className="w-24 mx-auto my-4" />
          <ul className="list-disc list-inside text-left">
            <li>Direct exposure to industry leaders and key stakeholders.</li>
            <li>Increased brand visibility and credibility.</li>
            <li>Opportunities to network and forge new partnerships.</li>
            <li>Enhanced reputation as a thought leader in biotechnology.</li>
          </ul>
        </Card>
      </section>

      {/* Contact Section */}
      <section className="my-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Interested in Partnering?
        </h2>
        <p className="text-base mb-4">
          Contact us to discuss how you can participate in our exhibitions or
          become a sponsor.
        </p>
        <Button
          variant="default"
          className="animate-beep"
          onClick={() =>
            router.push("/contact", { onTransitionReady: slideInOut })
          }
        >
          Get in Touch
        </Button>
      </section>
    </div>
  );
};

export default EventExhibitions;
