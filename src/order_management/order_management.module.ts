import { Module } from '@nestjs/common';
import { OrderManagementService } from './order_management.service';
import { AddressModule } from '../persistence/address/address.module';
import { OrderModule } from '../persistence/order/order.module';
import { ProductModule } from '../persistence/product/product.module';
import { UserModule } from '../persistence/user/user.module';

@Module({
  imports: [OrderManagementModule, OrderModule, UserModule, ProductModule, AddressModule],
  providers: [OrderManagementService],
  exports: [OrderManagementService]
})
export class OrderManagementModule { }
