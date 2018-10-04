import userService from '../services/userService';
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
    /**
   * Creates a new user
   * @staticmethod
   * @param  {object} req - user object
   * @param {object} res - Response object
   * @return {json} res.json
   */
    static login(req, res) {
        const {
            username, password
        } = req.body;
        userService.login(username, password).then((response) => {
            return res.status(200).json({
                responseMessage: 'Authentication Successful',
                body: response
            });
        }).catch((err) => {
            return res.status(400).json({
                responseMessage: err.responseMessage,
            });
        })
    }
    /**
     * Creates a new user
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static getAll(req, res) {
        return res.status(200).json({
            responseMessage: 'Authentication Successful',
            body: 'ffd'
        });
        // userService.getAllUsers().then((result) => {
        //     console.log(result);
        //     return res.status(200).json({
        //         responseMessage: 'Successfully fetched all Users',
        //         data: result
        //     });
        // }).catch((err) => {
        //     return res.status(400).json({
        //         responseMessage: err.responseMessage,
        //     });
        // });
    }
    /**
   * Creates a new user
   * @staticmethod
   * @param  {object} req - user object
   * @param {object} res - Response object
   * @return {json} res.json
   */
    static countAll(req, res) {
        userService.countAllUsers().then((result) => {
            console.log(result);
            return res.status(200).json({
                responseMessage: 'Successfully counted all Users',
                total: result
            });
        }).catch((err) => {
            return res.status(400).json({
                responseMessage: err.responseMessage,
            });
        });
    }
}

export default UserController;