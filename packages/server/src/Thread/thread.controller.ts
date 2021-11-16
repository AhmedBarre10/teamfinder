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
} from "@nestjs/common";
import { ThreadServices } from "./thread.services";
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Socket, Server } from "socket.io";

@Injectable()
@WebSocketGateway()
@Controller("thread")
export class ThreadController
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly Thread: ThreadServices) {}
  @Post()
  async postThread(
    @Body("title") title: string,
    @Body("body") body: string,
    @Request() req
  ) {
    // const id = req.user.id;
    console.log("meesage sent");
  }

  // @Post("comment")
  // async addComment(@Body("text") title: string, @Request() req) {
  //   const id = req.user.id;
  //   return this.Thread.createComment(title, id);
  // }

  @Get()
  async getThread(@Request() req) {
    // const to = this.Thread.getThread("60116f1cbfa84b001e6f5bb3");
    const thread = await this.Thread.getMyThread();
    return thread;
  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger("AppGateway");

  getHello(): string {
    return "Hello World!";
  }

  afterInit(server: Server) {
    this.logger.log("Init");
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
