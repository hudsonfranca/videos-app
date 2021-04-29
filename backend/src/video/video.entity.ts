import { Video_Tag } from 'src/video-tag/video-tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

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

  @ManyToOne(() => User, (user) => user.videos)
  user: User;

  @OneToMany(() => Video_Tag, (videoTag) => videoTag.video, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  videotags: Video_Tag[];
}
