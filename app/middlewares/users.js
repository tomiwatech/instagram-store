import Joi from "joi";
import {
    signupSchema,
    emailVerificationSchema,
    changePasswordSchema,
    loginSchema
} from "../models/validation";
/**
 *
 * @exports
 * @class UserMiddleware
 */
class UserMiddleware {
    /**
     * UserMiddleware
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */
    static validateUserSignup(req, res, next) {
        Joi.validate(req.body, signupSchema)
            .then(value => next())
            .catch(err => {
                return res.status(400).json({
                    responseCode: "01",
                    responseMessage: err.details[0].message
                });
            });
    }

    static validateChangePasswordEmail(req, res, next) {
        Joi.validate(req.body, emailVerificationSchema)
            .then(value => next())
            .catch(err => {
                return res.status(400).json({
                    responseCode: "01",
                    responseMessage: err.details[0].message
                });
            });
    }

    static validateChangePassword(req, res, next) {
        Joi.validate(req.body, changePasswordSchema)
            .then(value => next())
            .catch(err => {
                return res.status(400).json({
                    responseCode: "01",
                    responseMessage: err.details[0].message
                });
            });
    }

    static validateUserLogin(req, res, next) {
        Joi.validate(req.body, loginSchema)
            .then(value => next())
            .catch(err => {
                return res.status(400).json({
                    responseCode: "01",
                    responseMessage: err.details[0].message
                });
            });
    }
}

export default UserMiddleware;
