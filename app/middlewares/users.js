/**
 * 
 * @exports
 * @class UserMiddleware
 */
class UserMiddleware {
    /**
     * UserMiddleware
     *
     * @staticmethod
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */
    static validateUserSignup(req, res, next) {

        const {
            firstname, lastname, gender, date_of_birth, phone_number, image_url, password, oauth_type, oauth_id, state_code, city_code, country_code, address, email
        } = req.body;
        //console.log(firstname, lastname)
        if (!firstname || !lastname || !gender || !date_of_birth || !phone_number
            || !image_url || !password || !oauth_type || !oauth_id
            || !state_code || !city_code || !country_code || !address || !email) {

            return res.status(400).json({
                responseCode: '01',
                responseMessage: 'Please fill all fields',
            });
        }

        next();
    }
}

export default UserMiddleware;
