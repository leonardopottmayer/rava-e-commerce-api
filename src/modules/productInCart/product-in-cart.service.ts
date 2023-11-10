import { PrismaClient, Product, ProductInCart, User } from "@prisma/client";
import Joi from "joi";
import { AppException } from "../../models/exception/app.exception";
import { AddProductToCartDto } from "./models/add-product-to-cart.dto";
import { UpdateProductInCartDto } from "./models/update-product-in-cart.dto";

export class ProductInCartService {
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async addProductToCart(
    currentUser: User,
    addProductToCartDto: AddProductToCartDto
  ): Promise<ProductInCart> {
    const dtoSchema = Joi.object({
      productId: Joi.number().min(1).required(),
      quantity: Joi.number().min(1).integer().required(),
    });

    const { error } = dtoSchema.validate(addProductToCartDto);

    if (error) {
      throw new AppException({
        message: error.message,
        statusCode: 400,
      });
    }

    const fetchedProduct = await this.db.product.findUnique({
      where: { id: addProductToCartDto.productId },
    });

    if (!fetchedProduct) {
      throw new AppException({
        message: "Product not found.",
        statusCode: 404,
      });
    }

    // If cart already has this product, just increment the quantity
    const fetchedProductInCart = await this.db.productInCart.findFirst({
      where: {
        productId: addProductToCartDto.productId,
      },
    });

    let returnedProductInCart: ProductInCart;

    if (fetchedProductInCart) {
      returnedProductInCart = await this.db.productInCart.update({
        data: {
          quantity:
            fetchedProductInCart.quantity + addProductToCartDto.quantity,
        },
        where: {
          id: fetchedProductInCart.id,
        },
      });
    } else {
      returnedProductInCart = await this.db.productInCart.create({
        data: {
          productId: addProductToCartDto.productId,
          userId: currentUser.id,
          quantity: addProductToCartDto.quantity,
        },
      });
    }

    return returnedProductInCart;
  }

  async removeProductFromCart(
    currentUser: User,
    id: number
  ): Promise<ProductInCart> {
    const idSchema = Joi.number().min(1).required();

    const { error } = idSchema.validate(id);

    if (error) {
      throw new AppException({
        message: error.message,
        statusCode: 400,
      });
    }

    const productInCartToDelete = await this.db.productInCart.findUnique({
      where: { id },
    });

    if (!productInCartToDelete) {
      throw new AppException({
        message: "Product not found.",
        statusCode: 404,
      });
    }

    if (productInCartToDelete.userId != currentUser.id) {
      throw new AppException({
        message: "This product does not belong to you.",
        statusCode: 400,
      });
    }

    const deletedProductInCart = await this.db.productInCart.delete({
      where: {
        id,
      },
    });

    return deletedProductInCart;
  }

  async updateProductInCart(
    currentUser: User,
    productId: number,
    updateProductInCartDto: UpdateProductInCartDto
  ): Promise<ProductInCart> {
    const dtoSchema = Joi.object({
      quantity: Joi.number().min(1).integer().required(),
    });

    const { error } = dtoSchema.validate(updateProductInCartDto);

    if (error) {
      throw new AppException({
        message: error.message,
        statusCode: 400,
      });
    }

    const fetchedProductInCart = await this.db.productInCart.findUnique({
      where: { id: productId },
    });

    if (!fetchedProductInCart) {
      throw new AppException({
        message: "Product not found.",
        statusCode: 404,
      });
    }

    if (fetchedProductInCart.userId != currentUser.id) {
      throw new AppException({
        message: "This product does not belong to you.",
        statusCode: 400,
      });
    }

    const updatedProductInCart = await this.db.productInCart.update({
      data: {
        quantity: updateProductInCartDto.quantity,
      },
      where: {
        id: productId,
      },
    });

    return updatedProductInCart;
  }

  async getProductInCartById(
    currentUser: User,
    id: number
  ): Promise<ProductInCart> {
    const idSchema = Joi.number().min(1).required();

    const { error } = idSchema.validate(id);

    if (error) {
      throw new AppException({
        message: error.message,
        statusCode: 400,
      });
    }

    const product = await this.db.productInCart.findUnique({
      where: { id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
          },
        },
      },
    });

    if (!product) {
      throw new AppException({
        message: "Product not found.",
        statusCode: 404,
      });
    }

    if (product.userId != currentUser.id) {
      throw new AppException({
        message: "This product does not belong to you.",
        statusCode: 400,
      });
    }

    return product;
  }

  async getAllProductsInCart(currentUser: User): Promise<ProductInCart[]> {
    const productsInCart = await this.db.productInCart.findMany({
      where: { userId: currentUser.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
          },
        },
      },
    });

    return productsInCart;
  }
}
