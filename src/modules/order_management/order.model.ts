import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

// mongoose schema for order
const OrderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// create a model
export const Order = model<TOrder>("Order", OrderSchema);
