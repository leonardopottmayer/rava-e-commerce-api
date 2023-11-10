import { Request, Response } from "express";
import {
  ResponseWriter,
  ResponseWriterMessage,
} from "../../utils/response-writer";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./models/create-product.dto";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  async createProduct(req: Request, res: Response) {
    const dto = req.body as CreateProductDto;

    const product = await this.productService.createProduct(req.user, dto);

    return ResponseWriter.success(
      res,
      ResponseWriterMessage.Created,
      product,
      201
    );
  }

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    const deletedProduct = await this.productService.deleteProduct(+id);

    return ResponseWriter.success(
      res,
      ResponseWriterMessage.Deleted,
      deletedProduct,
      200
    );
  }
}
