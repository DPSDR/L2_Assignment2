import express from "express";
import { ProductControlers } from "./product.controller";

const router = express.Router();

router.post("/products", ProductControlers.createProduct);

export const ProductRoutes = router;
