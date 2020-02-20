/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
    Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
    OneToMany, ManyToOne,
} from "typeorm";

import Post from "./Post";
import Comment from "./Comment";
import Cat from "./Cat";
import User from "./User";


@Entity()
export default class Report extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "criminal_id", type: "integer", nullable: false })
    criminalId! : number;

    @CreateDateColumn({ name: "create_at" })
    createAt! : Date;

    @UpdateDateColumn({ name: "update_at" })
    updateAt! : Date;

    @ManyToOne((type) => Post, (post) => post.reports, { cascade: true, nullable: true })
    post!: Post;

    @ManyToOne((type) => Comment, (comment) => comment.reports, { cascade: true, nullable: true })
    comment!: Comment;

    @ManyToOne((type) => Cat, (cat) => cat.reports, { cascade: true, nullable: true })
    cat!: Cat;

    @ManyToOne((type) => User, (user) => user.reports, { cascade: true, nullable: true })
    user!: User;
}
