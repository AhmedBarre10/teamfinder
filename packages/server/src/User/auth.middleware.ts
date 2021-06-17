import { Request } from "@nestjs/common";
import { Response, NextFunction } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";

var jwt = require("jsonwebtoken");

@Injectable()
export class authMiddleware implements NestMiddleware {
  use(@Request() req, res: Response, next: NextFunction) {
    const token = req.header("authorization");

    if (!token) {
    }
    try {
      jwt.verify(token, "jwtSecret", (error, decoded) => {
        if (error) {
          return res.status(401).json({ msg: error });
        } else {
          req.user = decoded.user;
          next();
        }
      });
    } catch (err) {
      console.error("something wrong with auth middleware");
      res.status(500).json({ msg: "Server Error" });
    }
  }
}

// module.exports = function (req, res, next) {
//   // Get token from header

// };
