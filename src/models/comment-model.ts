import {Table, Model, Column, DataType, BelongsToMany, ForeignKey} from "sequelize-typescript"
import { Track } from "./track-model"
import { TrackComment } from "./track-comment-model"



@Table({tableName: "comments"})
export class Comment extends Model<Comment>{
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    @Column({type: DataType.STRING, allowNull: false})
    text: string

    
    @ForeignKey(() => Track)
    @Column({type: DataType.INTEGER})
    trackId: number
    
    @BelongsToMany(() => Track, () => TrackComment)
    track: Track
}