const jwt = require('jsonwebtoken');
const express = require('express');
const { SECRET_KEY } = require('../config');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const db = require('../db');

const router = express.Router();

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post('/login', async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const result = await db.query('SELECT password FROM users WHERE username = $1', [username]);
        
        const user = result.rows[0];

        if (user) {
            if (await User.authenticate(username, password)) {
                let token = jwt.sign({username}, SECRET_KEY);
                User.updateLoginTimestamp(username);
                return res.json({token});
            }
        }
    } catch(e) {
        return next(e);
    }
})


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
 router.post('/register', async (req, res, next) => {
    try {
        const {username, password, first_name, last_name, phone} = req.body;
        const user = await User.register({username, password, first_name, last_name, phone});

        if (user) {
            let token = jwt.sign({username}, SECRET_KEY);
            User.updateLoginTimestamp(username);
            return res.json({token});
        }
    } catch(e) {
        return next(e);
    }
})

module.exports = router;
