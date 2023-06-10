import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProductEntity } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) { }

  async create(createProductDto: CreateProductDto): Promise<ProductEntity | any> {
    try {
      const productEntity: ProductEntity = new ProductEntity();
      productEntity.number = createProductDto.number;
      productEntity.name = createProductDto.name;
      productEntity.type = createProductDto.type;
      productEntity.height = createProductDto.height;
      productEntity.weight = createProductDto.weight;
      productEntity.image = createProductDto.image;
      return await this.productRepository.save(productEntity);
    } catch (error: any) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async findOneByProductId(productId: string): Promise<ProductEntity> {
    return await this.productRepository.findOne({ where: { product_id: productId } });
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(productId, updateProductDto);
  }

  async remove(productId: string): Promise<DeleteResult> {
    return await this.productRepository.softDelete(productId);
  }

  async delete(productId: string): Promise<DeleteResult> {
    return await this.productRepository.delete(productId);
  }
}
