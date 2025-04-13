import Joi from 'joi';
import {IUser} from '../interfaces/Users';
import { IOfficial } from '../interfaces/Oficial';


// This schema is used to validate the data for user registration and login.
export const signUpSchema = Joi.object<IUser>({
  fullName: Joi.string().min(1).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(11).required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
    }),
  stateOfOrigin: Joi.string().min(2).required(),
});

export const officialSchema = Joi.object<IOfficial>({
  fullName: Joi.string().min(1).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(11).required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
    }),
  jurisdiction: Joi.string().valid('federal', 'state', 'local').required(),
  position: Joi.string().min(2).required(),
  stateOfOrigin: Joi.string().min(2).required(),
});

export const signInSchema = Joi.object<IUser>({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required(),
});


