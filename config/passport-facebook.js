import passport from "passport";
import FacebookStrategy from "passport-facebook";
import oauthService from "../app/services/oauthService";
import config from "./configuration";

passport.use(
    new FacebookStrategy(
        {
            clientID: config.facebookClientId,
            clientSecret: config.facebookClientSecret,
            callbackURL: config.facebookCallbackUrl
        },
        function(accessToken, refreshToken, profile, cb) {
            let profileObject = {};

            profileObject.username = profile.displayName;
            profileObject.user_id = profile.id;
            profileObject.oauth_type = "facebook";

            oauthService
                .saveUser(profileObject)
                .then(response => {
                    console.log(response);
                    return cb(response);
                })
                .catch(err => {
                    console.log(err);
                    return cb(err);
                });
        }
    )
);

export default passport;
