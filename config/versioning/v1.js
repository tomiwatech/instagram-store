import { Router } from 'express';
import passport from 'passport';
import user from '../../app/routes/user';

const api = Router();

// api.use(cors())
api.get('/', (req, res) => res.status(200).json({ ok: true, message: 'Welcome to OnePercentLab', status: 'API version 1' }));
api.use('/', user);
api.use(passport.initialize());
api.use(passport.session());
api.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// No routes matched? 404.
api.use((req, res) => res.status(404).send('Sorry that route/method doesnt exist'));

export default api;