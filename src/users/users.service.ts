import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDataDto } from './dto/userData.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';
import { User } from './user.entity';

interface FindOneOptions {
  select: ('id' | 'username' | 'email' | 'password')[];
}

export type UsersRepository = Repository<User>;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepository,
  ) {}

  async findAll(withPosts = false): Promise<User[]> {
    const users = await this.usersRepository.find({
      select: ['id', 'username'],
      relations: withPosts ? ['posts'] : [],
    });
    if (!users || users.length === 0)
      throw new NotFoundException('No users were found');
    return users;
  }

  async findOne(
    username: string,
    options?: FindOneOptions,
    withPosts = false,
  ): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(null, {
      where: {
        username: username,
      },
      select: options.select || ['id', 'username'],
      relations: withPosts ? ['posts'] : [],
    });
    if (!user) throw new NotFoundException('User with that username not found');
    return user;
  }

  async create(userData: UserDataDto): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      userData.password.toString(),
      salt,
    );

    const userWithThatUsernameExists = await this.usersRepository.findOne({
      where: {
        username: userData.username,
      },
    });

    if (userWithThatUsernameExists)
      throw new HttpException('User with that username already exists!', 409);

    const userWithThatEmailExists = await this.usersRepository.findOne({
      where: {
        email: userData.email,
      },
    });

    if (userWithThatEmailExists)
      throw new HttpException('User with that email already exists!', 409);

    const user = this.usersRepository.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
    });

    this.usersRepository.save([user]);

    const { password, ...userFinalData } = user;

    return { status: 'Success', userData: { ...userFinalData } };
  }
}
