const User = require('../models/User');

module.exports = {
    getAllUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getUser(req, res) {
        let userId = req.params.userId;
        User.findById(userId)
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    newUser(req, res) {
        User.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        let userId = req.params.userId;
        User.findOneAndUpdate(
            {_id: userId},
            {
                username: req.body.username,
                email: req.body.email,
                thoughts: req.body.thoughts,
                friends: req.body.friends
            },
            {new: true },
        )
        .then(result => {
            if (result) {
                res.status(200).json(result);
                console.log(`Updated: ${result}`);
            } else {
                console.log('Uh Oh, something went wrong');
                res.status(500).json({ message: 'something went wrong' });
            }
        })
        .catch(err => {
            console.error('Error updating user:', err);
            res.status(500).json({ message: 'something went wrong' });
        })    
    },
    deleteUser(req, res) {
        let userId = req.params.userId;
        User.findByIdAndDelete(userId)
        .then(result => {
            if (result) {
                res.status(200).json(result);
                console.log(`Deleted: ${result}`);
            } else {
                console.log('Uh Oh, something went wrong');
                res.status(500).json({ message: 'something went wrong' });
            }
        })
        .catch(err => {
            console.error('Error deleting user:', err);
            res.status(500).json({ message: 'something went wrong' });
        })   
    }
};