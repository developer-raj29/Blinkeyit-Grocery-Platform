const mongoose = require("mongoose");
const Stripe = require("../config/stripe.js");
const CartProductModel = require("../models/cartProduct.model.js");
const OrderModel = require("../models/order.model.js");
const UserModel = require("../models/user.model.js");

/**
 * @description Cash On Delivery Order
 * @route POST /api/order/cash-on-delivery
 */
const CashOnDeliveryOrderController = async (request, response) => {
  try {
    const userId = request.userId; // From auth middleware
    const { list_items, addressId, totalAmt, subTotalAmt } = request.body;

    if (!list_items?.length) {
      return response.status(400).json({
        message: "No items found in order request",
        error: true,
        success: false,
      });
    }

    if (!addressId) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Delivery address is required",
      });
    }

    // Build order payload
    const payload = list_items.map((el) => ({
      userId,
      orderId: `ORD-${new mongoose.Types.ObjectId().toString().slice(-6)}`, // shorter readable ID
      productId: el.productId._id,
      product_details: {
        name: el.productId.name,
        image: el.productId.image,
        price: el.productId.price,
      },
      paymentId: "",
      payment_status: "CASH ON DELIVERY",
      delivery_address: addressId,
      subTotalAmt,
      totalAmt,
      status: "Processing", // ✅ track order status
      createdAt: new Date(),
    }));

    const session = await mongoose.startSession();

    try {
      let generatedOrders;
      await session.withTransaction(async () => {
        // Save orders in bulk
        generatedOrders = await OrderModel.insertMany(payload, { session });

        // Remove ordered items from cart
        await CartProductModel.deleteMany({ userId }, { session });
        await UserModel.updateOne({ _id: userId }, { shopping_cart: [] }, { session });
      });

      session.endSession();

      return response.status(201).json({
        success: true,
        error: false,
        message: "Order placed successfully with Cash on Delivery",
        data: generatedOrders,
      });
    } catch (dbError) {
      session.endSession();
      throw dbError;
    }
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

const pricewithDiscount = (price, dis = 1) => {
  const discountAmout = Math.ceil((Number(price) * Number(dis)) / 100);
  const actualPrice = Number(price) - Number(discountAmout);
  return actualPrice;
};

/**
 * @description Payment
 * @route POST /api/order/checkout
 */
const paymentController = async (request, response) => {
  try {
    const userId = request.userId; // auth middleware
    const { list_items, addressId } = request.body;

    const user = await UserModel.findById(userId);

    const line_items = list_items.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.productId.name,
            images: item.productId.image,
            metadata: {
              productId: item.productId._id,
            },
          },
          unit_amount:
            pricewithDiscount(item.productId.price, item.productId.discount) *
            100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      };
    });

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      metadata: {
        userId: userId,
        addressId: addressId,
      },
      line_items: line_items,
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await Stripe.checkout.sessions.create(params);
    console.log("session: ", session);

    return response.status(202).json(session);
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

const getOrderProductItems = async ({
  lineItems,
  userId,
  addressId,
  paymentId,
  payment_status,
}) => {
  const productList = [];

  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await Stripe.products.retrieve(item.price.product);

      const paylod = {
        userId: userId,
        orderId: `ORD-${new mongoose.Types.ObjectId()}`,
        productId: product.metadata.productId,
        product_details: {
          name: product.name,
          image: product.images,
          price: Number(item.price.unit_amount / 100)
        },
        paymentId: paymentId,
        payment_status: payment_status,
        delivery_address: addressId,
        subTotalAmt: Number(item.amount_total / 100),
        totalAmt: Number(item.amount_total / 100),
      };

      productList.push(paylod);
    }
  }

  return productList;
};

/**
 * @description Webhook Stripe
 * @route POST /api/order/webhook
 */
const webhookStripe = async (request, response) => {
  const sig = request.headers['stripe-signature'];
  const endPointSecret = process.env.STRIPE_ENPOINT_WEBHOOK_SECRET_KEY;
  let event;

  try {
    event = Stripe.webhooks.constructEvent(request.body, sig, endPointSecret);
  } catch (err) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("✅ Webhook event verified:", event.type);

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const stripeSession = event.data.object;
      const lineItems = await Stripe.checkout.sessions.listLineItems(
        stripeSession.id
      );

      console.log("lineItems: ", lineItems);

      const userId = stripeSession.metadata.userId;
      const orderProduct = await getOrderProductItems({
        lineItems: lineItems,
        userId: userId,
        addressId: stripeSession.metadata.addressId,
        paymentId: stripeSession.payment_intent,
        payment_status: stripeSession.payment_status,
      });

      console.log("orderProduct: ", orderProduct);

      const dbSession = await mongoose.startSession();
      try {
        await dbSession.withTransaction(async () => {
          const order = await OrderModel.insertMany(orderProduct, { session: dbSession });

          console.log("order: ", order);
          if (order[0]) {
            await UserModel.findByIdAndUpdate(userId, {
              shopping_cart: [],
            }, { session: dbSession });
            await CartProductModel.deleteMany({
              userId: userId,
            }, { session: dbSession });
          }
        });
      } finally {
        dbSession.endSession();
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });
};

/**
 * @description Get Order Details
 * @route GET /api/order/order-list
 */
const getOrderDetailsController = async (request, response) => {
  try {
    const userId = request.userId; // order id

    const orderlist = await OrderModel.find({ userId: userId })
      .sort({ createdAt: -1 })
      .populate("delivery_address");

    return response.json({
      message: "order list",
      data: orderlist,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};
/**
 * @description Get All Orders (Admin)
 * @route GET /api/order/admin/all-orders
 */
const getAllOrdersController = async (request, response) => {
  try {
    const orderlist = await OrderModel.find()
      .sort({ createdAt: -1 })
      .populate("delivery_address")
      .populate("userId", "name email");

    return response.json({
      success: true,
      error: false,
      message: "all order list",
      data: orderlist,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

/**
 * @description Update Order Status (Admin)
 * @route PATCH /api/order/admin/update-status
 */
const updateOrderStatusController = async (request, response) => {
  try {
    const { _id, order_status } = request.body;
    
    if (!_id || !order_status) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Order ID and Status are required",
      });
    }

    const updateOrder = await OrderModel.findByIdAndUpdate(
      _id,
      { order_status: order_status },
      { new: true }
    );

    return response.json({
      success: true,
      error: false,
      message: "Order status updated successfully",
      data: updateOrder,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = {
  CashOnDeliveryOrderController,
  paymentController,
  webhookStripe,
  getOrderDetailsController,
  getAllOrdersController,
  updateOrderStatusController,
};


