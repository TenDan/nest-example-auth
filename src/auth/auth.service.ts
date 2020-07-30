import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDataDto } from "../users/dto/userData.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username, {select: ['id', 'username', 'password']});
    const passwordIsRight = bcrypt.compareSync(password, user.password);
    if (user && passwordIsRight) {
      // eslint-disable-next-line
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(userData: UserDataDto): Promise<any> {
    return await this.usersService.create(userData);
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.username, sub: user.userId }
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET
      })
    }
  }
}
