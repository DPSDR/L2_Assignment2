import { Request, Response } from "express";
import { OrderService } from "./order.services";
import { Order } from "./order.model";
import { Product } from "../product_management/product.model";

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    // Inventory update

    // Fetch the product by its id
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // check if the product has enough stock
    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

    // Reduce the stock by the ordered quantity
    product.inventory.quantity -= quantity;

    // Update the inStock property based on the remaining quantity
    if (product.inventory.quantity <= 0) {
      product.inventory.instock = false;
    }

    // Save the updated product
    await product.save();

    // create the order
    const result = await OrderService.createOrderIntoDB(req.body);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  const searchTerm = req.query;
  try {
    let orders;

    if (searchTerm && searchTerm.email) {
      orders = await Order.find({
        // search orders by email using searchTerm
        email: { $regex: searchTerm.email, $options: "i" },
      });

      res.status(200).json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: orders,
      });
    } else {
      // get all order
      orders = await OrderService.getAllOrderFromDB();

      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: orders,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const OrderController = {
  createNewOrder,
  getAllOrder,
};
