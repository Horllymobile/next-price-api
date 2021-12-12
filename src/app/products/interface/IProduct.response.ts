import { ProductEntity } from './../entity/product.entity';
import { ProductDTO } from '../dto/product';

export class ProductPagination {
  page: number;
  size: number;
  total: number;
  metaData: ProductEntity[];
}
