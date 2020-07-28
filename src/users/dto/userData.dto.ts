import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDataDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty({ message: "Email must not be empty!"})
  @IsEmail({}, { message: "Email must be an email!"})
  email: string;

  @IsNotEmpty()
  password: string;
}