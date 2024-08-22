import { z } from "zod";

// Zod schema for Variants (TVarients)
const VariantSchema = z.object({
  type: z.string().trim().min(1, "Variant type is required"),
  value: z.string().trim().min(1, "Variant value is required"),
});

// Zod schema for Inventory (TInventory)
const InventorySchema = z.object({
  quantity: z.number().min(0, "Quantity must be greater than or equal to 0"),
  inStock: z.boolean(),
});

// Zod schema for Product (TProduct)
const ProductSchema = z.object({
  name: z.string().max(20).trim().min(1, "Product name is required"),
  description: z.string().trim().min(1, "Description is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  category: z.string().trim().min(1, "Category is required"),
  tags: z.array(z.string().min(1, "Tags must be non-empty strings")),
  variants: z.array(VariantSchema),
  inventory: InventorySchema,
});

export { ProductSchema };
