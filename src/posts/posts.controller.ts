import { PostsService } from './posts.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Post, UseGuards, Req, Body, Param, Put, Delete, Query } from '@nestjs/common';

@Controller('posts')
export class PostsController {

  constructor(
    private readonly postsService: PostsService
  ) {}

  @Get()
  async showAllPosts(@Query('sortBy') sortBy, @Query('orderBy') orderBy) {
    return this.postsService.findAll({sortBy, orderBy});
  }

  @Get(':id')
  async showSinglePost(@Param('id') id) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addPost(@Req() req, @Body() body) {
    return this.postsService.create(req.user, body)
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updatePost(@Req() req, @Param('id') id: string, @Body() body) {
    console.log(id);
    return this.postsService.update(req.user, id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deletePost(@Req() req, @Param('id') id) {
    return this.postsService.delete(req.user, id);
  }
}
