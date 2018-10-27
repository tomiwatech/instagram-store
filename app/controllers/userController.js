import userService from "../services/userService";
import passport from "passport";
import GoogleStrategy from "../../config/passport-google";
import FacebookStrategy from "../../config/passport-facebook";

//console.log(keys);
/**
 * @exports
 * @class userController
 */
class UserControllerClass {
    /**
     * Creates a new user
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    createUser(req, res) {
        const { firstname } = req.body;
        console.log(firstname);
        userService
            .saveUser(req.body)
            .then(result => {
                console.log(result);
                return res.status(201).json({
                    responseMessage: "New user created successfully"
                });
            })
            .catch(err => {
                //console.log(err.rows[0].email);
                if (err.rows[0].email) {
                    return res.status(400).json({
                        responseMessage: `User with this email ${
                            err.rows[0].email
                        } exists already`
                    });
                } else {
                    return res.status(400).json({
                        responseMessage: "Could not save user"
                    });
                }
            });
    }

    googleRedirect(req, res) {
        passport.authenticate("google");
    }

    facebookRedirect(req, res) {
        passport.authenticate("facebook", {
            failureRedirect: "/api/v1",
            successRedirect: "/api/v1"
        });
    }

    changePassword(req, res) {
        const { email } = req.body;

        const host = req.headers.host;

        userService
            .sendChangePasswordMail(email, host)
            .then(response => {
                return res.status(200).json({
                    responseMessage: "Please Check Mail to Change Password"
                });
            })
            .catch(err => {
                console.log(err);
                return res.status(400).json({
                    responseMessage: `Error Changing Password`
                });
            });
    }

    getSecretToken(req, res) {
        const token = req.params.id;

        console.log(token);

        userService
            .verifySecretToken(token)
            .then(response => {
                return res.status(200).json({
                    responseMessage:
                        "Token Verification Successful, Please Change Password"
                });
            })
            .catch(err => {
                return res.status(400).json({
                    responseMessage: "Token Verification Failed"
                });
            });
    }

    changePasswordByToken(req, res) {
        console.log("Loggedin UserID - " + req.decoded.data);

        const { newpassword, token } = req.body;

        userService
            .updatePasswordByToken(newpassword, token)
            .then(response => {
                return res.status(200).json({
                    responseMessage: "Password Updated Successfully"
                });
            })
            .catch(err => {
                return res.status(400).json({
                    responseMessage: "There Was an Error Changing Password"
                });
            });
    }

    loginUser(req, res) {
        const { email, password } = req.body;

        userService
            .validateUserLogin(email, password)
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(err => {
                return res.status(400).json({
                    responseMessage: err
                });
            });
    }
}

const userControllerInstance = new UserControllerClass();

export default userControllerInstance;
