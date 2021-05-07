import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Request,
  UseGuards,
  UseInterceptors,
  Body,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
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
    FileFieldsInterceptor(
      [
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
      ],
      {
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
      },
    ),
  )
  async videoUpload(
    @UploadedFiles() files,
    @Request() req,
    @Body() body: { tags: string; name: string },
  ) {
    console.log('FILES ', files);
    console.log('BODY ', body);

    const videoTags = body.tags.split(',');

    const video = await this.videoService.videoUpload(
      files.video[0],
      files.thumbnail[0],
      req.user,
      videoTags,
      body.name,
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
  async videosByTag(@Body() tags: any, @Request() req) {
    const videos = await this.videoService.videosByTag(
      Object.values(req.query),
    );

    return videos;
  }

  @Get('index/all')
  async findVideos() {
    const videos = await this.videoService.findVideos();

    return videos;
  }
}
