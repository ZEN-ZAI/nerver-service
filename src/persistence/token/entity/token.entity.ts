import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';

@Entity({ name: 'token' })
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  token_id: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.user_id, { nullable: false, eager: true})
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ nullable: false, unique: true })
  token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}