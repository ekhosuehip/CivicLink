import Joi from 'joi';
import IUser from '../interfaces/Users';

const schema = {
    singUp: Joi.object<IUser>({
        fullName: Joi.string().min(1).required(),
        email: Joi.string().email({ minDomainSegments: 2}).required(),
        phone: Joi.string().min(11),
        nin: Joi.string().min(11).required(),
    }),
};

export default schema