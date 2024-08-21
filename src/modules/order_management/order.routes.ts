import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

// create a new order
router.post("/orders", OrderController.createOrder);

// get all order
router.get("/orders", OrderController.getAllOrder);

export const OrderRoutes = router;
