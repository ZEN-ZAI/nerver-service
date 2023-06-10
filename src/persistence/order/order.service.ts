import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { OrderEntity } from './entity/order.entity'
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity | any> {
    try {
      const orderEntity: OrderEntity = new OrderEntity();
      orderEntity.user = createOrderDto.user;
      orderEntity.product = createOrderDto.product;
      orderEntity.address= createOrderDto.address;
      orderEntity.status = 'ORDER';
      return await this.orderRepository.save(orderEntity);
    } catch (error: any) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  async findAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.find();
  }

  async findAllByUserId(userId: string): Promise<OrderEntity[]> {
    return await this.orderRepository.find({ where: { user: { user_id: userId} } });
  }

  async findOneByOrderId(orderId: string): Promise<OrderEntity> {
    return await this.orderRepository.findOne({ where: { order_id: orderId } });
  }

  async update(orderId: string, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.update(orderId, updateOrderDto);
  }

  async remove(orderId: string): Promise<DeleteResult> {
    return await this.orderRepository.softDelete(orderId);
  }

  async delete(orderId: string): Promise<DeleteResult> {
    return await this.orderRepository.delete(orderId);
  }
}
