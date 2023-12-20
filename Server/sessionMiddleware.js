const session = require('express-session');
const sessionMiddleware = session({
    secret: 'mySecretKey',
    resave: true,
    name: "mathGame",
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        domain: "localhost",//"math-thai.dam.inspedralbes.cat",
        path: "/",
        maxAge: 3600000,
        sameSite: 'lax'
    }
});
module.exports = sessionMiddleware;
