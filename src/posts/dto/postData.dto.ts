import { IsString, IsNotEmpty, Length } from "class-validator";

export class PostDataDto {

  @IsString({message: "Title must have letters"})
  @IsNotEmpty({message: "Title must not be empty"})
  @Length(15, 50)
  title: string;

  @IsString({message: "Description must have letters"})
  description?: string;
}