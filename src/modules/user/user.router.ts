import express from "express";
import { ensureAuthentication } from "../../middleware/authentication.middleware";
import { UserController } from "./user.controller";

const userRouter = express.Router();

userRouter.get("/:id", ensureAuthentication, async (req, res) => {
  return new UserController().getUserById(req, res);
});

export default userRouter;
