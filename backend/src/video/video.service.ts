import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Video_Tag } from 'src/video-tag/video-tag.entity';
import { Repository } from 'typeorm';
import { Video } from './video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video) private videoRepository: Repository<Video>,
    @InjectRepository(Video_Tag)
    private videoTagRepository: Repository<Video_Tag>,
  ) {}

  async videoUpload(
    video: Express.Multer.File,
    thumbnail: Express.Multer.File,
    user: User,
    tags: string[],
  ) {
    const hostUrl = 'localhost:4000/uploads/';

    const videoTags = tags.map((tag) =>
      this.videoTagRepository.create({ tag: tag }),
    );

    const videoEntity = this.videoRepository.create({
      originalname: video.originalname,
      url: `${hostUrl}${video.filename}`,
      filename: video.filename,
      videotags: videoTags,
      thumbnail: `${hostUrl}${thumbnail.filename}`,
    });

    videoEntity.user = user;

    try {
      const savedVideo = await this.videoRepository.save(videoEntity);

      return savedVideo;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Não foi possível fazer o upload do video.',
      );
    }
  }

  async findById(id: string) {
    const video = await this.videoRepository.findOne(id);

    if (!video) throw new BadRequestException('Este video não existe');

    return video;
  }

  async findVideos() {
    const video = await this.videoRepository.find();

    if (!video) throw new BadRequestException('Este video não existe');

    return video;
  }

  async delete(id: string) {
    const video = await this.findById(id);

    return await this.videoRepository.delete(id);
  }

  async videosByTag(tags: string[]) {
    const videos = await this.videoRepository
      .createQueryBuilder('video')
      .leftJoinAndSelect('video.videotags', 'video__tag')
      .where('video__tag.tag IN (:...tags)', { tags })
      .getMany();

    return videos;
  }
}
