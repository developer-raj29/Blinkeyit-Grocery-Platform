import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import NoData from "../components/NoData";
import AxiosToastError from "../utils/AxiosToastError";
import { toast } from "react-toastify";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.adminAllOrders,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setOrders(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      toast.loading("Updating status...");
      const response = await Axios({
        ...SummaryApi.adminUpdateOrderStatus,
        data: {
          _id: orderId,
          order_status: newStatus,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.dismiss();
        toast.success(responseData.message);
        
        // Update the local state to reflect the new status instantly
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, order_status: newStatus }
              : order
          )
        );
      }
    } catch (error) {
      toast.dismiss();
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md p-4 sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">All Orders (Admin)</h1>
        <p className="font-semibold text-gray-600">Total: {orders.length}</p>
      </div>

      {/* No Orders */}
      {!orders?.length && !loading && (
        <div className="flex justify-center items-center h-[70vh]">
          <NoData />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-[70vh]">
          <p>Loading orders...</p>
        </div>
      )}

      {/* Orders Data Table */}
      {orders?.length > 0 && !loading && (
        <div className="p-4 max-w-7xl mx-auto">
          <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm border-b">
                  <th className="p-4 font-semibold whitespace-nowrap">Order ID</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Customer</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Product</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Total Price</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Payment Type</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Order Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {orders.map((order, index) => {
                  const imageUrl = order?.product_details?.image?.[0];
                  const productName = order?.product_details?.name || "No product name";
                  const price = order?.product_details?.price || order?.totalAmt || 0;
                  const status = order?.order_status || "Processing";
                  const paymentStatus = order?.payment_status || "Unknown";
                  const customerName = order?.userId?.name || "Unknown User";
                  const customerEmail = order?.userId?.email || "No Email";

                  return (
                    <tr
                      key={order._id + index}
                      className="border-b last:border-none hover:bg-blue-50 transition-colors"
                    >
                      <td className="p-4 font-medium text-gray-700 whitespace-nowrap">
                        {order?.orderId}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <p className="font-semibold">{customerName}</p>
                        <p className="text-xs text-gray-500">{customerEmail}</p>
                      </td>
                      <td className="p-4 min-w-[200px]">
                        <div className="flex items-center gap-3">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={productName}
                              className="w-10 h-10 object-cover rounded border"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-200 rounded border flex items-center justify-center text-[10px] text-gray-500">
                              N/A
                            </div>
                          )}
                          <p className="text-gray-800 line-clamp-2">{productName}</p>
                        </div>
                      </td>
                      <td className="p-4 font-semibold whitespace-nowrap">
                        {DisplayPriceInRupees(price)}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium ${
                            paymentStatus === "PAID"
                              ? "bg-green-100 text-green-700"
                              : paymentStatus === "CASH ON DELIVERY"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {paymentStatus}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <select
                          value={status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`px-3 py-1.5 rounded outline-none border font-medium text-sm cursor-pointer hover:shadow-sm focus:ring-2 focus:ring-blue-300 transition-all ${
                            status === "Delivered"
                              ? "bg-green-50 border-green-300 text-green-700"
                              : status === "Shipped"
                              ? "bg-blue-50 border-blue-300 text-blue-700"
                              : status === "Cancelled"
                              ? "bg-red-50 border-red-300 text-red-700"
                              : "bg-yellow-50 border-yellow-300 text-yellow-700"
                          }`}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
