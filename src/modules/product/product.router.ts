import express from "express";
import { ensureAuthentication } from "../../middleware/authentication.middleware";
import { ensureRole } from "../../middleware/authorization.middleware";
import { UserRole } from "@prisma/client";
import { ProductController } from "./product.controller";

const productRouter = express.Router();

productRouter.post(
  "/",
  ensureAuthentication,
  ensureRole([UserRole.Admin]),
  async (req, res) => {
    return new ProductController().createProduct(req, res);
  }
);
productRouter.delete(
  "/:id",
  ensureAuthentication,
  ensureRole([UserRole.Admin]),
  async (req, res) => {
    return new ProductController().deleteProduct(req, res);
  }
);
productRouter.patch(
  "/:id",
  ensureAuthentication,
  ensureRole([UserRole.Admin]),
  async (req, res) => {
    return new ProductController().updateProduct(req, res);
  }
);
productRouter.get("/:id", ensureAuthentication, async (req, res) => {
  return new ProductController().getProductById(req, res);
});
productRouter.get("/", ensureAuthentication, async (req, res) => {
  return new ProductController().getAllProducts(req, res);
});

export default productRouter;
