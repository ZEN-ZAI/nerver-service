import { ApiProperty } from '@nestjs/swagger';
import ProductModel from '../../product_management/models/product.model';
import AddressModel from './address.model';
import { OrderEntity } from '../../persistence/order/entity/order.entity';

type Props = {
    order_id: string;
    status: string;
    product: ProductModel;
    address: AddressModel;
};

class OrderModel {
    @ApiProperty({ default: '00000000-0000-0000-0000-000000000000' })
    order_id: string;
    @ApiProperty({ default: 'status' })
    status: string;
    @ApiProperty({ default: 'product' })
    product: ProductModel;
    @ApiProperty({ default: 'address', type: AddressModel })
    address: AddressModel;

    constructor({ order_id,status, product, address }: Props) {
        this.order_id = order_id;
        this.status = status;
        this.product = product;
        this.address = address;
    }

    static fromOrderEntity(orderEntity: OrderEntity): OrderModel {
        const orderModel = new OrderModel({
            order_id: orderEntity.order_id,
            status: orderEntity.status,
            product: orderEntity.product,
            address: orderEntity.address,
        });

        return orderModel;
    }

    static fromProductEntities(orderEntities: OrderEntity[]): OrderModel[] {
        return orderEntities.map(orderEntity => OrderModel.fromOrderEntity(orderEntity));
    }
};
export default OrderModel;
