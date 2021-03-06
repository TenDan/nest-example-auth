import { PostToEditDataDto } from './dto/postToEditData.dto';
import { PostDataDto } from './dto/postData.dto';
import { ShowAllPostsQueryDto } from './dto/showAllPostsQuery.dto';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async showAllPosts(@Query() { sortBy, orderBy }: ShowAllPostsQueryDto) {
    return this.postsService.findAll({ sortBy, orderBy });
  }

  @Get(':id')
  async showSinglePost(@Param('id') id) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addPost(@Req() req, @Body() body: PostDataDto) {
    return this.postsService.create(req.user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updatePost(
    @Req() req,
    @Param('id') id: string,
    @Body() body: PostToEditDataDto,
  ) {
    console.log(id);
    return this.postsService.update(req.user, id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deletePost(@Req() req, @Param('id') id) {
    return this.postsService.delete(req.user, id);
  }
}
