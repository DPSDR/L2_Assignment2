import { model, Schema } from "mongoose";
import { TInventory, TProduct, TVarients } from "./product.interface";

// Mongoose schema for TVarients
const VariantSchema = new Schema<TVarients>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

// Mongoose schema for TInventory
const InventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, default: true, required: true },
});

// Mongoose schema for TProduct
const ProductSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [VariantSchema], required: true },
  inventory: { type: InventorySchema, required: true },
});

// create a model
export const Product = model<TProduct>("Product", ProductSchema);
