import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import keys from '../app/controllers/keys';
import oauthService from '../app/services/oauthService'


passport.use(new GoogleStrategy({
    clientID: keys.google.client_id,
    clientSecret: keys.google.client_secret,
    callbackURL: keys.google.redirect_uris[0]
}, (accessToken, refreshToken, profile, callbackFunction) => {

    let profileObject = {};

    profileObject.username = profile.displayName;
    profileObject.user_id = profile.id;
    profileObject.oauth_type = "google";

    oauthService.saveUser(profileObject).then((response) => {
        console.log(response)
        return callbackFunction(response);
    }).catch((err) => {
        console.log(err)
        return callbackFunction(err);
    })
}));




export default passport;



