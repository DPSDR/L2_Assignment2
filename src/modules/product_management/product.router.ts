import express from "express";
import { ProductControlers } from "./product.controller";

const router = express.Router();

// route for creating products
router.post("/products", ProductControlers.createProduct);

// route for get the product data
router.get("/products", ProductControlers.getAllProduct);

// route for getting specifc data through id
router.get("/products/:productId", ProductControlers.getSingleProduct);

// find the product and update
router.put("/products/:productId", ProductControlers.updateProduct);

// delete a product
router.delete("/products/:productId", ProductControlers.deleteProduct);

export const ProductRoutes = router;
