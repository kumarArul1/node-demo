import * as Joi from 'joi';

export const schema = Joi.object().keys({
    mobileNumber: Joi.string().required(),
    deviceId: Joi.string().required()
})