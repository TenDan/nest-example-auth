import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDataDto } from './dto/userData.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'username'],
    });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async create(userData: UserDataDto): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      userData.password.toString(),
      salt,
    );

    const userWithThatUsernameExists = await this.usersRepository.findOne({
      where: {
        username: userData.username
      }
    });

    if (userWithThatUsernameExists) throw new HttpException('User with that username already exists!', 409);

    const userWithThatEmailExists = await this.usersRepository.findOne({
      where: {
        email: userData.email
      }
    });

    if (userWithThatEmailExists) throw new HttpException('User with that email already exists!', 409)

    const user = this.usersRepository.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
    });

    this.usersRepository.save([user]);

    return user;
  }
}
