import { Injectable, NotFoundException } from '@nestjs/common';
import ProductModel from './models/product.model';
import { ProductService } from '../persistence/product/product.service';
import { ProductEntity } from '../persistence/product/entity/product.entity';

@Injectable()
export class ProductManagementService {
  constructor(
    private productService: ProductService,
  ) { }

  async getProducts(): Promise<ProductModel[]> {
    const productEntities: ProductEntity[] = await this.productService.findAll();

    return ProductModel.fromProductEntities(productEntities);
  }

  async getProductByProductId(productId: any): Promise<ProductModel> {
    const productEntity: ProductEntity = await this.productService.findOneByProductId(productId);

    if (!productEntity) {
      throw new NotFoundException('Product Not Found');
    }

    return ProductModel.fromProductEntity(productEntity);
  }
}
