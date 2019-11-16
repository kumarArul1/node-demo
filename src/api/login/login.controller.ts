import { LoginModel } from './../../model/login/login-model';
import { LoginType, StatusCode, ReturnData, ReturnStatus } from './../../common/common';
import { Request, Response, NextFunction } from "express";
import { schema } from "../login/login.validator";
import * as Joi from 'joi';
import { MSGS } from "./login.constants";
import { LoginRepository } from "../../repository/login/login.repository";

export class LoginController {

  public async login(req: Request, res: Response, next: NextFunction) {
    try {

      let loginModel: LoginModel = req.body;
      let validateData = Joi.validate({ mobileNumber: req.body.mobileNumber, deviceId: req.body.deviceId }, schema);

      if (validateData.error === null) {

        const loginRepository = new LoginRepository();
        let login = await loginRepository.customerLogin(loginModel);
        
        if (login === LoginType.InvalidLogin) {
          const results: ReturnData = new ReturnData([], MSGS.LOGIN_UNSUCCESSFUL, ReturnStatus.Error);
          res.status(StatusCode.Unauthorized).json(results);
        } else {
          const results: ReturnData = new ReturnData(login, MSGS.LOGIN_SUCCESSFUL, ReturnStatus.Error);
          res.status(StatusCode.Unauthorized).json(results);
        }

      } else {

        const results: ReturnData = new ReturnData([], validateData.error.details[0].message, ReturnStatus.Success);
        res.status(StatusCode.badRequest).json(results);

      }
    } catch (e) {

      const results: ReturnData = new ReturnData([], e.message, ReturnStatus.Error);
      res.status(StatusCode.internalServer).json(results);
    }
  }

}