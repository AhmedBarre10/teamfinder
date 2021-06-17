import { Body, Req, Res } from "@nestjs/common";
import { get } from "mongoose";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Request } from "@nestjs/common";
import { User } from "./user.schema";

import * as multer from "multer";
import * as AWS from "aws-sdk";
import * as multerS3 from "multer-s3";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User") private readonly UserModel: Model<User>,
    private jwt: JwtService,
    private configService: ConfigService
  ) {}

  async addUser(
    @Body("email") email: string,
    @Body("password") password: string
  ) {
    try {
      let user = await this.UserModel.findOne({ email });
      let users = await this.UserModel.findOne({ email }).select(
        "-password -_id -date -__v "
      );

      if (!user) {
        return "Invalid Credentials";
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return "Invalid Credentials";
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      return { token: this.jwt.sign(payload), userInfo: user };
    } catch (err) {
      return err;
    }
  }

  async getUsers() {
    const users = await this.UserModel.find().exec();

    return users;
  }

  async getUserById(id) {
    const user = await this.UserModel.findById(id);
    return user;
  }
  async signup(
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("password") password: string
  ) {
    try {
      let user = await this.UserModel.findOne({ email });

      if (user) {
        return "User already exists";
      }

      user = new this.UserModel({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      return this.jwt.sign(payload);
    } catch (err) {
      return err;
    }
  }

  async resetPassword(@Body() email: string, @Body() newPassword: string) {
    const user = await this.UserModel.findOne({ email });
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);
    await user.update();
    return user;
  }

  async getUserAndSaveProfile(id: string, filename) {
    let user = await this.UserModel.findById(id);
    user.profileImage = filename;
    await user.save();
    return user;
  }

  async fileupload(@Req() req, @Res() res) {
    try {
      const user = await this.UserModel.findById(req.user.id);
      AWS.config.update({
        accessKeyId: "AKIASWPEYLNB5JQETP7L",
        secretAccessKey: "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",
      });

      let update = multer({
        storage: multerS3({
          s3: new AWS.S3(),
          bucket: "teamfinderphotos",
          // acl: 'public-read',
          key: function (request, file, cb) {
            let imagename = `${req.user.id.toString()}${file.originalname}`;
            user.profileImage = imagename;
            user.save();

            cb(null, imagename);
          },
        }),
      }).array("upload", 1);

      update(req, res, function (error) {
        if (error) {
          return res.status(404).json(`Failed to upload image file: ${error}`);
        }
        return res.status(201).json(req.files[0].location);
      });
    } catch (error) {
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }

  async getFileStream(fileKey: string) {
    const s3 = new AWS.S3();
    if (fileKey === "none") {
      fileKey = fileKey + ".png";
    }
    const downloadParams = {
      Key: fileKey,
      Bucket: "teamfinderphotos",
    };

    return s3.getObject(downloadParams).createReadStream();
  }

  async getMe(id: string) {
    const myInfo = this.UserModel.findById(id);
    return myInfo;
  }
}
