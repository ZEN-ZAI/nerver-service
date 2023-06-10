import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  address_id: string;

  @Column({ nullable: false, unique: false })
  receiver: string;

  @Column({ nullable: false, unique: false })
  building_number: string;

  @Column({ nullable: false, unique: false })
  street: string;

  @Column({ nullable: false, unique: false })
  subdistrict: string;

  @Column({ nullable: false, unique: false })
  district: string;

  @Column({ nullable: false, unique: false })
  province: string;

  @Column({ nullable: false, unique: false })
  postal_code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}