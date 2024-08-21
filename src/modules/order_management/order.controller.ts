import { Request, Response } from "express";
import { OrderService } from "./order.services";
import { Order } from "./order.model";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const result = await OrderService.createOrderIntoDB(order);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  const searchTerm = req.query;
  console.log(searchTerm.email);
  try {
    let orders;

    if (searchTerm) {
      orders = await Order.find({
        // search orders by email using searchTerm
        email: { $regex: searchTerm.email, $options: "i" }, // 'i' makes the search case-insensitive
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
      success: true,
      message: error.message,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrder,
};
