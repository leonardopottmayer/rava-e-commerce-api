import { Request, Response } from "express";
import {
  ResponseWriter,
  ResponseWriterMessage,
} from "../../utils/response-writer";
import { ProductInCartService } from "./product-in-cart.service";
import { AddProductToCartDto } from "./models/add-product-to-cart.dto";
import { UpdateProductInCartDto } from "./models/update-product-in-cart.dto";

export class ProductInCartController {
  private productInCartService: ProductInCartService;

  constructor() {
    this.productInCartService = new ProductInCartService();
  }

  async addProductToCart(req: Request, res: Response) {
    const dto = req.body as AddProductToCartDto;

    const product = await this.productInCartService.addProductToCart(
      req.user,
      dto
    );

    return ResponseWriter.success(
      res,
      ResponseWriterMessage.Created,
      product,
      201
    );
  }

  async removeProductFromCart(req: Request, res: Response) {
    const { id } = req.params;

    const deletedProduct =
      await this.productInCartService.removeProductFromCart(req.user, +id);

    return ResponseWriter.success(
      res,
      ResponseWriterMessage.Deleted,
      deletedProduct,
      200
    );
  }

  async updateProductInCart(req: Request, res: Response) {
    const dto = req.body as UpdateProductInCartDto;
    const { id } = req.params;

    const updatedProduct = await this.productInCartService.updateProductInCart(
      req.user,
      +id,
      dto
    );

    return ResponseWriter.success(
      res,
      ResponseWriterMessage.Updated,
      updatedProduct,
      200
    );
  }

  async getProductInCartById(req: Request, res: Response) {
    const { id } = req.params;

    const fetchedProduct = await this.productInCartService.getProductInCartById(
      req.user,
      +id
    );

    return ResponseWriter.success(
      res,
      ResponseWriterMessage.Queried,
      fetchedProduct,
      200
    );
  }

  async getAllProductsInCart(req: Request, res: Response) {
    const fetchedProducts =
      await this.productInCartService.getAllProductsInCart(req.user);

    return ResponseWriter.success(
      res,
      ResponseWriterMessage.Queried,
      fetchedProducts,
      200
    );
  }
}
