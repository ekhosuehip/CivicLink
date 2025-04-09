import Joi from 'joi';
import IUser from '../interfaces/Users';

const schema = {
    singUp: Joi.object<IUser>({
        fullName: Joi.string().min(1).required(),
        email: Joi.string().email({ minDomainSegments: 2}).required(),
        phone: Joi.string().min(11).required(),
        position: Joi.string().min(5).required(),
        stateOfOrigin: Joi.string().min(2),
    }),
};

export default schema