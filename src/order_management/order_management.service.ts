import { BadRequestException, Injectable } from '@nestjs/common';
import { UserCreateOrderDto } from './dto/user-create-order.model';
import OrderModel from './models/order.model';
import { OrderService } from '../persistence/order/order.service';
import { CreateOrderDto } from '../persistence/order/dto/create-order.dto';
import { UserService } from '../persistence/user/user.service';
import { ProductService } from '../persistence/product/product.service';
import { AddressService } from '../persistence/address/address.service';
import { OrderEntity } from '../persistence/order/entity/order.entity';
import { UpdateOrderDto } from '../persistence/order/dto/update-order.dto';

@Injectable()
export class OrderManagementService {
  constructor(
    private userService: UserService,
    private productService: ProductService,
    private addressService: AddressService,
    private orderService: OrderService,
  ) { }
  
  async createOrder(userCreateOrderDto: UserCreateOrderDto): Promise<OrderModel> {
    const createOrderDto: CreateOrderDto = new CreateOrderDto();
    createOrderDto.user = await this.userService.findOneByUserId(userCreateOrderDto.user_id);
    createOrderDto.product = await this.productService.findOneByProductId(userCreateOrderDto.product_id);
    createOrderDto.address = await this.addressService.findOneByAddressId(userCreateOrderDto.address_id);

    const createdOrder: OrderEntity =  await this.orderService.create(createOrderDto);

    return new OrderModel({
      order_id: createdOrder.order_id,
      status: createdOrder.status,
      product: createdOrder.product,
      address: createdOrder.address,
    })
  }

  async cancelOrderByUserIdAndOrderId(userId: string, orderId: string): Promise<OrderModel> {
    const orderEntity: OrderEntity = await this.orderService.findOneByOrderId(orderId);
    if (orderEntity.user.user_id != userId) {
      throw new BadRequestException('Validation Failed');
    }
    const updateOrderDto: UpdateOrderDto = new UpdateOrderDto();
    updateOrderDto.status = 'CANCEL';
    await this.orderService.update(orderId, updateOrderDto);
    const updatedOrder: OrderEntity = await this.orderService.findOneByOrderId(orderId);

    return OrderModel.fromOrderEntity(updatedOrder);
  }

  async getOrderByUserIdAndOrderId(userId: string, orderId: string): Promise<OrderModel> {
    const orderEntity: OrderEntity = await this.orderService.findOneByOrderId(orderId);
    if (orderEntity.user.user_id != userId) {
      throw new BadRequestException('Validation Failed');
    }
    const order: OrderEntity =  await this.orderService.findOneByOrderId(orderId);

    return OrderModel.fromOrderEntity(order);
  }
  

  async getAllOrderByUser(userId: string): Promise<OrderModel[]> {
    const orders: OrderEntity[] =  await this.orderService.findAllByUserId(userId);

    return OrderModel.fromProductEntities(orders);
  }
}
