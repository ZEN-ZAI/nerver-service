import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { ProfileEntity } from '../../profile/entity/profile.entity';
import { OrderEntity } from '../../order/entity/order.entity';
import { TokenEntity } from '../../token/entity/token.entity';
import { UserHasAddressEntity } from '../../user_has_address/entity/user_has_address.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, unique: true })
  password: string;

  @OneToOne(() => ProfileEntity, (profile: ProfileEntity) => profile.profile_id, { nullable: false, eager: true})
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}