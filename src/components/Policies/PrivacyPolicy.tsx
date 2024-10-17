import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          Welcome to <strong>[Your Company/Website Name]</strong> ("we", "our",
          "us"). We are committed to protecting your privacy and ensuring that
          your personal information is secure. This Privacy Policy outlines how
          we collect, use, disclose, and safeguard your data when you visit our
          website <strong>[Website URL]</strong>, use our services, or engage
          with us in any way.
        </p>
        <p>
          By using our services, you agree to the terms outlined in this Privacy
          Policy. If you disagree with any part of this policy, please
          discontinue the use of our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
        <h3 className="text-lg font-medium mb-1">2.1 Personal Information</h3>
        <p>
          When you use our website or services, we may collect personal
          information that you voluntarily provide, including:
        </p>
        <ul className="list-disc list-inside ml-6">
          <li>Name</li>
          <li>Email address</li>
          <li>Contact number</li>
          <li>Billing and shipping address</li>
          <li>Payment information</li>
          <li>Other personal information necessary for service delivery</li>
        </ul>

        <h3 className="text-lg font-medium mb-1 mt-4">2.2 Non-Personal Information</h3>
        <p>
          We may also collect non-personal data automatically through cookies,
          log files, or other similar technologies, including:
        </p>
        <ul className="list-disc list-inside ml-6">
          <li>Browser type and version</li>
          <li>Device type (mobile or desktop)</li>
          <li>IP address</li>
          <li>Operating system</li>
          <li>Pages viewed on our website</li>
          <li>Time spent on the website</li>
          <li>Referring website addresses</li>
        </ul>

        <h3 className="text-lg font-medium mb-1 mt-4">2.3 Cookies and Tracking Technologies</h3>
        <p>
          We use cookies and similar tracking technologies to enhance your
          experience. Cookies are small data files stored on your device that
          help us understand user behavior, provide personalized services, and
          improve our website functionality. For more information on our cookie
          practices, please refer to our <a href="/cookie-policy" className="text-blue-600 underline">Cookie Policy</a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
        <p>We use the information we collect for various purposes, including:</p>
        <ul className="list-disc list-inside ml-6">
          <li>Service delivery</li>
          <li>Personalization of content</li>
          <li>Communication</li>
          <li>Analytics and improvements</li>
          <li>Security and legal compliance</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Sharing Your Information</h2>
        <p>We may share your personal information with trusted third parties in the following scenarios:</p>
        <ul className="list-disc list-inside ml-6">
          <li>Service providers</li>
          <li>Legal obligations</li>
          <li>Business transfers</li>
        </ul>
        <p>We do not sell or rent your personal information to any third parties.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Data Retention</h2>
        <p>
          We retain your personal information for as long as necessary to
          provide the services outlined in this Privacy Policy or as required by
          law. Once we no longer need your data for these purposes, we will
          securely delete or anonymize it.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <p>Depending on your location and applicable law, you may have the following rights:</p>
        <ul className="list-disc list-inside ml-6">
          <li>Right to access</li>
          <li>Right to rectification</li>
          <li>Right to deletion</li>
          <li>Right to restriction</li>
          <li>Right to object</li>
          <li>Right to data portability</li>
        </ul>
        <p>To exercise these rights, please contact us at <a href="mailto:[email]" className="text-blue-600 underline">[email address]</a>.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Security of Your Information</h2>
        <p>
          We take the security of your personal information seriously and
          implement industry-standard security measures to protect your data.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Children's Privacy</h2>
        <p>
          Our services are not directed to individuals under the age of 13, and
          we do not knowingly collect personal data from children under 13.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">9. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we make
          updates, we will revise the "Last Updated" date. We encourage you to
          periodically review this page for the latest information on our
          privacy practices.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p className="mt-2">
          <strong>[Company Name]</strong><br />
          [Address Line 1]<br />
          [City, State, Zip Code]<br />
          <a href="mailto:[email]" className="text-blue-600 underline">[email address]</a><br />
          [Phone Number]
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
