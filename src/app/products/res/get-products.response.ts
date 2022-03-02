import { ProductEntity } from 'src/app/products/entity/product.entity';
export class GetProductResponse {
  page: number;
  size: number;
  total: number;
  data: ProductEntity[];
}
