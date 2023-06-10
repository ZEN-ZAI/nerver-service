import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../../persistence/product/entity/product.entity';

type Props = {
    product_id: string;
    number: number;
    name: string;
    type: string;
    height: string;
    weight: string;
    image: string;
    price: number;
};

class ProductModel {
    @ApiProperty({ default: 'name' })
    product_id: string;
    @ApiProperty({ default: 'number' })
    number: number;
    @ApiProperty({ default: 'name' })
    name: string;
    @ApiProperty({ default: 'type' })
    type: string;
    @ApiProperty({ default: 'height' })
    height: string;
    @ApiProperty({ default: 'weight' })
    weight: string;
    @ApiProperty({ default: 'image' })
    image: string;
    @ApiProperty({ default: 'price' })
    price: number;

    constructor({ product_id, number, name, type, height, weight, image, price }: Props) {
        this.product_id = product_id;
        this.number = number;
        this.name = name;
        this.type = type;
        this.height = height;
        this.weight = weight;
        this.image = image;
        this.price = price;
    }

    static fromProductEntity(productEntity: ProductEntity): ProductModel {
        const productModel = new ProductModel({
            product_id: productEntity.product_id,
            number: productEntity.number,
            name: productEntity.name,
            type: productEntity.type,
            height: productEntity.height,
            weight: productEntity.weight,
            image: productEntity.image,
            price: productEntity.price,
        });

        return productModel;
    }

    static fromProductEntities(productEntities: ProductEntity[]): ProductModel[] {
        return productEntities.map(productEntity => ProductModel.fromProductEntity(productEntity));
    }
};
export default ProductModel;
