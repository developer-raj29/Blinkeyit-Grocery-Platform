import { Link } from "react-router-dom";
import {
  FaUndoAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaMoneyBillWave,
  FaHeadset,
} from "react-icons/fa";

const ReturnPolicy = () => {
  const steps = [
    {
      step: "01",
      title: "Report the Issue",
      desc: "Go to 'My Orders', select the order and click 'Report Issue' within 24 hours of delivery.",
    },
    {
      step: "02",
      title: "Quick Verification",
      desc: "Upload a photo for damaged or incorrect items. Our system evaluates requests automatically.",
    },
    {
      step: "03",
      title: "Instant Resolution",
      desc: "Receive an immediate free replacement or full refund credited back to your original payment method.",
    },
  ];

  const eligibility = [
    {
      category: "Fresh Fruits & Vegetables",
      policy: "Eligible for refund/replacement",
      window: "Within 6 hours of delivery",
      status: true,
    },
    {
      category: "Dairy, Eggs & Fresh Bread",
      policy: "Eligible if spoiled/expired/damaged",
      window: "Within 12 hours of delivery",
      status: true,
    },
    {
      category: "Packaged Foods & Beverages",
      policy: "Eligible if seal broken/expired",
      window: "Within 24 hours of delivery",
      status: true,
    },
    {
      category: "Personal Care & Hygiene",
      policy: "Non-returnable once seal is opened",
      window: "Inspect at delivery time",
      status: false,
    },
    {
      category: "Frozen & Ice Cream Items",
      policy: "Report immediately if defrosted",
      window: "Within 1 hour of delivery",
      status: true,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-green-600 font-semibold tracking-wide uppercase text-sm bg-green-100 px-3 py-1 rounded-full">
            Hassle-Free Returns
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mt-4 mb-4">
            Return & Refund Policy
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            At Blinkeyit, customer satisfaction is our top priority. If something isn't right with your grocery order, we guarantee instant solutions.
          </p>
        </div>

        {/* 3 Step Return Process */}
        <div className="mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
            How Returns Work in 3 Easy Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden"
              >
                <span className="text-5xl font-black text-green-100 absolute -right-2 -bottom-2 pointer-events-none">
                  {item.step}
                </span>
                <div className="w-10 h-10 bg-green-600 text-white rounded-xl flex items-center justify-center font-bold text-sm mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Item Eligibility Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaUndoAlt className="text-green-600" /> Return Windows by Category
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Policy</th>
                  <th className="py-3 px-4">Time Window</th>
                  <th className="py-3 px-4">Eligibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {eligibility.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-gray-800">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 text-xs sm:text-sm">
                      {item.policy}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 text-xs">
                      {item.window}
                    </td>
                    <td className="py-3.5 px-4">
                      {item.status ? (
                        <span className="inline-flex items-center gap-1 text-green-600 font-bold text-xs bg-green-50 px-2.5 py-1 rounded-full">
                          <FaCheckCircle /> Returnable
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600 font-bold text-xs bg-red-50 px-2.5 py-1 rounded-full">
                          <FaTimesCircle /> Restricted
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Refund Timelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              <FaMoneyBillWave />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Instant UPI & Wallet Refunds</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Refunds for UPI, Google Pay, or Wallet payments are credited back immediately upon request approval.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              <FaClock />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Credit / Debit Cards</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Card refunds are processed within 24 hours; your issuing bank may take 2-5 business days to reflect the credit.
              </p>
            </div>
          </div>
        </div>

        {/* Need Help CTA */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
              <FaHeadset />
            </div>
            <div>
              <h3 className="font-bold text-lg">Need help with a recent order?</h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                Our support team is available 24/7 to resolve any product issue immediately.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="whitespace-nowrap bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors shadow"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
