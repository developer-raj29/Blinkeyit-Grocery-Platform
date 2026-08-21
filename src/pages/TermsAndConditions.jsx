import {
  FaFileContract,
  FaShieldAlt,
  FaTruck,
  FaRegCreditCard,
} from "react-icons/fa";

const TermsAndConditions = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-green-600 font-semibold tracking-wide uppercase text-sm bg-green-100 px-3 py-1 rounded-full">
            Legal Agreement
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mt-4 mb-3">
            Terms & Conditions
          </h1>
          <p className="text-gray-500 text-sm">
            Last updated: August 2026 • Please read these terms carefully before
            using Blinkeyit.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200 space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaFileContract className="text-green-600" /> 1. Introduction &
              Acceptance
            </h2>
            <p className="text-gray-600">
              Welcome to Blinkeyit ("Platform", "we", "us", or "our"). By
              accessing or using our website, mobile applications, or services,
              you agree to be bound by these Terms and Conditions. If you do not
              agree with any part of these terms, you must discontinue use of
              the platform immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaShieldAlt className="text-green-600" /> 2. Account Registration
              & Security
            </h2>
            <p className="text-gray-600 mb-2">
              To place orders on Blinkeyit, you may be required to register an
              account using a valid email and phone number. You are responsible
              for:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
              <li>
                Maintaining the confidentiality of your account credentials and
                OTP codes.
              </li>
              <li>
                All activities and orders placed under your registered account.
              </li>
              <li>
                Providing accurate, current, and complete personal and delivery
                details.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaRegCreditCard className="text-green-600" /> 3. Pricing,
              Payments & Taxes
            </h2>
            <p className="text-gray-600 mb-2">
              All prices displayed on the platform are in the respective local
              currency and inclusive of applicable goods and services taxes
              (GST/VAT) unless indicated otherwise.
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
              <li>
                We reserve the right to revise item prices, discounts, and
                promotional offers at any time.
              </li>
              <li>
                Payments can be made via credit/debit cards, net banking, UPI,
                or cash on delivery.
              </li>
              <li>
                In the event of a technical pricing error, we reserve the right
                to cancel the order and issue a full refund.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaTruck className="text-green-600" /> 4. Delivery Terms & Service
              Availability
            </h2>
            <p className="text-gray-600 mb-2">
              We strive to deliver orders within the estimated 10-20 minute
              window. However, delivery times may vary due to severe weather
              conditions, high peak traffic, or unexpected supply delays.
            </p>
            <p className="text-gray-600">
              Customers must ensure that someone is available at the provided
              delivery address to receive perishable items. If a delivery fails
              due to an incorrect address or unresponsive customer, redelivery
              fees may apply.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Order Cancellations & Modifications
            </h2>
            <p className="text-gray-600">
              Due to our ultra-fast fulfillment process, orders are picked and
              packed immediately. You may cancel your order before it leaves the
              dark store. Once the delivery partner is on the way, cancellations
              may be subject to a nominal cancellation fee.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Limitation of Liability
            </h2>
            <p className="text-gray-600">
              Blinkeyit shall not be liable for any indirect, incidental,
              special, or consequential damages resulting from the use or
              inability to use our platform, or for the cost of procurement of
              substitute goods.
            </p>
          </section>

          <section className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">
              Questions or Concerns?
            </h3>
            <p className="text-gray-600 text-sm">
              If you have any questions regarding these Terms & Conditions,
              please contact us at{" "}
              <a
                href="mailto:legal@blinkeyit.com"
                className="text-green-600 font-semibold hover:underline"
              >
                legal@blinkeyit.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
