import bcrypt from "bcrypt";
import moment from "moment";
import randomstring from "randomstring";
import db from "../../config/connection/connect";


const saltRounds = 10;
const obj = {};
const err = {};

/**
 * @exports
 * @class queryProvider
 */
class queryProvider {
    /**
     * Find user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */
    static findUserByEmailQuery(email) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE email = '${email}'`;
            db.query(query)
                .then(result => {
                    if (result.rowCount === 0) {
                        err.responseMessage = "user does not exist";
                        err.responseCode = "01";
                        reject(err);
                    } else if (result.rowCount >= 1) {
                        obj.rowCount = result.rowCount;
                        obj.rows = result.rows;
                        resolve(obj);
                    }
                })
                .catch(e => {
                    console.log(e);
                    err.responseMessage = 'Error Finding User';
                    err.responseCode = '02';
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
    static saveUserQuery(body) {
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
            this.findUserByEmailQuery(email)
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

    static verifySecretTokenQuery(token) {
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

    static updatePasswordByTokenQuery(newpassword, token) {
        //console.log(newpassword, token);

        const d = new Date();
        const updated_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
        return new Promise((resolve, reject) => {
            this.verifySecretTokenQuery(token)
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
}

export default queryProvider;
