import express from "express";
import { ProductCategoryController } from "./product-category.controller";
import { ensureAuthentication } from "../../middleware/authentication.middleware";
import { ensureRole } from "../../middleware/authorization.middleware";
import { UserRole } from "@prisma/client";

const productCategoryRouter = express.Router();

productCategoryRouter.post(
  "/",
  ensureAuthentication,
  ensureRole([UserRole.Admin]),
  async (req, res) => {
    return new ProductCategoryController().createProductCategory(req, res);
  }
);
productCategoryRouter.delete(
  "/:id",
  ensureAuthentication,
  ensureRole([UserRole.Admin]),
  async (req, res) => {
    return new ProductCategoryController().deleteProductCategory(req, res);
  }
);

export default productCategoryRouter;
