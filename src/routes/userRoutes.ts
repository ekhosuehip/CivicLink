import { Router } from 'express';
import {registerUser, registerOfficial, signIn, getUser, deleteUser} from '../controllers/userController'
import {signUpSchema, signInSchema} from '../middlewares/joiSchema';
import { validate } from '../middlewares/joiValidator';

const router = Router();

router.get('/get/', getUser)
router.post('/register/official', validate(signUpSchema), registerUser);
router.post('/register/citizen', validate(signUpSchema), registerUser);
router.post("/login",validate(signInSchema), signIn);
router.delete('/delete', deleteUser)


export default router