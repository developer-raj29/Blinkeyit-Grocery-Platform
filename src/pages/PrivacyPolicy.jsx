import { FaUserShield, FaLock, FaDatabase, FaCookieBite, FaUserCheck } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-green-600 font-semibold tracking-wide uppercase text-sm bg-green-100 px-3 py-1 rounded-full">
            Data Privacy & Trust
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mt-4 mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm">
            Last updated: August 2026 • We value your trust and are committed to safeguarding your personal data.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaUserShield className="text-green-600" /> 1. Information We Collect
            </h2>
            <p className="text-gray-600 mb-3">
              When you use Blinkeyit, we collect information necessary to deliver high quality grocery services to your doorstep:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-1 text-sm">Personal Information</h4>
                <p className="text-xs text-gray-600">Name, email address, phone number, and delivery street addresses.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-1 text-sm">Device & Location Data</h4>
                <p className="text-xs text-gray-600">GPS location (with your consent) to pinpoint delivery addresses and dark stores.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaDatabase className="text-green-600" /> 2. How We Use Your Data
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 pl-2">
              <li>Processing, packing, and delivering your grocery orders accurately.</li>
              <li>Sending live delivery updates, invoice receipts, and customer service notifications.</li>
              <li>Enhancing catalog recommendations, offers, and app performance.</li>
              <li>Preventing fraud, unauthorized logins, and ensuring secure payment processing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaLock className="text-green-600" /> 3. Data Protection & Security
            </h2>
            <p className="text-gray-600">
              We implement industry-standard encryption protocols (SSL/TLS 256-bit) to protect your personal information during transit and at rest. Payment card data is processed directly via PCI-DSS certified payment processors and is never saved on our application servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaCookieBite className="text-green-600" /> 4. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-600">
              We use session cookies and local storage to remember your active cart, login sessions, and preference filters. You can configure your browser settings to decline cookies, though certain shopping features may be limited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaUserCheck className="text-green-600" /> 5. Your Privacy Rights
            </h2>
            <p className="text-gray-600 mb-2">
              You have the right to access, update, or request the deletion of your account and personal records at any time. You can manage your profile directly via the user dashboard or email our privacy team.
            </p>
          </section>

          <section className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Data Protection Officer</h3>
            <p className="text-gray-600 text-sm">
              If you have any privacy-related questions or data deletion requests, contact our Data Protection Officer at{" "}
              <a href="mailto:privacy@blinkeyit.com" className="text-green-600 font-semibold hover:underline">
                privacy@blinkeyit.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
