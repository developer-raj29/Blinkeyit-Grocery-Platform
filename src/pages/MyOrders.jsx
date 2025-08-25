import React from "react";
import { useSelector } from "react-redux";
import NoData from "../components/NoData";

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.order);

  console.log("order Items", orders);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-800">My Orders</h1>
      </div>

      {/* No Orders */}
      {!orders?.length && (
        <div className="flex justify-center items-center h-[70vh]">
          <NoData />
        </div>
      )}

      {/* Orders List */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {Array.isArray(orders) &&
          orders.map((order, index) => {
            const imageUrl = order?.product_details?.image[0] || "";
            const productName =
              order?.product_details?.name || "No product name";
            const price = order?.product_details?.price || 0;
            const status = order?.status || "Processing";

            return (
              <div
                key={order._id + index}
                className="bg-white shadow-md rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-lg transition-shadow duration-300"
              >
                {/* Product Details */}
                <div className="flex gap-4 items-center">
                  <img
                    src={imageUrl}
                    alt={productName}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{productName}</p>
                    <p className="text-gray-500 text-sm">
                      Order No: {order?.orderId}
                    </p>
                    <p className="text-gray-700 font-medium">₹{price}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-3 sm:mt-0">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyOrders;
