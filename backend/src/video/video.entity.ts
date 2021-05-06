import { Comment } from 'src/comment/comment.entity';
import { Video_Tag } from 'src/video-tag/video-tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({ nullable: false, type: 'varchar' })
  url: string;

  @Column({ nullable: false, type: 'varchar' })
  thumbnail: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.videos, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Video_Tag, (videoTag) => videoTag.video)
  videotags: Video_Tag[];

  @OneToMany(() => Comment, (comment) => comment.video)
  comments: Comment[];
}
