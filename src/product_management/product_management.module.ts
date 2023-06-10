import { Module } from '@nestjs/common';
import { ProductModule } from '../persistence/product/product.module';
import { ProductManagementService } from './product_management.service';
import { TokenModule } from '../persistence/token/token.module';

@Module({
  imports: [ProductManagementModule, ProductModule, TokenModule],
  providers: [ProductManagementService],
  exports: [ProductManagementService]
})
export class ProductManagementModule { }
