
const express = require('express');
const User = require('../models/user');
const {ensureLoggedIn, ensureCorrectUser} = require('../middleware/auth');
const ExpressError = require('../expressError');

const router = express.Router();

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get('/', ensureLoggedIn, async (req, res, next) => {
    try {
        const users = await User.all();
        return res.json({users})
    } catch(e) {
        return next(e);
    }
})

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
router.get('/:username', ensureCorrectUser, async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await User.get(username);
        if (!user) {
            throw new ExpressError(`Username '${username} not a valid username or you do not have permission`)
        }
        return res.json({user})
    } catch(e) {
        return next(e);
    }
})

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get('/:username/to', ensureCorrectUser, async (req, res, next) => {
    try {
        const username = req.params.username;
        const messages = await User.messagesTo(username);
        if (!messages) {
            throw new ExpressError(`Username '${username} not a valid username or you do not have permission`)
        }
        return res.json({messages})
    } catch(e) {
        return next(e);
    }
})

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get('/:username/from', ensureCorrectUser, async (req, res, next) => {
    try {
        const username = req.params.username;
        const messages = await User.messagesFrom(username);
        if (!messages) {
            throw new ExpressError(`Username '${username} not a valid username or you do not have permission`)
        }
        return res.json({messages})
    } catch(e) {
        return next(e);
    }
})


module.exports = router;