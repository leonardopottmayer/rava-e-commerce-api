import { PrismaClient, Product, User } from "@prisma/client";
import Joi from "joi";
import { AppException } from "../../models/exception/app.exception";
import { CreateProductDto } from "./models/create-product.dto";

export class ProductService {
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async createProduct(
    currentUser: User,
    createProductDto: CreateProductDto
  ): Promise<Product> {
    const dtoSchema = Joi.object({
      name: Joi.string().min(2).max(40).required(),
      description: Joi.string().max(400),
      price: Joi.number().min(0.01).required(),
      isVisible: Joi.bool().required(),
      productCategoryId: Joi.number().min(1).required(),
    });

    const { error } = dtoSchema.validate(createProductDto);

    if (error) {
      throw new AppException({
        message: error.message,
        statusCode: 400,
      });
    }

    const fetchedProductCategory = await this.db.productCategory.findUnique({
      where: { id: createProductDto.productCategoryId },
    });

    if (!fetchedProductCategory) {
      throw new AppException({
        message: "Product category not found.",
        statusCode: 404,
      });
    }

    const createdProduct = await this.db.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        isVisible: createProductDto.isVisible,
        productCategoryId: createProductDto.productCategoryId,
        createdBy: currentUser.id,
        createdAt: new Date(),
        updatedBy: currentUser.id,
        updatedAt: new Date(),
      },
    });

    return createdProduct;
  }

  async deleteProduct(id: number): Promise<Product> {
    const idSchema = Joi.number().min(1).required();

    const { error } = idSchema.validate(id);

    if (error) {
      throw new AppException({
        message: error.message,
        statusCode: 400,
      });
    }

    const productToDelete = await this.db.product.findUnique({
      where: { id },
    });

    if (!productToDelete) {
      throw new AppException({
        message: "Product not found.",
        statusCode: 404,
      });
    }

    const deletedProduct = await this.db.product.delete({
      where: {
        id,
      },
    });

    return deletedProduct;
  }
}
