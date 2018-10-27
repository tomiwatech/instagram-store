import bcrypt from "bcrypt";
import moment from "moment";
import randomstring from "randomstring";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
import db from "../../config/connection/connect";
import config from "../../config/configuration";
import crypto from "../helpers/crypto";

const saltRounds = 10;
const obj = {};
const err = {};
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
            const query = `SELECT * FROM users WHERE email = '${email}'`;
            db.query(query)
                .then(result => {
                    if (result.rowCount === 0) {
                        err.data = "user does not exist";
                        err.responseCode = "01";
                        reject(err);
                    } else if (result.rowCount >= 1) {
                        obj.rowCount = result.rowCount;
                        obj.rows = result.rows;
                        resolve(obj);
                    }
                })
                .catch(e => {
                    console.log(e)
                    err.rowCount = 0;
                    err.rows = [];
                    reject(err);
                });
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
        const {
            firstname,
            lastname,
            gender,
            date_of_birth,
            phone_number,
            image_url,
            password,
            oauth_type,
            oauth_id,
            state_code,
            city_code,
            country_code,
            address,
            email
        } = body;

        const d = new Date();
        const active = false;
        const added_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
        const secretToken = randomstring.generate();
        console.log("secretToken", secretToken);

        return new Promise((resolve, reject) => {
            this.findUserByEmail(email)
                .then(err => {
                    reject(err);
                })
                .catch(res => {
                    bcrypt.hash(password, saltRounds).then(hash => {
                        const queryBody = `
                              INSERT INTO users(firstname, lastname, gender, date_of_birth, phone_number, image_url, password , oauth_type, oauth_id, state_code, city_code, country_code, address, email, added_at, updated_at, active, suspended_at, secret_token)
                              VALUES ('${firstname}', '${lastname}', '${gender}', '${date_of_birth}','${phone_number}','${image_url}','${hash}', '${oauth_type}', '${oauth_id}', '${state_code}', '${city_code}','${country_code}', '${address}', '${email}','${added_at}', '${added_at}', '${active}', '${added_at}','${secretToken}')`;
                        db.query(queryBody)
                            .then(result => {
                                if (result.rowCount >= 1) {
                                    resolve("Data Saved");
                                } else if (result.rowCount === 0) {
                                    console.log("got here", result);
                                    reject("Could Not Save User");
                                }
                            })
                            .catch(e => {
                                console.log("e", e);
                                reject("Error Saving New User");
                            });
                    });
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
                    reject("Error Saving New User, Please Register!!");
                });
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
            const query = `SELECT * FROM users WHERE secret_token = '${token}'`;
            db.query(query)
                .then(result => {
                    if (result.rowCount === 0) {
                        err.data = "user does not exist";
                        err.responseCode = "01";
                        reject(err);
                    } else if (result.rowCount >= 1) {
                        obj.rowCount = result.rowCount;
                        obj.rows = result.rows;
                        resolve(obj);
                    }
                })
                .catch(e => {
                    err.rowCount = 0;
                    err.rows = [];
                    reject(err);
                });
        });
    }

    static updatePasswordByToken(newpassword, token) {
        //console.log(newpassword, token);

        const d = new Date();
        const updated_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
        return new Promise((resolve, reject) => {
            this.verifySecretToken(token)
                .then(err => {
                    console.log("verified", token);
                    bcrypt.hash(newpassword, saltRounds).then(hash => {
                        console.log(hash, token);
                        const queryBody = `
                    UPDATE users
                        SET password = '${hash}', updated_at = '${updated_at}'
                    WHERE
                        secret_token = '${token}'`;
                        db.query(queryBody)
                            .then(result => {
                                if (result.rowCount >= 1) {
                                    resolve("Data Saved");
                                } else if (result.rowCount === 0) {
                                    console.log("got here", result);
                                    reject("Could Not Save User");
                                }
                            })
                            .catch(e => {
                                console.log("e", e);
                                reject("Error Saving New User");
                            });
                    });
                })
                .catch(res => {
                    reject(res);
                });
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
}

export default userService;
