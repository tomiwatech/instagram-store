import { Router } from 'express';
import userController from '../controllers/userController';
// import {
//     validateLogin,
//     validateSignup
// } from '../../middlewares/validators/user';

const router = Router();


router.get('/signup', userController.getAll);
router.get('/user/count', userController.countAll);
router.post('/signup', userController.createUser);
// router.post('/user/signup', validateSignup, userController.createUser);
// router.post('/user/login', validateLogin, userController.login);


export default router;