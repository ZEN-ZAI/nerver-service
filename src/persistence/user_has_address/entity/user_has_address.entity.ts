import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { AddressEntity } from '../../address/entity/address.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Entity({ name: 'user_has_address' })
export class UserHasAddressEntity {
  @PrimaryGeneratedColumn('uuid')
  user_has_address_id: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.user_id, { nullable: false, eager: true})
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => AddressEntity, (address: AddressEntity) => address.address_id, { nullable: false, eager: true})
  @JoinColumn({ name: 'address_id' })
  address: AddressEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}