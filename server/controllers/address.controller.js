const AddressModel = require("../models/address.model");
const UserModel = require("../models/user.model");

/**
 * @description Add Address
 * @route POST /api/address/create
 */
const addAddressController = async (request, response) => {
  try {
    const userId = request.userId; // middleware
    const { address_line, city, state, pincode, country, mobile } =
      request.body;

    const createAddress = new AddressModel({
      address_line,
      city,
      state,
      country,
      pincode,
      mobile,
      userId: userId,
    });
    const saveAddress = await createAddress.save();

    await UserModel.findByIdAndUpdate(userId, {
      $push: {
        address_details: saveAddress._id,
      },
    });

    return response.status(201).json({
      success: true,
      error: false,
      message: "Address Created Successfully",
      data: saveAddress,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

/**
 * @description Get Address
 * @route GET /api/address/get
 */
const getAddressController = async (request, response) => {
  try {
    const userId = request.userId; // middleware auth

    const data = await AddressModel.find({ userId: userId }).sort({
      createdAt: -1,
    });

    return response.status(200).json({
      success: true,
      error: false,
      message: "List of address",
      data: data,
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
 * @description Update Address
 * @route PUT /api/address/update
 */
const updateAddressController = async (request, response) => {
  try {
    const userId = request.userId; // middleware auth
    const { _id, address_line, city, state, country, pincode, mobile } =
      request.body;

    const updateAddress = await AddressModel.updateOne(
      { _id: _id, userId: userId },
      {
        address_line,
        city,
        state,
        country,
        mobile,
        pincode,
      }
    );

    return response.json({
      success: true,
      error: false,
      message: "Address Updated",
      data: updateAddress,
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
 * @description Delete Address
 * @route DELETE /api/address/disable
 */
const deleteAddresscontroller = async (request, response) => {
  try {
    const userId = request.userId; // auth middleware
    const { _id } = request.body;

    const disableAddress = await AddressModel.updateOne(
      { _id: _id, userId },
      {
        status: false,
      }
    );

    return response.json({
      success: true,
      error: false,
      message: "Address remove",
      data: disableAddress,
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
  addAddressController,
  getAddressController,
  updateAddressController,
  deleteAddresscontroller,
};
