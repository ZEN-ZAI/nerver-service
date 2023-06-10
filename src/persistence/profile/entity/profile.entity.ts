import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'profile' })
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  profile_id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, unique: true })
  image: string;

  @Column({ nullable: false, unique: true })
  bio: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}