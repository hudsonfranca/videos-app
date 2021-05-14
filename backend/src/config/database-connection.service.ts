import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'postgres',
      host: '172.20.0.2',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'postgres',
      synchronize: true,
      dropSchema: false,
      logging: false,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      cli: {
        migrationsDir: __dirname + '/../migrations',
        entitiesDir: __dirname + '/../**/*.entity.{js,ts}',
      },
    };
  }
}
