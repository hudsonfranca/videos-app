import { Video } from 'src/video/video.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
@Tree('closure-table', {
  closureTableName: 'comment_closure',
  ancestorColumnName: (colum) => `ancestor_${colum.propertyName}`,
  descendantColumnName: (colum) => `descendant_${colum.propertyName}`,
})
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar' })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.comments, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Video, (video) => video.comments, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  video: Video;

  @TreeChildren()
  children: Comment[];

  @TreeParent()
  parent: Comment;
}
