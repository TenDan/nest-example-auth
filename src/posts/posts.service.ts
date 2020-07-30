import { PostToEditDataDto } from './dto/postToEditData.dto';
import { User } from './../users/user.entity';
import { PostDataDto } from './dto/postData.dto';
import { Post } from './post.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepository } from '../users/users.service';

export type PostsRepository = Repository<Post>;

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: PostsRepository,
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: string): Promise<Post | undefined> {
    return this.postsRepository.findOne({
      where: {
        id
      },
      relations: ['user']
    });
  }

  async create(user: any, postData: PostDataDto): Promise<any> {
    const username = user.username;
    const userData = await this.usersRepository.findOne({
      where: {
        username,
      },
    });
    const post = this.postsRepository.create(postData);
    post.createdAt = new Date();
    post.updatedAt = new Date();
    post.user = userData;
    this.postsRepository.save([post]);
    //delete post.user.password;
    return { status: 'Success', postData: { ...post } };
  }

  async update(
    user: any,
    id: string,
    postData: PostToEditDataDto,
  ): Promise<any> {
    console.log({id});
    const username = user.username;
    const userData = await this.usersRepository.findOne({
      where: {
        username,
      },
    });
    const postToEdit = await this.postsRepository.findOne(id);
    if (!postToEdit)
      throw new HttpException('Post with that id not found', 404);

    const postAndUserCorrection = await this.postsRepository.findOne({
      where: {
        user: userData
      }
    })

    if (!postAndUserCorrection)
      throw new HttpException('Access denied for this action', 403);

    postToEdit.title = postData.title || postToEdit.title;
    postToEdit.description = postData.description || postToEdit.description;
    postToEdit.updatedAt = new Date();

    this.postsRepository.save([postToEdit]);
    //delete postToEdit.user.password;
    return { status: 'Success', editedPostData: { ...postToEdit } };
  }

  async delete(user: any, id: string): Promise<any> {
    const username = user.username;
    const userData = await this.usersRepository.findOne({
      where: {
        username
      }
    });
    const postToDelete = await this.postsRepository.findOne({
      where: {
        id
      }
    });
    if (!postToDelete) throw new HttpException('Post with that id not found', 404);

    const postAndUserCorrection = await this.postsRepository.findOne({
      where: {
        user: userData
      }
    })

    if (!postAndUserCorrection) throw new HttpException('Access denied for this action', 403);

    this.postsRepository.delete(postToDelete);
    return { status: 'Success' };
  }
}
