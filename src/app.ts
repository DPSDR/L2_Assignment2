import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./modules/product.router";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!!");
});

export default app;
