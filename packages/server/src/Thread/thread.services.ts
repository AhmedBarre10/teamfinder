import { Body, Req, Res } from "@nestjs/common";
import { get } from "mongoose";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Request } from "@nestjs/common";
import { Thread } from "./thread.schema";
import * as multer from "multer";
import * as AWS from "aws-sdk";
import * as multerS3 from "multer-s3";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../User/user.service";
import { Comments } from "./comments.schema";
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  MessageBody,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Socket, Server } from "socket.io";

@Injectable()
@WebSocketGateway()
export class ThreadServices
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectModel("Thread") private readonly ThreadModel: Model<Thread>,
    private readonly userService: UserService
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger("AppGateway");

  getHello(): string {
    return "Hello World!";
  }

  @SubscribeMessage("msgSent")
  async handleMessage(
    @MessageBody() message: string,
    @MessageBody() sender: string,

    @Request() req,
    client: Socket
  ) {
    console.log("senderssss");
    console.log(sender[1]);
    await this.postThread(message[0], sender[1]);

    let threads = await this.ThreadModel.find()
      .populate({
        path: "sender",
      })
      .exec();
    this.server.emit("load", threads);
  }

  @SubscribeMessage("load")
  async msgReciveds() {
    let threads = await this.ThreadModel.find()
      .populate({
        path: "sender",
      })
      .exec();

    this.server.emit("load", threads);
  }

  afterInit(server: Server) {
    this.logger.log("Init");
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const threads = await this.ThreadModel.find();

    // this.server.emit("load", threads);
    this.logger.log(`Client connected: ${client.id}`);
  }

  async postThread(msg: any, sender: any) {
    // const { id, name } = from;
    // const userInfo = await this.userService.getUserById(id);
    // const user = {
    //   name: userInfo.name,
    //   profileImage: userInfo.profileImage,
    //   id: userInfo._id,
    // };
    const i = "ssss";
    const newThread = new this.ThreadModel({
      sender: sender,
      msg: msg,
      date: Date.now(),
    });

    console.log("success");

    const thread = await newThread.save();
    return thread;
  }

  async createComment(text: string, id: string) {
    const userInfo = await this.userService.getUserById(id);
    const user = {
      name: userInfo.name,
      profileImage: userInfo.profileImage,
      id: userInfo._id,
    };
    const newThread = new this.ThreadModel({
      text,
      user,
    });
    var tagTexts = "600e4eb8bb3dc4001e217f54";

    const myPost = await this.ThreadModel.find(
      { "user.id": tagTexts },
      function (err, obj) {}
    );

    // const myPost = await this.ThreadModel.find({
    //   'user.id': '600e4eb8bb3dc4001e217f54',
    // });

    // const thread = await newThread.save();
    // const addCaomment = userInfo.comments.push()
    // await comment = await this.CommentsModel.insertMany({text:text,user:user}),
    return [myPost, id];
  }

  async getMyThread() {
    let threads = await this.ThreadModel.find()
      .populate({
        path: "sender",
        populate: {
          path: "messages",
          model: "Thread",
        },
      })
      .exec();

    return threads;
  }

  //   async fileupload(@Req() req, @Res() res) {
  //     try {
  //       // const user = await this.UserModel.findById(req.user.id);
  //       AWS.config.update({
  //         accessKeyId: "AKIASWPEYLNB5JQETP7L",
  //         secretAccessKey: "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",
  //       });

  //       let update = multer({
  //         storage: multerS3({
  //           s3: new AWS.S3(),
  //           bucket: "teamfinderphotos",
  //           // acl: 'public-read',
  //           key: function (request, file, cb) {
  //             let imagename = `${req.user.id.toString()}${file.originalname}`;
  //             user.profileImage = imagename;
  //             user.save();
  //             console.log(cb);
  //             cb(null, imagename);
  //           },
  //         }),
  //       }).array("upload", 1);

  //       update(req, res, function (error) {
  //         if (error) {
  //           return res.status(404).json(`Failed to upload image file: ${error}`);
  //         }
  //         return res.status(201).json(req.files[0].location);
  //       });
  //     } catch (error) {
  //       return res.status(500).json(`Failed to upload image file: ${error}`);
  //     }
  //   }

  //   async getFileStream(fileKey: string) {
  //     const s3 = new AWS.S3();
  //     if (fileKey === "none") {
  //       fileKey = fileKey + ".png";
  //     }
  //     const downloadParams = {
  //       Key: fileKey,
  //       Bucket: "teamfinderphotos",
  //     };
  //     console.log(fileKey);

  //     return s3.getObject(downloadParams).createReadStream();
  //   }
  // }
}
