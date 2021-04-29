import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import * as crypto from 'crypto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
          crypto.randomBytes(16, (err, res) => {
            if (err) {
              return cb(err, null);
            }
            return cb(null, res.toString('hex') + extname(file.originalname));
          });
        },
      }),
    }),
  )
  async videoUpload(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
    @Body() tags: { tags: string },
  ) {
    const videoTags = tags.tags.split(' ');

    const video = await this.videoService.videoUpload(
      file,
      req.user,
      videoTags,
    );

    delete video.createdAt;
    delete video.updatedAt;
    return video;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const video = await this.videoService.findById(id);
    return video;
  }

  @Delete(':id')
  async Delete(@Param('id') id: string) {
    const { affected } = await this.videoService.delete(id);
    return affected;
  }

  @Get()
  async videosByTag(@Body() tags: any) {
    console.log(tags);
    const videos = await this.videoService.videosByTag(tags.tags);

    return videos;
  }

  @Get('/index/i')
  async findVideos() {
    const videos = await this.videoService.findVideos();

    return videos;
  }
}
