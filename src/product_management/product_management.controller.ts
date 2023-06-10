import { Controller, Get, Param, UseFilters, HttpCode, HttpException } from '@nestjs/common';
import { ProductManagementService } from './product_management.service';
import { HttpExceptionFilter } from '../middleware/http-exception.filter.ts';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import ProfileModel from './models/product.model';
import ProductModel from './models/product.model';

@ApiTags('Product Management')
@Controller('product-management')
export class ProductManagementController {
  constructor(private readonly productManagementService: ProductManagementService) { }

  @ApiResponse({ status: 200, description: 'Product', type: ProductModel, isArray: true})
  @ApiResponse({ status: 400, description: 'Validation Failed'})
  @ApiResponse({ status: 401, description: 'Authorization Required' })
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(200)
  @Get('/products')
  async getProducts(): Promise<ProductModel[]> {
    try {
      return await this.productManagementService.getProducts();
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: error.error,
          message: error.message,
        },
        error.status,
      );
    }
  }

  @ApiResponse({ status: 200, description: 'Product', type: ProductModel})
  @ApiResponse({ status: 400, description: 'Validation Failed'})
  @ApiResponse({ status: 401, description: 'Authorization Required' })
  @ApiResponse({ status: 404, description: 'Product Not Found'})
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(200)
  @Get('/product/:productId')
  async getProductByProductId(
    @Param('productId') productId: string,
    ): Promise<ProfileModel> {
    try {
      return await this.productManagementService.getProductByProductId(productId);
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: error.error,
          message: error.message,
        },
        error.status,
      );
    }
  }
}
