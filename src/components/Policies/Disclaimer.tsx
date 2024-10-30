"use client";

import React from "react";

const Disclaimer: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Disclaimer</h1>
      <p className="mb-4">
        <strong>Last updated:</strong> [Insert Date]
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">General Information</h2>
        <p className="mb-4">
          The information provided by <strong>[Your Company Name]</strong> (“we,” “us,” or
          “our”) on <strong>[your website URL]</strong> (the “Site”) and our mobile application
          is for general informational purposes only. All information on the Site
          and our mobile application is provided in good faith; however, we make
          no representation or warranty of any kind, express or implied,
          regarding the accuracy, adequacy, validity, reliability, availability,
          or completeness of any information on the Site or our mobile
          application.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">External Links Disclaimer</h2>
        <p className="mb-4">
          The Site and our mobile application may contain (or you may be sent
          through the Site or our mobile application) links to other websites or
          content belonging to or originating from third parties or links to
          websites and features. Such external links are not investigated,
          monitored, or checked for accuracy, adequacy, validity, reliability,
          availability, or completeness by us. We do not warrant, endorse,
          guarantee, or assume responsibility for the accuracy or reliability of
          any information offered by third-party websites linked through the
          site or any website or feature linked in any banner or other
          advertising.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Professional Disclaimer</h2>
        <p className="mb-4">
          The Site cannot and does not contain professional advice. The
          information is provided for general informational and educational
          purposes only and is not a substitute for professional advice.
          Accordingly, before taking any actions based on such information, we
          encourage you to consult with the appropriate professionals. We do not
          provide any kind of{" "}
          <strong>[insert type of service, e.g., legal, medical, financial]</strong> advice. The
          use or reliance of any information contained on the Site or our mobile
          application is solely at your own risk.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Affiliate Disclaimer</h2>
        <p className="mb-4">
          The Site may contain links to affiliate websites, and we receive an
          affiliate commission for any purchases made by you on the affiliate
          website using such links. Our affiliates include{" "}
          <strong>[insert affiliate names, e.g., Amazon Associates]</strong>. We are not responsible
          for the actions of third parties linked through the Site and encourage
          you to review their terms of service and privacy policies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Testimonials Disclaimer</h2>
        <p className="mb-4">
          The Site may contain testimonials by users of our products and/or
          services. These testimonials reflect the real-life experiences and
          opinions of such users. However, the experiences are personal to those
          particular users and may not necessarily be representative of all
          users of our products and/or services. We do not claim, and you should
          not assume, that all users will have the same experiences. Your
          individual results may vary.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
        <p className="mb-4">
          In no event shall we be liable for any direct, indirect, incidental,
          consequential, or punitive damages arising out of your use of the
          Site, the mobile application, or any of the linked resources. We shall
          not be held responsible for any loss or damage resulting from the
          reliance on any information on the Site or any of the linked
          resources. Your use of the Site and your reliance on any information
          provided on the Site is solely at your own risk.
        </p>
      </section>
    </div>
  );
};

export default Disclaimer;
