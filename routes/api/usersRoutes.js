const router = require('express').Router();
const { getAllUsers, getUser, newUser } = require('../../controllers/userController');

// api/users - get all users, post new user
router.route('/').get(getAllUsers).post(newUser);

// api/users/:id - get a user by _id

// api/users/:id - put to update user by _id

// api/users/:id - delete user by _id
    //remove assoviated thoughts when deleted

module.exports = router;