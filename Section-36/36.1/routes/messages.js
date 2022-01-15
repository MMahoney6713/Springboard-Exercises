const express = require('express');
const Message = require('../models/message');
const {ensureLoggedIn, ensureCorrectUser} = require('../middleware/auth');
const ExpressError = require('../expressError');

const router = express.Router();

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get('/:id', ensureLoggedIn, async (req, res, next) => {
    try {
        const message = await Message.get(req.params.id);
        if (req.user.username === message.from_user.username || req.user.username === message.to_user.username ) {
            return res.json({message})
        } else {
            return new ExpressError('You must be the to or from user to access this message');
        }
    } catch(e) {
        return next(e);
    }
})

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

 module.exports = router;
