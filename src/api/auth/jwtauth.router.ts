import { login } from './../../common/message';
import { ReturnData, ReturnStatus } from './../../common/common';
import * as jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
const envConfig = dotenv.config()
if (envConfig.error) {
  console.log('envConfig.error ', envConfig.error);
}

export class AuthRoutes {

  public static async getUserIdFromToken(token) {
    try {
      let decoded: any = await jwt.decode(token.toString());
      let userId = (decoded) ? decoded.userLoginModel[0].userId : null;
      return userId
    } catch (err) {
      throw err;
    }
  }

  public isAuthenticated(req, res, next) {
    if (req.method === "OPTIONS") {
      next()
      return
    }

    const bearerHeader = req.headers["authorization"] || ` ${req.query['token']}`;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      let token = bearerToken;
      try {
        var decoded = jwt.verify(token.toString(), envConfig.parsed.LOGIN_SECRET_KEY);
        if (decoded) {
          next()
        }
      } catch (err) {
        const results: ReturnData = new ReturnData([], login.unauthorizedAccess, ReturnStatus.Error);
        res.status(403).json(results);
      }
    } else {
      const results: ReturnData = new ReturnData([], login.authorizationToken, ReturnStatus.Error);
      res.status(403).json(results);
    }
  }

  public async getToken(req) {
    try {
      const bearerHeader = req.headers["authorization"] || ` ${req.query['token']}`;
      if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        let token = bearerToken;
        return token;
      }
    } catch (err) {
      throw err;
    }
  }
}