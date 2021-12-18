import { ProductEntity } from './entity/product.entity';
import { Repository, Connection } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProductDTO } from './dto/product';
import { IProduct } from './interface/IProduct';
import { ProductPagination } from './interface/IProduct.response';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductDTO } from './dto/update_product_dto';
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
    startDate?: Date,
    endDate?: Date,
    search?: string,
  ): Promise<any> {
    try {
      // this.connection.getRepository(ProductEntity)
      // .createQueryBuilder('product')
      // .where('')
      let products: ProductEntity[];
      if (startDate && endDate) {
        // console.log(dates);
        products = await this.productRepository.query(
          'SELECT * FROM product WHERE createAt BETWEEN :startDate and :endDate;',
          [startDate, endDate],
        );

        // console.log(products);
      } else {
        products = await this.productRepository.find({
          skip: page,
          take: size,
        });
      }
      const data: ProductPagination = {
        page: page ?? 0,
        size: size ?? 20,
        total: products.length,
        metaData: [...products],
      };

      return data;
    } catch (error) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getProduct(id: number): Promise<any> {
    try {
      const product = await this.productRepository.findOne(id);
      if (!product) {
        throw new HttpException(
          { error: 'Product with not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      console.log(product);
      return product;
    } catch (error) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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

  async updateProduct(productId: number, product: UpdateProductDTO) {
    const prod = await this.productRepository.findOne({ id: productId });

    if (!prod)
      throw new HttpException(
        { error: 'Product is not found' },
        HttpStatus.NOT_FOUND,
      );

    return await this.productRepository.update(
      { id: productId },
      {
        title: product.title,
        company: product.company,
        address: product.address,
        uom: product.uom,
        description: product.description,
        price: product.price,
      },
    );
  }

  async deleteProduct(productId: number) {
    const product = await this.productRepository.findOne({ id: productId });
    if (!product)
      throw new HttpException(
        { error: 'Product is not found' },
        HttpStatus.NOT_FOUND,
      );
    return await this.productRepository.delete({ id: productId });
  }
}
