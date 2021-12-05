import { ProductDTO } from '../dto/product';

export interface IProduct {
  getProducts(
    page: number,
    size: number,
    startDate?: string,
    endDate?: string,
    search?: string,
  ): Promise<any>;
  getProduct(productId: number): Promise<any>;
  addProduct(product: ProductDTO): Promise<any>;
}
