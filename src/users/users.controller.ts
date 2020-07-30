import { User } from './user.entity';
import { UsersService } from './users.service';
import { Controller, Get, Query, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers(@Query('withPosts') withPosts: boolean): Promise<User[]> {
    return this.usersService.findAll(withPosts);
  }

  @Get(':username')
  async findUserByUsername(
    @Param('username') username,
    @Query('withPosts') withPosts: boolean,
  ): Promise<User | undefined> {
    return this.usersService.findOne(username, {select: ['id', 'username']}, withPosts);
  }
}
