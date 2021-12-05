import { ProductEntity } from './entity/product.entity';
import { ProductsService } from './products.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import * as Joi from 'joi';
import { RolesGuard } from '../auth/guard/role.guard';
import { ProductDTO } from './dto/product';

const userSchema = Joi.object({
  title: Joi.string().required(),
  address: Joi.string().required(),
  price: Joi.number().required(),
  uom: Joi.string().required(),
  company: Joi.string().required(),
  description: Joi.string(),
});

@Controller('api/v1/products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['super_admin', 'admin', 'user'])
  async getProducts(
    @Req() req,
    @Query(
      'page',
      // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    page: number,
    @Query(
      'size',
      // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    size: number,
  ) {
    // console.log(req.user);
    return await this.productService.getProducts(page ?? 0, size ?? 20);
  }

  @Post('/')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['super_admin', 'admin'])
  async createProduct(
    @Req() request: Request,
    @Res() response: Response,
    @Body() product: ProductDTO,
  ): Promise<any> {
    this.productService
      .addProduct(product)
      .then((res: ProductEntity) => {
        return response.status(HttpStatus.CREATED).json({ metaData: res });
      })
      .catch((err) => {
        return response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: err, success: false });
      });
  }
}
