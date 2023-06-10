import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column({ nullable: false, unique: true })
  number: number;

  @Column({ nullable: false, unique: false })
  name: string;

  @Column({ nullable: false, unique: false })
  type: string;

  @Column({ nullable: false, unique: false })
  height: string;

  @Column({ nullable: false, unique: false })
  weight: string;

  @Column({ nullable: false, unique: false })
  image: string;

  @Column({ nullable: false, unique: false, type: 'float' })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}