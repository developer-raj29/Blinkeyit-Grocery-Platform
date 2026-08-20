export const baseURL = import.meta.env.VITE_API_URL;

const SummaryApi = {
  register: {
    url: "/api/auth/register",
    method: "post",
  },
  login: {
    url: "/api/auth/login",
    method: "post",
  },
  googleLogin: {
    url: "/api/auth/google",
    method: "post",
  },
  verifyEmail: {
    url: "/api/auth/verify-email",
    method: "post",
  },
  forgot_password: {
    url: "/api/auth/forgot-password",
    method: "put",
  },
  forgot_password_otp_verification: {
    url: "api/auth/verify-forgot-password-otp",
    method: "put",
  },
  resetPassword: {
    url: "/api/auth/reset-password",
    method: "put",
  },
  refreshToken: {
    url: "api/auth/refresh-token",
    method: "post",
  },
  userDetails: {
    url: "/api/user/user-details",
    method: "get",
  },
  logout: {
    url: "/api/auth/logout",
    method: "get",
  },
  uploadAvatar: {
    url: "/api/user/upload-avatar",
    method: "put",
  },
  updateUserDetails: {
    url: "/api/user/update-user",
    method: "put",
  },
  addCategory: {
    url: "/api/category/add-category",
    method: "post",
  },
  uploadImage: {
    url: "/api/file/upload",
    method: "post",
  },
  getCategory: {
    url: "/api/category/get",
    method: "get",
  },
  updateCategory: {
    url: "/api/category/update",
    method: "put",
  },
  deleteCategory: {
    url: "/api/category/delete",
    method: "delete",
  },
  createSubCategory: {
    url: "/api/subcategory/create",
    method: "post",
  },
  getSubCategory: {
    url: "/api/subcategory/get",
    method: "get",
  },
  updateSubCategory: {
    url: "/api/subcategory/update",
    method: "put",
  },
  deleteSubCategory: {
    url: "/api/subcategory/delete",
    method: "delete",
  },
  createProduct: {
    url: "/api/product/create",
    method: "post",
  },
  getProduct: {
    url: "/api/product/get",
    method: "get",
  },
  getProductByCategory: {
    url: "/api/product/get-product-by-category",
    method: "get",
  },
  getProductByCategoryAndSubCategory: {
    url: "/api/product/get-product-by-category-and-subcategory",
    method: "get",
  },
  getProductDetails: {
    url: "/api/product/get-product-details",
    method: "get",
  },
  updateProductDetails: {
    url: "/api/product/update-product-details",
    method: "put",
  },
  deleteProduct: {
    url: "/api/product/delete-product",
    method: "delete",
  },
  searchProduct: {
    url: "/api/product/search-product",
    method: "get",
  },
  addTocart: {
    url: "/api/cart/create",
    method: "post",
  },
  getCartItem: {
    url: "/api/cart/get",
    method: "get",
  },
  updateCartItemQty: {
    url: "/api/cart/update-qty",
    method: "put",
  },
  deleteCartItem: {
    url: "/api/cart/delete-cart-item",
    method: "delete",
  },
  createAddress: {
    url: "/api/address/create",
    method: "post",
  },
  getAddress: {
    url: "/api/address/get",
    method: "get",
  },
  updateAddress: {
    url: "/api/address/update",
    method: "put",
  },
  disableAddress: {
    url: "/api/address/disable",
    method: "delete",
  },
  CashOnDeliveryOrder: {
    url: "/api/order/cash-on-delivery",
    method: "post",
  },
  payment_url: {
    url: "/api/order/checkout",
    method: "post",
  },
  getOrderItems: {
    url: "/api/order/order-list",
    method: "get",
  },
  adminAllOrders: {
    url: "/api/order/admin/all-orders",
    method: "get",
  },
  adminUpdateOrderStatus: {
    url: "/api/order/admin/update-status",
    method: "patch",
  },
};

export default SummaryApi;
