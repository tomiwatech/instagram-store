import bcrypt from 'bcrypt';
import db from '../../config/connection/connect';
import moment from 'moment';

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
            db.query(query).then((result) => {
                if (result.rowCount === 0) {
                    err.data = 'user does not exist'
                    resolve(err);
                } else if (result.rowCount >= 1) {
                    obj.rowCount = result.rowCount;
                    obj.rows = result.rows;
                    reject(obj);
                }
            }).catch((e) => {
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
            firstname, lastname, gender, date_of_birth, phone_number, image_url, password, oauth_type, oauth_id, state_code, city_code, country_code, address, email
        } = body;

        const d = new Date();
        const active = false;
        const added_at = moment(d).format('YYYY-MM-DD HH:mm:ss');

        return new Promise((resolve, reject) => {
            this.findUserByEmail(email).then((res) => {
                bcrypt.hash(password, saltRounds).then((hash) => {
                    const queryBody = `
                              INSERT INTO users(firstname, lastname, gender, date_of_birth, phone_number, image_url, password , oauth_type, oauth_id, state_code, city_code, country_code, address, email, added_at, updated_at, active, suspended_at)
                              VALUES ('${firstname}', '${lastname}', '${gender}', '${date_of_birth}','${phone_number}','${image_url}','${hash}', '${oauth_type}', '${oauth_id}', '${state_code}', '${city_code}','${country_code}', '${address}', '${email}','${added_at}', '${added_at}', '${active}', '${added_at}')`;
                    db.query(queryBody).then((result) => {
                        if (result.rowCount >= 1) {
                            resolve('Data Saved');
                        } else if (result.rowCount === 0) {
                            console.log('got here', result);
                            reject(new Error('Not Saved'));
                        }
                    }).catch((e) => {
                        console.log('e', e)
                        reject(new Error('Could not save User'));
                    });
                });
            }).catch((err) => {
                reject(err);
            })
        });

    }
}

export default userService;