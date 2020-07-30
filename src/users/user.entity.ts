import { Post } from '../posts/post.entity';
import { Entity, PrimaryColumn, Column, Generated, OneToMany, Unique } from "typeorm";

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryColumn({type: "uuid"})
  @Generated("uuid")
  id: string;

  @Column()
  username: string;

  @Column({ select: false })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];
}