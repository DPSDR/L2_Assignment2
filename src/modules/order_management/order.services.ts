import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};

const getAllOrderFromDB = async () => {
  const result = await Order.find();
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getAllOrderFromDB,
};
