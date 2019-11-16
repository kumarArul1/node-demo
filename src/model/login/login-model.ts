
export class LoginModel {

    mobileNumber: string;
    deviceId: string;
    constructor(mobileNumber?: string, deviceId?: string) {
        this.mobileNumber = mobileNumber;
        this.deviceId = deviceId;
    }

}