import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaQuestionCircle,
  FaHeadset,
} from "react-icons/fa";

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItem, setOpenItem] = useState(null);

  const faqData = [
    {
      category: "delivery",
      question: "How fast will my grocery order be delivered?",
      answer:
        "Most orders are delivered within 10 to 20 minutes! Our micro-fulfillment dark stores are strategically located in your neighborhood to ensure ultra-fast delivery times.",
    },
    {
      category: "delivery",
      question: "Are there any delivery charges?",
      answer:
        "We offer free delivery on orders above the minimum basket threshold (usually $15–$25 depending on location). For smaller orders, a nominal delivery fee of $1.50 - $2.99 applies.",
    },
    {
      category: "ordering",
      question: "How do I place an order on Blinkeyit?",
      answer:
        "Simply browse or search for your favorite grocery items, add them to your cart, select or add your delivery address, apply any discount coupons, and complete checkout using card, UPI, or cash on delivery.",
    },
    {
      category: "ordering",
      question: "Can I schedule my grocery delivery for a later time?",
      answer:
        "Yes! At checkout, you can choose between 'Instant 10-Min Delivery' or pick a preferred delivery slot convenient for your schedule.",
    },
    {
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We support Credit/Debit Cards (Visa, MasterCard, Amex), UPI, Net Banking, Digital Wallets, and Cash on Delivery (COD).",
    },
    {
      category: "payment",
      question: "Is it safe to pay online on Blinkeyit?",
      answer:
        "Yes, 100%. All transactions are processed through bank-grade 256-bit encrypted payment gateways (powered by Stripe / Razorpay). We never store your sensitive card or banking credentials.",
    },
    {
      category: "returns",
      question: "What if an item is damaged or missing from my order?",
      answer:
        "If you receive a defective, expired, or missing item, you can raise an instant return request directly through the 'My Orders' section or contact our support team. We provide immediate replacements or refunds.",
    },
    {
      category: "returns",
      question: "How long does a refund take to process?",
      answer:
        "Refunds to UPI / digital wallets are credited instantly. For card or net banking transactions, your bank typically settles the refund within 2-5 business days.",
    },
    {
      category: "account",
      question: "How do I update my profile or delivery address?",
      answer:
        "You can manage and save multiple delivery addresses (Home, Work, Other) in your Profile Dashboard under the 'Address' tab.",
    },
  ];

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "delivery", label: "Delivery & Speed" },
    { id: "ordering", label: "Ordering & Items" },
    { id: "payment", label: "Payments & Pricing" },
    { id: "returns", label: "Returns & Refunds" },
    { id: "account", label: "Account & Profile" },
  ];

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (idx) => {
    setOpenItem(openItem === idx ? null : idx);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-green-600 font-semibold tracking-wide uppercase text-sm bg-green-100 px-3 py-1 rounded-full">
            Help Center
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mt-4 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Find answers to common questions about orders, payments, quick
            delivery, and returns.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords (e.g., refund, delivery, payment)..."
            className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-800"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-green-600 text-white shadow"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-12">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openItem === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-semibold text-gray-800 hover:text-green-600 transition-colors"
                  >
                    <span className="text-base sm:text-lg">{faq.question}</span>
                    <span className="text-gray-400 text-sm flex-shrink-0">
                      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-4 bg-gray-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <FaQuestionCircle className="text-4xl text-gray-300 mx-auto mb-3" />
              <h3 className="text-gray-700 font-bold mb-1">
                No matching questions found
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                Try searching with different keywords or browse all categories.
              </p>
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
              <FaHeadset />
            </div>
            <div>
              <h3 className="font-bold text-lg">Still have questions?</h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                Can't find the answer you're looking for? Reach out to our
                customer support team.
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

export default Faq;
