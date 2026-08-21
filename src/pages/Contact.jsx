import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaQuestionCircle,
  FaHeadset,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate support ticket submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        "Thank you! Your message has been sent successfully. Our support team will get back to you shortly.",
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-green-600 font-semibold tracking-wide uppercase text-sm bg-green-100 px-3 py-1 rounded-full">
            Help & Support
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mt-4 mb-4">
            We'd Love to Hear From You
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Have a question about your order, feedback on our service, or
            partnership inquiry? Reach out to our dedicated 24/7 support team.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl mb-4">
              <FaPhoneAlt />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Call Us Directly</h3>
            <p className="text-gray-500 text-xs mb-3">
              Toll-free customer hotline
            </p>
            <a
              href="tel:+1800254653"
              className="text-green-600 font-bold text-sm hover:underline"
            >
              +1 (800) 254-653
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4">
              <FaEnvelope />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Email Support</h3>
            <p className="text-gray-500 text-xs mb-3">Replies within 2 hours</p>
            <a
              href="mailto:support@blinkeyit.com"
              className="text-blue-600 font-bold text-sm hover:underline"
            >
              support@blinkeyit.com
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-4">
              <FaClock />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Service Hours</h3>
            <p className="text-gray-500 text-xs mb-3">
              Instant grocery delivery
            </p>
            <span className="text-gray-800 font-semibold text-sm">
              6:00 AM - 12:00 AM (Daily)
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl mb-4">
              <FaMapMarkerAlt />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Headquarters</h3>
            <p className="text-gray-500 text-xs mb-3">
              Blinkeyit Operations Hub
            </p>
            <span className="text-gray-800 font-semibold text-sm">
              Tech Boulevard, Sector 62
            </span>
          </div>
        </div>

        {/* Contact Form & Live Support Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Send Us a Message
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Fill out the form below and we will get back to your inquiry
              promptly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-gray-50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 555-0199"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Order Status, Feedback"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we assist you today? Provide details here..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-gray-50 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow hover:shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Sending Message..."
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Support Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl text-green-400 mb-4">
                <FaHeadset />
              </div>
              <h3 className="text-xl font-bold mb-2">Live In-App Chat</h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Need immediate help with an active order? Chat directly with
                your delivery partner or support agent through your order
                details page.
              </p>
              <Link
                to="/dashboard/myorders"
                className="inline-block text-xs font-bold uppercase tracking-wider text-green-400 hover:text-green-300 underline"
              >
                View Active Orders &rarr;
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-2xl text-green-600 mb-4">
                <FaQuestionCircle />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Frequently Asked Questions
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Find quick answers regarding payments, delivery times, refunds,
                and discounts in our FAQ center.
              </p>
              <Link
                to="/faq"
                className="inline-block bg-green-50 text-green-700 font-bold px-4 py-2 rounded-xl text-xs hover:bg-green-100 transition-colors"
              >
                Visit FAQ Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
