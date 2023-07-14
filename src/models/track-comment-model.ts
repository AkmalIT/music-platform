import {Table, Model, Column, DataType, BelongsToMany, ForeignKey} from "sequelize-typescript"
import { Track } from "./track-model"
import { Comment } from "./comment-model"



@Table({tableName: "track-comments", updatedAt: false, createdAt: false})
export class TrackComment extends Model<TrackComment>{
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @ForeignKey(() => Track)
    @Column({type: DataType.INTEGER})
    trackId: number

    @ForeignKey(() => Comment)
    @Column({type: DataType.INTEGER})
    commentId: number
}