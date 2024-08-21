import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { Product } from "./product.model";

// create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;

    // call service to create data
    const result = await ProductServices.createProductIntoDB(product);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

// find all products and use searchTerm
const getAllProduct = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm;
  try {
    let products;

    if (searchTerm) {
      // Search products by name using the search term
      products = await Product.find({
        name: { $regex: searchTerm, $options: "i" }, // 'i' makes the search case-insensitive
      });
    } else {
      // Get all products
      products = await Product.find();
    }

    res.json({
      success: true,
      message: "Products retrieved successfully!",
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

// find a single product with id
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.getSingleProduct(productId);

    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

// update a product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const product = await ProductServices.getSingleProduct(productId);

    let updatedInventory: number;
    // updatedInventory -= product?.inventory.quantity
    updatedInventory = product?.inventory.quantity - 1;

    const updateResult = await Product.findByIdAndUpdate(
      { _id: productId },
      [
        {
          $set: {
            "inventory.quantity": updatedInventory,
          },
        },
      ],
      { new: true }
    );

    res.status(200).json({
      success: true,
      messange: "Product updated successfully!",
      data: updateResult,
    });
  } catch (err: any) {
    // Handle any errors that occur during the update
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// delete a product from db
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.deleteProduct(productId);

    if (result.deletedCount === 1) {
      res.json({
        success: true,
        message: "Product deleted successfully!",
        data: null,
      });
    } else {
      res.json({
        success: false,
        message: "Product not found!",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

export const ProductControlers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
