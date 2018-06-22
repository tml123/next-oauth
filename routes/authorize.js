var express = require('express');
var router = express.Router();
var authHelper = require('../utils/auth');

/* GET /authorize. */
module.exports = function(app) {
    /**
     * app is the nextjs app passed into the function
     */
    router.get('/', async function(req, res, next) {
        // Get auth code
        const code = req.query.code;
        // If code is present, use it
        if (code) {
            let token;
      
            try {
                token = await authHelper.getTokenFromCode(code, req, res);          
            } catch (error) {
                return app.render(req, res, '/login', req.query);
            }

            res.redirect('../');
        } 
        else {
            // Otherwise complain
            res.redirect('/login');
        }
    });

    /* GET /authorize/signout */
    router.get('/signout', function(req, res, next) {
        authHelper.clearCookies(req, res);
    
        // Redirect to home
        res.redirect('/');
    });

    return router;
};