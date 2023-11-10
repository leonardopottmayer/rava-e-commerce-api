import express from "express";
import { ensureAuthentication } from "../../middleware/authentication.middleware";
import { ensureRole } from "../../middleware/authorization.middleware";
import { UserRole } from "@prisma/client";
import { ProductInCartController } from "./product-in-cart.controller";

const productInCartRouter = express.Router();

productInCartRouter.post(
  "/",
  ensureAuthentication,
  ensureRole([UserRole.Default]),
  async (req, res) => {
    return new ProductInCartController().addProductToCart(req, res);
  }
);
productInCartRouter.delete(
  "/:id",
  ensureAuthentication,
  ensureRole([UserRole.Default]),
  async (req, res) => {
    return new ProductInCartController().removeProductFromCart(req, res);
  }
);
productInCartRouter.patch(
  "/:id",
  ensureAuthentication,
  ensureRole([UserRole.Default]),
  async (req, res) => {
    return new ProductInCartController().updateProductInCart(req, res);
  }
);
productInCartRouter.get(
  "/:id",
  ensureAuthentication,
  ensureRole([UserRole.Default]),
  async (req, res) => {
    return new ProductInCartController().getProductInCartById(req, res);
  }
);
productInCartRouter.get(
  "/",
  ensureAuthentication,
  ensureRole([UserRole.Admin]),
  async (req, res) => {
    return new ProductInCartController().getAllProductsInCart(req, res);
  }
);

export default productInCartRouter;
