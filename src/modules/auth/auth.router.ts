import express from "express";
import { AuthController } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  return new AuthController().register(req, res);
});
authRouter.post("/login", async (req, res) => {
  return new AuthController().login(req, res);
});

export default authRouter;
