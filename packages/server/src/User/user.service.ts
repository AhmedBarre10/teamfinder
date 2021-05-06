import { Body, Req,Res } from '@nestjs/common';
import { get } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from '@nestjs/common';
import { User } from './user.schema';


import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { ConfigService } from '@nestjs/config';





@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    private jwt: JwtService,
    private configService: ConfigService,
    
    
  ) {}

  async addUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      let user = await this.UserModel.findOne({ email });
      let users = await this.UserModel.findOne({ email }).select(
        '-password -_id -date -__v ',
      );

      if (!user) {
        return 'Invalid Credentials';
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return 'Invalid Credentials';
      }

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

  async getUsers() {
    const users = await this.UserModel.find().exec();

    return users;
  }

  async signup(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      let user = await this.UserModel.findOne({ email });

      if (user) {
        return 'User already exists';
      }

      user = new this.UserModel({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      console.log('saved');

      const payload = {
        user: {
          id: user.id,
        },
      };

      return this.jwt.sign(payload);
    } catch (err) {
      console.log(err);
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

  async getUserAndSaveProfile(id:string,filename){
  let user = await this.UserModel.findById(id)
  user.profileImage = filename;
  await user.save();
  return user

  }



  async fileupload(@Req() req, @Res() res) {
    try {
      console.log('hey')
AWS.config.update({
  accessKeyId:"AKIASWPEYLNB5JQETP7L",
  secretAccessKey:"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"
});
      
      this.upload(req, res, function(error) {
        if (error) {
          console.log(error);
          return res.status(404).json(`Failed to upload image file: ${error}`);
        }
        return res.status(201).json(req.files[0].location);
      });
    } catch (error) {
      console.log('get')
      console.log(this.configService.get('AWS_S3_BUCKET_NAME'))
      console.log(error);
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }

  upload = multer({
    storage: multerS3({
      s3: new AWS.S3(),
      bucket:"teamfinderphotos",
      // acl: 'public-read',
      key: function(request, file, cb) {
        cb(null, `${Date.now().toString()} - ${file.originalname}`);
      },
    }),
  }).array('upload', 1);


}
