import {Table, Model, Column, DataType, BelongsToMany, ForeignKey} from "sequelize-typescript"
import { Comment } from "./comment-model"
import { TrackComment } from "./track-comment-model"



@Table({tableName: "tracks"})
export class Track extends Model<Track>{
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    @Column({type: DataType.STRING, allowNull: false})
    text: string

    @Column({type: DataType.INTEGER})
    listens: number

    @Column({type: DataType.STRING, allowNull: false})
    picture: string

    @Column({type: DataType.STRING, allowNull: false})
    audio: string
    


    @BelongsToMany(() => Comment, () => TrackComment)
    comments: Comment[]
}