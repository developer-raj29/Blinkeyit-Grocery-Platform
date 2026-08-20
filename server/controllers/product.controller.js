const ProductModel = require("../models/product.model.js");
const { redisClient } = require("../config/redis.js");

/**
 * @description Create Product
 * @route [Route]
 */
const createProductController = async (request, response) => {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    } = request.body;

    if (
      !name ||
      !image[0] ||
      !category[0] ||
      !subCategory[0] ||
      !unit ||
      !price ||
      !description
    ) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Enter required fields",
      });
    }

    const product = new ProductModel({
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    });

    const saveProduct = await product.save();

    if (redisClient.isReady && category && category.length > 0) {
      const keys = category.map((id) => `products:cat:${id.toString()}`);
      await redisClient.del(keys);
    }

    return response.status(201).json({
      success: true,
      error: false,
      message: "Product Created Successfully",
      data: saveProduct,
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
 * @description Get Product
 * @route [Route]
 */
const getProductController = async (request, response) => {
  try {
    let { page = 1, limit = 12, search = "" } = request.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 12;

    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category subCategory"),
      ProductModel.countDocuments(query),
    ]);

    return response.status(200).json({
      success: true,
      error: false,
      currentPage: page,
      totalNoPage: Math.ceil(totalCount / limit),
      totalCount,
      message: "Product data",
      data,
    });
  } catch (error) {
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message || error,
    });
  }
};

/**
 * @description Get Product By Category
 * @route [Route]
 */
const getProductByCategory = async (request, response) => {
  try {
    const { id } = request.query;

    if (!id) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Please provide a category ID.",
      });
    }

    // Ensure `id` is used with $in properly if it's not an array
    const query = Array.isArray(id) ? { $in: id } : id;
    const cacheKey = `products:cat:${Array.isArray(id) ? id.join(",") : id}`;

    if (redisClient.isReady) {
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        console.log("[CACHE HIT] Products by Category");
        return response.status(200).json({
          success: true,
          error: false,
          caching: true,
          message: "Category product list fetched successfully.",
          data: JSON.parse(cached),
        });
      }
    }

    console.log("[CACHE MISS] Products by Category");

    const products = await ProductModel.find({
      category: query,
    }).limit(15);

    if (redisClient.isReady && products && products.length > 0) {
      await redisClient.set(cacheKey, JSON.stringify(products), { EX: 3600 });
    }

    return response.status(200).json({
      success: true,
      error: false,
      caching: false,
      message: "Category product list fetched successfully.",
      data: products,
    });
  } catch (error) {
    console.error("getProductByCategory Error:", error);
    return response.status(500).json({
      message: error.message || "Something went wrong.",
      error: true,
      success: false,
    });
  }
};

/**
 * @description Get Product By Category And Sub Category
 * @route [Route]
 */
const getProductByCategoryAndSubCategory = async (request, response) => {
  try {
    let { categoryId, subCategoryId, page, limit } = request.query;

    if (!categoryId || !subCategoryId) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Provide categoryId and subCategoryId",
      });
    }

    // Ensure both are arrays and trim whitespace
    if (typeof categoryId === "string") categoryId = categoryId.split(",");
    if (typeof subCategoryId === "string") subCategoryId = subCategoryId.split(",");

    if (!Array.isArray(categoryId)) categoryId = [categoryId];
    if (!Array.isArray(subCategoryId)) subCategoryId = [subCategoryId];

    categoryId = categoryId.map((id) => id.trim());
    subCategoryId = subCategoryId.map((id) => id.trim());

    page = Number(page) || 1;
    limit = Number(limit) || 10;

    const query = {
      category: { $in: categoryId },
      subCategory: { $in: subCategoryId },
    };

    const skip = (page - 1) * limit;

    const [data, dataCount] = await Promise.all([
      ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ProductModel.countDocuments(query),
    ]);

    return response.status(200).json({
      success: true,
      error: false,
      page: page,
      limit: limit,
      totalCount: dataCount,
      message: "Product list",
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
 * @description Get Product Details
 * @route [Route]
 */
const getProductDetails = async (request, response) => {
  try {
    const { productId } = request.query;
    const cacheKey = `product:details:${productId}`;

    if (redisClient.isReady) {
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        console.log("[CACHE HIT] Product Details");
        return response.status(200).json({
          success: true,
          error: false,
          caching: true,
          message: "product details",
          data: JSON.parse(cached),
        });
      }
    }

    console.log("[CACHE MISS] Product Details");

    const product = await ProductModel.findOne({ _id: productId });

    if (redisClient.isReady && product) {
      await redisClient.set(cacheKey, JSON.stringify(product), { EX: 3600 });
    }

    return response.status(200).json({
      success: true,
      error: false,
      caching: false,
      data: product,
      message: "product details",
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
 * @description Update Product Details
 * @route [Route]
 */
const updateProductDetails = async (request, response) => {
  try {
    const { _id } = request.body;

    if (!_id) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "provide product _id",
      });
    }

    const oldProduct = await ProductModel.findById(_id);

    const updateProduct = await ProductModel.updateOne(
      { _id: _id },
      {
        ...request.body,
      }
    );

    if (redisClient.isReady && oldProduct) {
      const keys = oldProduct.category.map((c) => `products:cat:${c.toString()}`);
      if (request.body.category) {
        const newCats = Array.isArray(request.body.category) ? request.body.category : [request.body.category];
        newCats.forEach((c) => keys.push(`products:cat:${c.toString()}`));
      }
      keys.push(`product:details:${_id}`);
      await redisClient.del([...new Set(keys)]);
    }

    return response.status(200).json({
      success: true,
      error: false,
      message: "updated successfully",
      data: updateProduct,
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
 * @description Delete Product Details
 * @route [Route]
 */
const deleteProductDetails = async (request, response) => {
  try {
    const { _id } = request.body;

    if (!_id) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "provide _id ",
      });
    }

    const oldProduct = await ProductModel.findById(_id);

    const deleteProduct = await ProductModel.deleteOne({ _id: _id });

    if (redisClient.isReady && oldProduct) {
      const keys = oldProduct.category.map((c) => `products:cat:${c.toString()}`);
      keys.push(`product:details:${_id}`);
      await redisClient.del(keys);
    }

    return response.status(200).json({
      success: true,
      error: false,
      message: "Delete successfully",
      data: deleteProduct,
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
 * @description Search Product
 * @route [Route]
 */
const searchProduct = async (request, response) => {
  try {
    let { search, page, limit } = request.query;

    page = Number(page) || 1;
    limit = Number(limit) || 10;

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const skip = (page - 1) * limit;

    const [data, dataCount] = await Promise.all([
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category subCategory"),
      ProductModel.countDocuments(query),
    ]);

    return response.status(200).json({
      success: true,
      error: false,
      page: page,
      limit: limit,
      totalPage: Math.ceil(dataCount / limit),
      totalCount: dataCount,
      message: "Product data",
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

module.exports = {
  createProductController,
  getProductController,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  getProductDetails,
  updateProductDetails,
  deleteProductDetails,
  searchProduct,
};
