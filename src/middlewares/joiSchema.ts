import Joi from 'joi';
import IUser from '../interfaces/Users';

const schema = {
    singUp: Joi.object({
    fullName: Joi.string().min(1).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string().min(11).required(),
    stateOfOrigin: Joi.string().min(2).required(),
    category: Joi.string().valid("citizen", "official").required(),
    position: Joi.alternatives().conditional('category', {
      is: 'official',
      then: Joi.string().min(2).required(),
      otherwise: Joi.forbidden(),
    }),
  }),
};
export default schema;
