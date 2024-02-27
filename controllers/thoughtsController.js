const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    // GET to get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // GET to get a single thought by its _id
    getThought(req, res) {
        let thoughtId = req.params.id;
        Thought.findById(thoughtId)
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    newThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                {username: req.body.username},
                {$addToSet: {thoughts: thought._id}},
                {new: true}
            );
        })
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(500).json(err));
    },
    //PUT to update a thought by its _id
    updateThought(req, res) {
        let thoughtId = req.params.id;
        Thought.findOneAndUpdate(
            {_id: thoughtId},
            {
                thoughtText: req.body.thoughtText,
                username: req.body.username,
                reactions: req.body.reactions
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
    //DELETE to remove a thought by its _id
    deleteThought(req, res) {
        let thoughtId = req.params.id;
        Thought.findByIdAndDelete(thoughtId)
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
            console.error('Error deleting thought:', err);
            res.status(500).json({ message: 'something went wrong' });
        })   
    },
    //POST to create a reaction stored in a single thought's reactions array field
    newReaction(req, res) {
        let reactionData = req.body
        let thoughtId = req.params.id;
        Thought.findOneAndUpdate(
            {_id: thoughtId},
            {
                reactions: reactionData
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
    //DELETE to pull and remove a reaction by the reaction's reactionId value
    deleteReaction(req, res) {
        let thoughtId = req.params.id;
        Thought.findOneAndUpdate(
            {_id: thoughtId},
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            {new: true },
        )
        .then(result => {
            if (result) {
                res.status(200).json(result);
                console.log(`Deleted: ${result}`);
            } else {
                console.log('Thought not found');
                res.status(404).json({ message: 'No thought with that ID' });
            }
        })
        .catch(err => {
            console.error('Error updating user:', err);
            res.status(500).json({ message: 'something went wrong' });
        }) 
    }
};



