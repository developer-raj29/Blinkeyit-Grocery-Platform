import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTag,
  FaCopy,
  FaCheck,
  FaPercentage,
  FaGift,
  FaBolt,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Offers = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const coupons = [
    {
      code: "WELCOME20",
      discount: "20% OFF",
      title: "First Order Special",
      description: "Get 20% discount on your first grocery basket up to $15.",
      minOrder: "$25",
      expiry: "Valid till end of month",
      bgGradient: "from-green-500 to-emerald-600",
      category: "New Users",
    },
    {
      code: "FRESH50",
      discount: "50% OFF",
      title: "Farm Fresh Vegetables",
      description: "Flat 50% discount on seasonal organic fruits & vegetables.",
      minOrder: "$20",
      expiry: "Limited Daily Stock",
      bgGradient: "from-amber-500 to-orange-600",
      category: "Fresh Produce",
    },
    {
      code: "WEEKEND10",
      discount: "$10 OFF",
      title: "Weekend Grocery Haul",
      description: "Save $10 on orders above $60 this Saturday and Sunday.",
      minOrder: "$60",
      expiry: "Every Weekend",
      bgGradient: "from-blue-500 to-indigo-600",
      category: "All Items",
    },
    {
      code: "DAIRYDELIGHT",
      discount: "BUY 1 GET 1",
      title: "Dairy & Bakery Duo",
      description: "Buy 1 artisanal bread/milk and get the second at 50% off.",
      minOrder: "No minimum",
      expiry: "Valid all week",
      bgGradient: "from-purple-500 to-pink-600",
      category: "Dairy & Bakery",
    },
    {
      code: "FREEBIE",
      discount: "FREE DELIVERY",
      title: "Zero Delivery Charges",
      description: "Enjoy zero delivery fees on orders with 5+ items.",
      minOrder: "$15",
      expiry: "Ongoing promotion",
      bgGradient: "from-teal-500 to-cyan-600",
      category: "Delivery",
    },
    {
      code: "CLEAN15",
      discount: "15% OFF",
      title: "Household & Cleaning",
      description: "Save 15% on premium home essentials and detergents.",
      minOrder: "$30",
      expiry: "Valid this week",
      bgGradient: "from-rose-500 to-red-600",
      category: "Household",
    },
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code ${code} copied to clipboard!`);
    setTimeout(() => {
      setCopiedCode(null);
    }, 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Banner Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-white shadow-lg mb-12">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
              <FaBolt className="text-yellow-300" /> Mega Savings Festival
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight">
              Exclusive Grocery Deals & Promo Codes
            </h1>
            <p className="text-green-100 text-sm sm:text-base leading-relaxed mb-6">
              Apply coupon codes during checkout to unlock instant discounts,
              free delivery, and cashback on your everyday essentials.
            </p>
            <Link
              to="/"
              className="inline-block bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors shadow"
            >
              Shop Discounted Items
            </Link>
          </div>

          <div className="absolute right-0 bottom-0 top-0 opacity-10 flex items-center pr-10 pointer-events-none">
            <FaPercentage className="text-[240px]" />
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Available Coupons
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Click "Copy" on any voucher to apply at checkout
              </p>
            </div>
            <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
              <FaTag /> {coupons.length} Offers Live
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map((coupon, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Coupon Header */}
                  <div
                    className={`bg-gradient-to-r ${coupon.bgGradient} p-5 text-white flex justify-between items-start`}
                  >
                    <div>
                      <span className="bg-black/20 text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider font-medium">
                        {coupon.category}
                      </span>
                      <h3 className="text-2xl font-black mt-2">
                        {coupon.discount}
                      </h3>
                    </div>
                    <FaGift className="text-2xl opacity-75" />
                  </div>

                  {/* Coupon Details */}
                  <div className="p-5">
                    <h4 className="font-bold text-gray-800 text-lg mb-1">
                      {coupon.title}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">
                      {coupon.description}
                    </p>

                    <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between text-xs text-gray-500">
                      <span>
                        Min Order:{" "}
                        <strong className="text-gray-700">
                          {coupon.minOrder}
                        </strong>
                      </span>
                      <span>{coupon.expiry}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Code Action */}
                <div className="p-5 pt-0">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 flex items-center justify-between">
                    <span className="font-mono font-bold text-gray-800 tracking-wider px-2">
                      {coupon.code}
                    </span>
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        copiedCode === coupon.code
                          ? "bg-green-600 text-white"
                          : "bg-gray-900 hover:bg-gray-800 text-white"
                      }`}
                    >
                      {copiedCode === coupon.code ? (
                        <>
                          <FaCheck /> Copied
                        </>
                      ) : (
                        <>
                          <FaCopy /> Copy Code
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offer Terms */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            Terms & Conditions for Offers:
          </h3>
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <li>
              Coupons are non-transferable and can only be used once per
              customer unless stated otherwise.
            </li>
            <li>
              Promotional discounts cannot be clubbed with certain storewide
              clearance sales.
            </li>
            <li>
              Blinkeyit reserves the right to modify or withdraw coupon
              promotions at any time without prior notice.
            </li>
            <li>
              Minimum order amount applies to the subtotal before delivery
              charges and taxes.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Offers;
