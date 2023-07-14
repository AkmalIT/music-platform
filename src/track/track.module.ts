import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import {SequelizeModule} from "@nestjs/sequelize"
import { Track } from 'src/models/track-model';
import { Comment } from 'src/models/comment-model';
import { FileService } from 'src/file/file.service';
import { TrackComment } from 'src/models/track-comment-model';

@Module({
  imports: [SequelizeModule.forFeature([Track, Comment, TrackComment])],
  controllers: [TrackController],
  providers: [TrackService, FileService]
})
export class TrackModule {}
