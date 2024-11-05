import React from "react";

const RefundPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>

      <section className="mb-6">
        <p>
          At <strong>[Your Company/Website Name]</strong>, we strive to provide
          the best products and services to our customers. However, if you are
          not entirely satisfied with your purchase, we're here to help.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Returns</h2>
        <p>
          You have <strong>[X] days</strong> to return an item from the date you
          received it. To be eligible for a return, your item must meet the
          following criteria:
        </p>
        <ul className="list-disc list-inside ml-6">
          <li>The item must be unused and in the same condition that you received it.</li>
          <li>The item must be in the original packaging.</li>
          <li>You must provide proof of purchase (receipt, order number, etc.).</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Refunds</h2>
        <p>
          Once we receive your returned item, we will inspect it and notify you
          of the status of your refund. If your return is approved, we will
          initiate a refund to your original method of payment. The time it
          takes for you to receive your refund will depend on your payment
          provider's policies. Refunds will generally be processed within{" "}
          <strong>[X] days</strong> of receiving the returned item.
        </p>
        <p className="mt-4">
          <strong>Note:</strong> Shipping costs are non-refundable. If you
          receive a refund, the cost of return shipping will be deducted from
          your refund.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Late or Missing Refunds</h2>
        <p>
          If you haven’t received a refund yet, please follow these steps:
        </p>
        <ul className="list-decimal list-inside ml-6">
          <li>Check your bank account or credit card statement again.</li>
          <li>Contact your credit card company or bank, as it may take some time before your refund is posted.</li>
          <li>If you’ve done all of this and still haven’t received your refund, please contact us at <a href="mailto:[email address]" className="text-blue-600 underline">[email address]</a>.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Exchanges</h2>
        <p>
          We only replace items if they are defective or damaged. If you need to
          exchange an item for the same one, please contact us at{" "}
          <a href="mailto:[email address]" className="text-blue-600 underline">
            [email address]
          </a>{" "}
          and send your item to: <strong>[address]</strong>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Non-Returnable Items</h2>
        <p>Certain types of items cannot be returned:</p>
        <ul className="list-disc list-inside ml-6">
          <li>Downloadable software products</li>
          <li>Perishable goods (e.g., food, flowers)</li>
          <li>Health and personal care items</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Shipping</h2>
        <p>
          To return your product, you should mail your product to:{" "}
          <strong>[address]</strong>.
        </p>
        <p className="mt-4">
          You will be responsible for paying for your own shipping costs for
          returning your item. Shipping costs are non-refundable.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
        <p>
          If you have any questions about our refund policy, please contact us
          at:
        </p>
        <p className="mt-4">
          <strong>[Company Name]</strong>
          <br />
          [Address Line 1]
          <br />
          [City, State, Zip Code]
          <br />
          <a href="mailto:[email address]" className="text-blue-600 underline">
            [email address]
          </a>
          <br />
          [Phone Number]
        </p>
      </section>
    </div>
  );
};

export default RefundPolicy;
