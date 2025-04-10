import { Router } from 'express';
import {addUser} from '../controllers/userController'
import schema from '../middlewares/joiSchema';
import { validate } from '../middlewares/joiValidator';

const router = Router();

router.post('/user', validate(schema.singUp), addUser)

export default router