import moment from "moment";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
import config from "../../config/configuration";
import crypto from "../helpers/crypto";
import queryProvider from "../queries/index";

/**
 * @exports
 * @class userService
 */
class userService {
    /**
     * Find user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */
    static findUserByEmail(email) {
        return new Promise((resolve, reject) => {
            queryProvider
                .findUserByEmailQuery(email)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }

    /**
     * save new user
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */

    // When login, active = true
    // When logout, active = false
    // When updating, set updated_at time
    // when creating, set added_at = updated_at
    static saveUser(body) {
        return new Promise((resolve, reject) => {
            queryProvider
                .saveUserQuery(body)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }

    /**
     * Find user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */
    static verifySecretToken(token) {
        return new Promise((resolve, reject) => {
            queryProvider
                .verifySecretTokenQuery(token)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }

    static updatePasswordByToken(newpassword, token) {
        return new Promise((resolve, reject) => {
            queryProvider
                .updatePasswordByTokenQuery(newpassword, token)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }

    static validateUserLogin(email, userpassword) {
        return new Promise((resolve, reject) => {
            this.findUserByEmail(email)
                .then(res => {
                    const dbpassword = res.rows[0].password;
                    const userid = res.rows[0].id;

                    crypto
                        .compare(userpassword, dbpassword)
                        .then(response => {
                            const token = jwt.sign(
                                { data: userid },
                                config.jwtSecretKey,
                                {
                                    expiresIn: 86400 // expires in 24 hours
                                }
                            );

                            const data = {
                                message: "Authentication Successful",
                                data: res.rows[0],
                                token
                            };

                            resolve(data);
                        })
                        .catch(err => {
                            reject("Wrong Password and Email Combination");
                        });
                })
                .catch(err => {
                    console.log(err);
                    reject(
                        "Wrong Email and Password Combination. Please Check your credentials"
                    );
                });
        });
    }

    static sendChangePasswordMail(email, host) {
        const d = new Date();
        const added_at = moment(d).format("YYYY-MM-DD HH:mm:ss");

        return new Promise((resolve, reject) => {
            this.findUserByEmail(email)
                .then(res => {
                    console.log(res);

                    const secretToken = res.rows[0].secret_token;

                    var link =
                        "http://" +
                        host +
                        "/api/v1/auth/email/verify/" +
                        secretToken;

                    console.log(link);

                    console.log(config.sendGridKey);

                    sgMail.setApiKey(config.sendGridKey);

                    const msg = {
                        to: email,
                        from: "OnePercentLab 👻 <onepercentlab@gmail.com>",
                        subject: "EMAIL VERIFICATION",
                        html:
                            "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
                            link +
                            ">Click here to verify</a>"
                    };

                    sgMail.send(msg);

                    resolve("email sent");
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    }
}

export default userService;
