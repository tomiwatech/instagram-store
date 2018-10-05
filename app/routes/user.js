import { Router } from 'express';
import userController from '../controllers/userController';
import Middleware from '../middlewares/users';

const router = Router();

// router.get('/signup', userController.getAll);
// router.get('/user/count', userController.countAll);
router.post('/signup', Middleware.validateUserSignup, userController.createUser);


export default router;