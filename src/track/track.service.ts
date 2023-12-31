import {Injectable} from "@nestjs/common";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FileService, FileType} from "../file/file.service";
import {InjectModel} from "@nestjs/sequelize"
import { Track } from "src/models/track-model";
import { Comment } from "src/models/comment-model";

@Injectable()
export class TrackService {

    constructor(@InjectModel(Track) private trackModel: typeof Track,
                @InjectModel(Comment) private commentModel: typeof Comment,
                private fileService: FileService) {}

    async create(dto: CreateTrackDto, picture, audio) {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
        const track = await this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath})
        return track;
    }

    async getAll(){
        const tracks = await this.trackModel.findAll({include: {all: true}});
        return tracks;
    }

    async getOne(id) {
        const track = await this.trackModel.findOne({where: {id}})
        return track;
    }

    async delete(id) {
        const track = await this.trackModel.destroy({where: {id}});
        return track
    }

    async addComment(dto: CreateCommentDto) {
        const id = dto.trackId
        const track = await this.trackModel.findOne({where: {id}});
        const comment = await this.commentModel.create({...dto})
        track.$set("comments", [comment.id])
        track.comments = [comment]
        await track.save();
        return comment;
    }

    async listen(id) {
        const track = await this.trackModel.findOne({where: {id}});
        track.listens += 1
        track.save()
    }

}