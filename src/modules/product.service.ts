import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const findProductFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProduct = async (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id);
  const result = await Product.findById(objectId);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  findProductFromDB,
  getSingleProduct,
};
