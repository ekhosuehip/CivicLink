import { Router } from 'express';
import {addUser, getOfficials, getUser} from '../controllers/userController'
import schema from '../middlewares/joiSchema';
import { validate } from '../middlewares/joiValidator';

const router = Router();

router.get('/get/', getUser)
router.get('/get/officials', getOfficials)
router.post('/add', validate(schema.singUp), addUser)


export default router