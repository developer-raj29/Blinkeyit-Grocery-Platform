const CartProductModel = require("../models/cartProduct.model.js");
const UserModel = require("../models/user.model.js");

/**
 * @description Add To Cart Item
 * @route POST /api/cart/create
 */
const addToCartItemController = async (request, response) => {
  try {
    const userId = request.userId;
    const { productId } = request.body;

    if (!productId) {
      return response.status(402).json({
        message: "Provide productId",
        error: true,
        success: false,
      });
    }

    const checkItemCart = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkItemCart) {
      return response.status(400).json({
        message: "Item already in cart",
      });
    }

    const cartItem = new CartProductModel({
      quantity: 1,
      userId: userId,
      productId: productId,
    });
    const save = await cartItem.save();

    await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );

    return response.status(201).json({
      success: true,
      error: false,
      message: "Item add successfully",
      data: save,
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
 * @description Get Cart Item
 * @route GET /api/cart/get
 */
const getCartItemController = async (request, response) => {
  try {
    const userId = request.userId;

    const cartItem = await CartProductModel.find({
      userId: userId,
    }).populate("productId");

    return response.json({
      success: true,
      error: false,
      data: cartItem,
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
 * @description Update Cart Item Qty
 * @route PUT /api/cart/update-qty
 */
const updateCartItemQtyController = async (request, response) => {
  try {
    const userId = request.userId;
    const { _id, qty } = request.body;

    if (!_id || !qty) {
      return response.status(400).json({
        message: "provide _id, qty",
      });
    }

    const updateCartitem = await CartProductModel.updateOne(
      {
        _id: _id,
        userId: userId,
      },
      {
        quantity: qty,
      }
    );

    return response.json({
      success: true,
      error: false,
      message: "Update cart",
      data: updateCartitem,
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
 * @description Delete Cart Item Qty
 * @route DELETE /api/cart/delete-cart-item
 */
const deleteCartItemQtyController = async (request, response) => {
  try {
    const userId = request.userId; // middleware
    const { _id } = request.body;

    if (!_id) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Provide _id",
      });
    }

    const deleteCartItem = await CartProductModel.deleteOne({
      _id: _id,
      userId: userId,
    });

    return response.json({
      success: true,
      error: false,
      message: "Item remove",
      data: deleteCartItem,
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
  addToCartItemController,
  getCartItemController,
  updateCartItemQtyController,
  deleteCartItemQtyController,
};

