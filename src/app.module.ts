import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrackModule } from './track/track.module';
import { Track } from './models/track-model';
import { Comment } from './models/comment-model';
import { FileModule } from './file/file.module';
import { TrackComment } from './models/track-comment-model';
import {ServeStaticModule} from "@nestjs/serve-static"
import * as path from "path"


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, "static")})
    ,
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [Track, Comment, TrackComment],
      autoLoadModels: true
    }),
    TrackModule,
    FileModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
 