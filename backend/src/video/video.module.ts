import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { Video } from './video.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoTagModule } from 'src/video-tag/video-tag.module';

@Module({
  providers: [VideoService],
  controllers: [VideoController],
  imports: [TypeOrmModule.forFeature([Video]), VideoTagModule],
  exports: [VideoService],
})
export class VideoModule {}
