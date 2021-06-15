import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  Injectable,
  Request,
} from '@nestjs/common';
import { ThreadServices } from './thread.services';
@Injectable()
@Controller('thread')
export class ThreadController {
  constructor(private readonly Thread: ThreadServices) {}
  @Post()
  async postThread(
    @Body('title') title: string,
    @Body('body') body: string,
    @Request() req,
  ) {
    console.log('ee');
    const id = req.user.id;
    return this.Thread.postThread(title, body, id);
  }

  @Post('comment')
  async addComment(@Body('text') title: string, @Request() req) {
    console.log('ee');
    const id = req.user.id;
    return this.Thread.createComment(title, id);
  }

  @Get()
  async getThread(@Request() req) {
    return this.Thread.getThread();
  }
}
