import { PrismaClient, ProductCategory, User } from "@prisma/client";
import { CreateProductCategoryDto } from "./models/create-product-category.dto";
import Joi from "joi";
import { AppException } from "../../models/exception/app.exception";

export class ProductCategoryService {
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async createProductCategory(
    currentUser: User,
    createProductCategoryDto: CreateProductCategoryDto
  ): Promise<ProductCategory> {
    const dtoSchema = Joi.object({
      name: Joi.string().min(2).max(40).required(),
      description: Joi.string().max(400),
    });

    const { error } = dtoSchema.validate(createProductCategoryDto);

    if (error) {
      throw new AppException({
        message: error.message,
        statusCode: 400,
      });
    }

    const createdProductCategory = await this.db.productCategory.create({
      data: {
        name: createProductCategoryDto.name,
        description: createProductCategoryDto.description,
        createdBy: currentUser.id,
        createdAt: new Date(),
        updatedBy: currentUser.id,
        updatedAt: new Date(),
      },
    });

    return createdProductCategory;
  }

  async deleteProductCategory(id: number): Promise<ProductCategory> {
    const idSchema = Joi.number().min(1).required();

    const { error } = idSchema.validate(id);

    if (error) {
      throw new AppException({
        message: error.message,
        statusCode: 400,
      });
    }

    const productCategoryToDelete = await this.db.productCategory.findUnique({
      where: { id },
    });

    if (!productCategoryToDelete) {
      throw new AppException({
        message: "Product category not found.",
        statusCode: 404,
      });
    }

    const deletedProductCategory = await this.db.productCategory.delete({
      where: {
        id,
      },
    });

    return deletedProductCategory;
  }
}
