import { Entity, PrimaryColumn, Column, Generated } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn({type: "uuid"})
  @Generated("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}