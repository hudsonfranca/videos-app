import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {User}from '../user/user.entity'

@Entity()
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  originalname: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  filename: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.videos)
    user: User;
}