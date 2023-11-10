import express from "express";
import userRouter from "../modules/user/user.router";
import authRouter from "../modules/auth/auth.router";
import productCategoryRouter from "../modules/productCategory/product-category.router";
import productRouter from "../modules/product/product.router";

export const appRouter = express.Router();

appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter);
appRouter.use("/productCategory", productCategoryRouter);
appRouter.use("/product", productRouter);
