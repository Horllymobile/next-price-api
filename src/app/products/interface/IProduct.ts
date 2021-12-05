import { ProductDTO } from '../dto/product';
import { UpdateProductDTO } from '../dto/update_product_dto';

export interface IProduct {
  getProducts(
    page: number,
    size: number,
    startDate?: Date,
    endDate?: Date,
    search?: string,
  ): Promise<any>;
  getProduct(productId: number): Promise<any>;
  addProduct(product: ProductDTO): Promise<any>;
  updateProduct(productId: number, metaData: UpdateProductDTO);
  deleteProduct(productId: number, reason?: string);
}
