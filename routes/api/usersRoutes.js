const router = require('express').Router();
const { getAllUsers, getUser, newUser, updateUser, deleteUser } = require('../../controllers/userController');

// api/users - get all users, post new user
router.route('/').get(getAllUsers).post(newUser);

// api/users/:id - get a user by id, update a user by id, delete a user by id
router.route('/:userId').get(getUser).post(updateUser).delete(deleteUser);

    //remove associated thoughts when deleted

module.exports = router;