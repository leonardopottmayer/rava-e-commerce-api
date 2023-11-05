import express from "express";
import userRouter from "../modules/user/user.router";

export const appRouter = express.Router();

appRouter.use("/user", userRouter);
