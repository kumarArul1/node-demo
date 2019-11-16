import { LoginType } from './../../common/common';
import { LoginModel } from './../../model/login/login-model';
import { ILoginRepository } from './../contracts/login/i.login.repository';
import { dbPool } from '../../common/config';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
const envConfig = dotenv.config()
if (envConfig.error) {
  console.log('envConfig.error ', envConfig.error);
}

export class LoginRepository implements ILoginRepository {

    constructor() { }

    async customerLogin(customerLogin: LoginModel) {

        const loginQuery = `SELECT cus.id AS "customerId", 
                            cus.name AS "customerName", 
                            cus.mobile_number AS "mobileNumber", 
                            cus.email, 
                            cus.gender, 
                            cus.nationality
                            FROM public.customer cus
                            INNER JOIN customer_devices cus_dev ON cus.id = cus_dev.customer_id
                            WHERE cus.mobile_number = '${customerLogin.mobileNumber}'
                            AND cus_dev.device_id = '${customerLogin.deviceId}'`;

        const loginResult: any = await dbPool.query(loginQuery);

        if(loginResult.rowCount > 0) {
            const data = loginResult.rows[0];
            let token = await jwt.sign({ data }, envConfig.parsed.LOGIN_SECRET_KEY);
            loginResult.rows[0]['token'] = token;
            
            return loginResult.rows;

        } else {

            return LoginType.InvalidLogin; 
        }                 
    } 

}