import { IsString, IsNotEmpty, Length } from "class-validator";

export class PostDataDto {

  @IsString({message: "Title must have letters"})
  @IsNotEmpty({message: "Title must not be empty"})
  @Length(15, 50, {
    message: "Title must be longer than or equal 15 characters and shorter than or equal 50 characters"
  })
  title: string;

  @IsString({message: "Description must have letters"})
  description?: string;
}