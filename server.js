const express = require('express');
require('dotenv').config();

const bodyParser = require('body-parser');
const session = require('express-session');
//const FileStore = require('session-file-store')(session);
const next = require('next');
const authHelpers = require('./utils/auth');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const authorize = require('./routes/authorize');

app.prepare()
    .then(() => {
        const server = express();
        server.use(bodyParser.json());
        server.use(session({
            secret: process.env.SECRET_KEY,
            saveUninitialized: true,
            resave: false,
            rolling: true,
            httpOnly: true,
            cookie: { maxAge: 604800000 * 2 }
        }));

        server.use('/authorize', authorize(app));

        let authUrl = authHelpers.getAuthUrl();
        let accessToken = async () => await authHelpers.getAccessToken();

        server.get('*', (req, res) => {
            req.authUrl = authUrl;
            req.accessToken = accessToken;
            return handle(req, res);
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on port ${port}`);
        })
    })