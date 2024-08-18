import express from "express";
import { ProductControlers } from "./product.controller";

const router = express.Router();

// route for creating products
router.post("/products", ProductControlers.createProduct);

// route for get the product data
router.get("/products", ProductControlers.findProduct);

export const ProductRoutes = router;
