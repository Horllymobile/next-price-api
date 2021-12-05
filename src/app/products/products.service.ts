import { ProductEntity } from './entity/product.entity';
import { Repository, Connection } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProductDTO } from './dto/product';
import { IProduct } from './interface/IProduct';
import { ProductPagination } from './interface/IProduct.response';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService implements IProduct {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private connection: Connection,
  ) {}

  async getProducts(
    page: number,
    size: number,
    startDate?: string,
    endDate?: string,
    search?: string,
  ): Promise<any> {
    const total = await (await this.productRepository.find()).length;
    // this.connection.getRepository(ProductEntity)
    // .createQueryBuilder('product')
    // .where('')
    let products: ProductEntity[];

    if (startDate && endDate) {
      products = await this.productRepository.find({
        skip: page,
        take: size,
        where: `createAt BETWEEN :${startDate} AND :${endDate}`,
      });
    } else {
      products = await this.productRepository.find({
        skip: page,
        take: size,
      });
    }

    const data: ProductPagination = {
      page: page ?? 0,
      size: size ?? 20,
      total,
      metaData: [...products],
    };

    return data;
  }
  getProduct(productId: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async addProduct(product: ProductDTO): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction('SERIALIZABLE');
      // const findProductByCompany = await this.productRepository.findOne({
      //   where: { company: product.company },
      // });

      // if(findProductByCompany) {
      //   throw new HttpException({ error: 'Product with company name already exist'}, HttpStatus.BAD_REQUEST);
      // }

      const prod = this.productRepository.create({
        title: product.title,
        company: product.company,
        address: product.address,
        description: product.description,
        price: product.price,
        uom: product.uom,
      });

      const save = await queryRunner.manager.save(prod);
      if (save) {
        await queryRunner.commitTransaction();
        return {
          title: save.title,
          company: save.company,
          address: save.address,
          description: save.description,
          createAt: save.createAt,
          price: save.price,
          uom: save.uom,
          updatedAt: save.updatedAt,
        };
      }
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }
}
