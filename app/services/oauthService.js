import db from "../../config/connection/connect";
import moment from "moment";

const obj = {};
const err = {};
/**
 * @exports
 * @class oauthService
 */
class oauthService {
    /**
     * Find user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */
    static findUserById(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM oauth WHERE user_id = '${id}'`;
            db.query(query)
                .then(result => {
                    if (result.rowCount === 0) {
                        err.data = "user does not exist";
                        resolve(err);
                    } else if (result.rowCount >= 1) {
                        obj.rows = result.rows;
                        obj.message = "User Already Exists";
                        reject(obj);
                    }
                })
                .catch(e => {
                    console.log(e);
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
        const { username, user_id, oauth_type } = body;

        const d = new Date();
        const added_at = moment(d).format("YYYY-MM-DD HH:mm:ss");

        return new Promise((resolve, reject) => {
            this.findUserById(user_id)
                .then(res => {
                    const queryBody = `INSERT INTO oauth(username, user_id, added_at, updated_at, oauth_type) VALUES ('${username}', '${user_id}', '${added_at}', '${added_at}', '${oauth_type}')`;
                    db.query(queryBody)
                        .then(result => {
                            if (result.rowCount >= 1) {
                                resolve("User Saved Successfully");
                            } else if (result.rowCount === 0) {
                                console.log("got here", result);
                                reject(new Error("Not Saved"));
                            }
                        })
                        .catch(e => {
                            console.log("e", e);
                            reject(new Error("Could not save User"));
                        });
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}

export default oauthService;
