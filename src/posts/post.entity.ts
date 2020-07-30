import { User } from './../users/user.entity';
import { Entity, PrimaryColumn, Generated, Column, ManyToOne } from "typeorm";

@Entity()
export class Post {
  @PrimaryColumn({type: "uuid"})
  @Generated("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column({ type: "datetime" })
  createdAt: Date;

  @Column({ type: "datetime" })
  updatedAt: Date;

  @ManyToOne(type => User, user => user.posts)
  user: User;
}