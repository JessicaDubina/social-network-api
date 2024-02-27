const User = require('../models/User');

module.exports = {
    //add a new friend to a user's friend list
    addFriend(req, res) {
        let userId = req.params.userId;
        let friendId = req.params.friendId;
        User.findOneAndUpdate(
            {_id: userId},
            { $addToSet: { friends: friendId } },
            { new: true }
        )
        .then(result => {
            if (result) {
                res.status(200).json(result);
                console.log(`Added friend: ${result}`);
            } else {
                console.log('No user with that ID');
                res.status(404).json({ message: 'No user with that ID' });
            }
        })
        .catch(err => {
            console.error('Error updating user:', err);
            res.status(500).json({ message: 'something went wrong' });
        })    
    },
    //remove a friend from a user's friend list
    removeFriend(req, res) {
        let userId = req.params.userId;
        let friendId = req.params.friendId;
        User.findOneAndUpdate(
            {_id: userId},
            { $pull: { friends: friendId } },
            { new: true }
        )
        .then(result => {
            if (result) {
                res.status(200).json(result);
                console.log(`Removed friend: ${result}`);
            } else {
                console.log('No user with that ID');
                res.status(404).json({ message: 'No user with that ID' });
            }
        })
        .catch(err => {
            console.error('Error updating user:', err);
            res.status(500).json({ message: 'something went wrong' });
        })    
    }

}