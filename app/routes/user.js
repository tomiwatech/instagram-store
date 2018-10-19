import { Router } from 'express';
import userController from '../controllers/userController';
import Middleware from '../middlewares/users';
import passport from 'passport';

const router = Router();

router.post('/auth/signup', Middleware.validateUserSignup, userController.createUser);

// Google login
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}));
router.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        console.log('success here')
        res.redirect('/');
    });

// Facebook login
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/redirect', passport.authenticate('facebook', { failureRedirect: '/api/v1', successRedirect: '/api/v1' }));

export default router;

