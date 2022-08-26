
import Joi from 'joi';

export const createUserSchema = {
    body: Joi.object().keys({
        first_name: Joi.string().min(2).message('Invalid first name').required(),
        last_name: Joi.string().min(2).message('Invalid last name').required(),
        email: Joi.string().email({ tlds: { allow: false } }).message('Invalid email').required(),
    }),
}