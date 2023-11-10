import { Request, Response } from "express";
import { ProductCategoryService } from "./product-category.service";
import { CreateProductCategoryDto } from "./models/create-product-category.dto";
import {
  ResponseWriter,
  ResponseWriterMessage,
} from "../../utils/response-writer";

export class ProductCategoryController {
  private productCategoryService: ProductCategoryService;

  constructor() {
    this.productCategoryService = new ProductCategoryService();
  }

  async createProductCategory(req: Request, res: Response) {
    const { name, description } = req.body;

    const dto = new CreateProductCategoryDto(name, description);

    const productCategory =
      await this.productCategoryService.createProductCategory(req.user, dto);

    return ResponseWriter.success(
      res,
      ResponseWriterMessage.Created,
      productCategory,
      201
    );
  }

  async deleteProductCategory(req: Request, res: Response) {
    const { id } = req.params;

    const deletedProductCategory =
      await this.productCategoryService.deleteProductCategory(+id);

    return ResponseWriter.success(
      res,
      ResponseWriterMessage.Deleted,
      deletedProductCategory,
      200
    );
  }
}
