import { Router } from 'express';
import {protect} from '../middlewares/authMiddleware'
import {registerUser, registerOfficial, signIn, getByNameJurisdictionOrPosition, getUser, logoutUser, deleteUser, getOfficialWithoutAuth, getAllOfficialWithoutAuth} from '../controllers/userController'
import {signUpSchema, officialSchema, signInSchema} from '../middlewares/joiSchema';
import { validate } from '../middlewares/joiValidator';

const router = Router();


router.get('/citizen', protect, getUser);
router.get('/official', protect, getByNameJurisdictionOrPosition);
router.get('/officials/web3', getAllOfficialWithoutAuth)
router.get('/official/web3', getOfficialWithoutAuth)
router.post("/logout", logoutUser);
router.post('/register/official', validate(officialSchema), registerOfficial);
router.post('/register/citizen', validate(signUpSchema), registerUser);
router.post("/login",validate(signInSchema), signIn);
router.delete('/delete', deleteUser)


export default router