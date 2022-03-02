import { ProductEntity } from './entity/product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
  async findProducts(
    page: number,
    size: number,
    startDate?: Date,
    endDate?: Date,
    search?: string,
  ): Promise<ProductEntity[]> {
    const query = this.createQueryBuilder('product');

    if (startDate && endDate) {
      //   'SELECT * FROM product WHERE createAt BETWEEN :startDate and :endDate;',
      query.andWhere('product.createAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    if (search) {
      query.andWhere('LOWER(product.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const products = await query.getMany();
    return products;
  }
}
