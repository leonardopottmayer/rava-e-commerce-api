export class UpdateProductDto {
  name: string;
  description: string;
  price: number;
  isVisible: boolean;
  productCategoryId: number;

  constructor(
    name: string,
    description: string,
    price: number,
    isVisible: boolean,
    productCategoryId: number
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.isVisible = isVisible;
    this.productCategoryId = productCategoryId;
  }
}
