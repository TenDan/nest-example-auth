import { LocalStrategy } from './local.strategy';
import { UsersModule } from './../users/users.module';
import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from "@nestjs/passport";
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '3600s'
    }
  })],
  providers: [AuthService, UsersService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
