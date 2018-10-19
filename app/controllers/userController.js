import userService from '../services/userService';
import OAuth2Client from 'google-auth-library';
import http from 'http';
import url from 'url';
import querystring from 'querystring';
import opn from 'opn';
import keys from './keys.js';
import passport from 'passport';
import GoogleStrategy from '../../config/passport-google';
import FacebookStrategy from '../../config/passport-facebook';

//console.log(keys);
/**
 * @exports
 * @class userController
 */
class UserController {
    /**
     * Creates a new user
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static createUser(req, res) {
        const {
            firstname
        } = req.body;
        console.log(firstname);
        userService.saveUser(req.body).then((result) => {
            console.log(result);
            return res.status(201).json({
                'responseMessage': 'New user created successfully',
            });
        }).catch((err) => {
            //console.log(err.rows[0].email);
            if (err.rows[0].email) {
                return res.status(400).json({
                    responseMessage: `User with this email ${err.rows[0].email} exists already`,
                });
            } else {
                return res.status(400).json({
                    responseMessage: 'could not save user',
                });
            }
        });
    }

    static googleRedirect(req, res) {
        passport.authenticate('google');
    }


    static facebookRedirect(req, res) {
        passport.authenticate('facebook', { failureRedirect: '/api/v1', successRedirect: '/api/v1' })
    }


}

export default UserController;