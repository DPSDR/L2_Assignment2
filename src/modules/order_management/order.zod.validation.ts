import { z } from "zod";

// zod schema for order
const OrderSchema = z.object({
  email: z.string().trim().email().min(1, "Email is requires"),
  productId: z.string().trim().min(1, "ProductId is requires"),
  price: z.number().min(1, "Price is required"),
  quantity: z.number().min(1, "Quantity is required"),
});

export default OrderSchema;
