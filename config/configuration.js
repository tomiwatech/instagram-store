import dotenv from "dotenv";

dotenv.config();

const config = {
    testDB: process.env.DATABASE_URL,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
    facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    facebookClientId: process.env.FACEBOOK_CLIENT_ID,
    facebookCallbackUrl: process.env.FACEBOOK_CALLBACK_URL,
    sendGridKey: process.env.SENDGRID_KEY,
    jwtSecretKey: process.env.JWT_SECRET_KEY
};

export default config;
