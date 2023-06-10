import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { AddressEntity } from '../../address/entity/address.entity';
import { ProductEntity } from '../../product/entity/product.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  order_id: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.user_id, { nullable: false, eager: true})
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.product_id, { nullable: false, eager: true})
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => AddressEntity, (address: AddressEntity) => address.address_id, { nullable: false, eager: true})
  @JoinColumn({ name: 'address_id' })
  address: AddressEntity;

  @Column({ nullable: false, unique: false })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

}