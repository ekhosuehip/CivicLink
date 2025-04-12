import { Router } from 'express';
import {protect} from '../middlewares/authMiddleware'
import {registerUser, 
    registerOfficial, 
    signIn,
    getAllOfficial,
    getByNameJurisdictionOrPosition, 
    getUser, 
    logoutUser, deleteUser, getOfficialWithToken, getAllOfficialWithToken} from '../controllers/userController'
import {signUpSchema, officialSchema, signInSchema} from '../middlewares/joiSchema';
import { validate } from '../middlewares/joiValidator';

const router = Router();


router.get('/citizen', protect, getUser);
router.get('/official', protect, getByNameJurisdictionOrPosition);
router.get('/officials', protect, getAllOfficial);


router.get('/admin/officials/:authToken', getAllOfficialWithToken)
router.get('/admin/official/:authToken', getOfficialWithToken)

router.post("/logout", logoutUser);
router.post('/register/official', validate(officialSchema), registerOfficial);
router.post('/register/citizen', validate(signUpSchema), registerUser);
router.post("/login",validate(signInSchema), signIn);


export default router