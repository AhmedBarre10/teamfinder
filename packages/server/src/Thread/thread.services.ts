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

@Injectable()
export class ThreadServices {
  constructor(
    @InjectModel("Thread") private readonly ThreadModel: Model<Thread>,

    @InjectModel("Comments") private readonly CommentsModel: Model<Comments>,

    private readonly userService: UserService,
    private readonly configservice: ConfigService
  ) {}

  async postThread(title: string, body: string, id: string) {
    const userInfo = await this.userService.getUserById(id);
    const user = {
      name: userInfo.name,
      profileImage: userInfo.profileImage,
      id: userInfo._id,
    };
    const i = "ssss";
    const newThread = new this.ThreadModel({
      title,
      body,
      user,
    });

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

  async getThread() {
    const threads = await this.ThreadModel.find();
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
