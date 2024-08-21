import express, { Application, Request, Response } from "express";
import cors from "cors";
import { OrderRoutes } from "./modules/order_management/order.routes";
import { ProductRoutes } from "./modules/product_management/product.router";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", ProductRoutes);
app.use("/api", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!!");
});

export default app;
