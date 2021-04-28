import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './config/database-connection.service';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';
import * as connectionOptions from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    UserModule,
    VideoModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
