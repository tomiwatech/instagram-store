import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import keys from '../app/controllers/keys';
import oauthService from '../app/services/oauthService'

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: keys.facebook.callbackURL
},
    function (accessToken, refreshToken, profile, cb) {
        let profileObject = {};

        profileObject.username = profile.displayName;
        profileObject.user_id = profile.id;
        profileObject.oauth_type = "facebook";

        oauthService.saveUser(profileObject).then((response) => {
            console.log(response)
            return cb(response);
        }).catch((err) => {
            console.log(err)
            return cb(err);
        })
    }
));



export default passport;



