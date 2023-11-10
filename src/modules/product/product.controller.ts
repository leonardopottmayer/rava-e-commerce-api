import { Request, Response } from "express";
import {
  ResponseWriter,
  ResponseWriterMessage,
} from "../../utils/response-writer";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./models/create-product.dto";
import { UpdateProductDto } from "./models/update-product.dto";

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

  async updateProduct(req: Request, res: Response) {
    const dto = req.body as UpdateProductDto;
    const { id } = req.params;

    const updatedProduct = await this.productService.updateProduct(
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

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;

    const fetchedProduct = await this.productService.getProductById(+id);

    return ResponseWriter.success(
      res,
      ResponseWriterMessage.Queried,
      fetchedProduct,
      200
    );
  }

  async getAllProducts(req: Request, res: Response) {
    const fetchedProducts = await this.productService.getAllProducts();

    return ResponseWriter.success(
      res,
      ResponseWriterMessage.Queried,
      fetchedProducts,
      200
    );
  }
}
