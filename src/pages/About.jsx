import { Link } from "react-router-dom";
import {
  FaRocket,
  FaLeaf,
  FaShieldAlt,
  FaUsers,
  FaTruck,
  FaHeart,
  FaAward,
  FaCheckCircle,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="text-green-600 font-semibold tracking-wide uppercase text-sm bg-green-100 px-3 py-1 rounded-full">
            Our Story & Mission
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mt-4 mb-6 leading-tight">
            Fast, Fresh & Reliable <br />
            <span className="text-green-600">Groceries at Your Doorstep</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Blinkeyit is designed to simplify your everyday life. We bring
            farm-fresh produce, household essentials, and daily staples right to
            your home in just minutes.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Products Catalog", value: "10,000+", icon: FaLeaf },
            {
              label: "Minutes Average Delivery",
              value: "10-15 Min",
              icon: FaTruck,
            },
            { label: "Happy Customers", value: "500K+", icon: FaUsers },
            { label: "Freshness Quality", value: "100%", icon: FaAward },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl">
                  <Icon />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Who We Are Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Redefining Instant Grocery Delivery
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded with the vision to make fresh food and household
                necessities accessible without the hassle of long supermarket
                queues, Blinkeyit combines cutting-edge logistics with curated
                local sourcing.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                From morning milk and organic veggies to late-night snack
                cravings, our localized dark stores ensure every item is
                hand-picked for quality and delivered safely.
              </p>

              <div className="space-y-3">
                {[
                  "Direct sourcing from verified local farms & producers",
                  "Strict multi-step hygiene & freshness checks",
                  "Eco-friendly packaging and optimized delivery routes",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <FaRocket className="text-3xl text-green-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">
                  Lightning Speed
                </h3>
                <p className="text-xs text-gray-600">
                  Smart micro-warehouses located in your neighborhood.
                </p>
              </div>
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                <FaShieldAlt className="text-3xl text-amber-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Safe & Secure</h3>
                <p className="text-xs text-gray-600">
                  100% contactless delivery and secure payment gateways.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <FaLeaf className="text-3xl text-blue-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Farm Fresh</h3>
                <p className="text-xs text-gray-600">
                  Daily restocked vegetables, fruits, and dairy.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                <FaHeart className="text-3xl text-purple-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Customer First</h3>
                <p className="text-xs text-gray-600">
                  24/7 dedicated support for zero-friction experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 sm:p-12 text-center text-white shadow-lg">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">
            Ready to experience effortless grocery shopping?
          </h2>
          <p className="text-green-100 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Join thousands of happy households today. Explore our wide range of
            products and enjoy instant doorstep delivery.
          </p>
          <Link
            to="/"
            className="inline-block bg-white text-green-700 font-bold px-8 py-3.5 rounded-full hover:bg-green-50 transition-colors shadow-md"
          >
            Start Shopping Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
