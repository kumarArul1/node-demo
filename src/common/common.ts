import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
const envConfig = dotenv.config()
if (envConfig.error) {
    console.log('envConfig.error ', envConfig.error);
}
import * as fs from 'fs-extra';

export class CommonModule {

    public static CreateDirectory(dest, directoryName, vendorId?) {
        const path = `${dest}${directoryName}`;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }

        if (vendorId) {
            let vendorFolderPath = `${path}/${vendorId}`
            if (!fs.existsSync(vendorFolderPath)) {
                fs.mkdirSync(vendorFolderPath);
            }
        }
    }
}


export class ReturnData {
    data: any;
    message: string;
    status: ReturnStatus;
    httpStatus: number = 200;
    constructor(data: any, message: string, status: ReturnStatus, httpStatus?: number) {
        this.data = data;
        this.message = message;
        this.status = status;
        this.httpStatus = httpStatus;
    }
}

export enum ReturnStatus {
    Success = 1,
    Error,
    Warning,
    Info
}

export enum ReturnValue {
    IdNotFound = 1,
    Success,
    Failed,
    AlreadyExist,
    Mapped,
    Updated,
    Deleted,
    UnVerified,
    AlreadyVerified

}

export enum LoginType {
    InactiveUserLogin = 1,
    InvalidLogin = 0,
    ForgotPasswordRequest = 2
}

export enum StatusCode {
    "successful" = 200,
    "created" = 201,
    "empty" = 204,
    "badRequest" = 400,
    "Unauthorized" = 401,
    "internalServer" = 500,
    "conflict" = 409,
    "preConditionFailed" = 412,
    "Unavailable" = 451
}

export const no_data = 'No data found.'
export const IMG_SERVER="http://localhost:9000"



