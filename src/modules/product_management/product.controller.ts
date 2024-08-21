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

/* const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    // If the request contains inventory updates with quantity changes
    if (updates.inventory && updates.inventory.quantity !== undefined) {
      const quantityChange = updates.inventory.quantity; // The change value from the request body

      // Update the quantity using aggregation logic
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: productId },
        [
          {
            $set: {
              "inventory.quantity": {
                $add: ["$inventory.quantity", quantityChange], // Add the existing quantity with the change value
              },
              "inventory.inStock": {
                $cond: {
                  if: {
                    $gt: [{ $add: ["$inventory.quantity", quantityChange] }, 0],
                  },
                  then: true,
                  else: false,
                },
              },
            },
          },
        ],
        { new: true, runValidators: true }
      );

      // Handle no product found
      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found!",
        });
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: updatedProduct,
      });
    } else {
      // If no inventory quantity changes, just update the other fields normally
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: updates },
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found!",
        });
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: updatedProduct,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}; */

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
};
