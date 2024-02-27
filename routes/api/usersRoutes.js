const router = require('express').Router();
const { getAllUsers, getUser, newUser, updateUser, deleteUser } = require('../../controllers/userController');
const { addFriend, removeFriend } = require('../../controllers/friendsController');

// api/users - get all users, post new user
router.route('/').get(getAllUsers).post(newUser);

// api/users/:id - get a user by id, update a user by id, delete a user by id
router.route('/:userId').get(getUser).post(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId - post new friend, delete friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)

module.exports = router;