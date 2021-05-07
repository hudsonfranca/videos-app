import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { VideoService } from 'src/video/video.service';
import { FindOperator, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private videoService: VideoService,
  ) {}

  async createComment(
    comment: string,
    videoId: string,
    user: User,
    parentId?: string,
  ) {
    const video = await this.videoService.findById(videoId);

    let parentComment: Comment;

    if (parentId) parentComment = await this.commentById(parentId);

    const commentEntity = this.commentRepository.create({
      comment,
      video,
      user,
      parent: parentComment ? parentComment : null,
    });

    try {
      const savedComment = await this.commentRepository.save(commentEntity);
      return savedComment;
    } catch (error) {
      throw new InternalServerErrorException(
        'Não foi possível salvar o comentário.',
      );
    }
  }

  async commentById(id: string) {
    const comment = await this.commentRepository.findOne(id, {
      relations: ['user'],
    });

    if (!comment) throw new BadRequestException('Este commentário não existe.');

    return comment;
  }

  async commentsByVideo(videoId: string) {
    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .innerJoinAndSelect('comment.parent', 'parent')
      .innerJoinAndSelect('comment.children', 'children')
      .where('comment.videoId = :videoId', { videoId })
      .andWhere('children.parentId')
      .getMany();

    if (!comments)
      throw new BadRequestException('Este commentário não existe.');

    return comments;
  }

  async deleteComment(id: string) {
    await this.commentById(id);

    return await this.commentRepository.delete(id);
  }

  async updateComment(id: string, content: string) {
    const comment = await this.commentById(id);

    comment.comment = content ? content : comment.comment;

    try {
      const savedComment = await this.commentRepository.save(comment);
      return savedComment;
    } catch (error) {
      throw new InternalServerErrorException(
        'Não foi possível atualizar o comentário.',
      );
    }
  }
}
