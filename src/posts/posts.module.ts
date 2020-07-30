import { User } from './../users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Module } from '@nestjs/common';
import { Post } from './post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService, TypeOrmModule]
})
export class PostsModule {}
