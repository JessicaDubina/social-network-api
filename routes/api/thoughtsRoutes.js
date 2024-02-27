const router = require('express').Router();
const { getAllThoughts, getThought, newThought, updateThought, deleteThought, newReaction, deleteReaction } = require('../../controllers/thoughtsController');

// /api/thoughts - get all thoughts, post new thought and push to user thoughts array
router.route('/').get(getAllThoughts).post(newThought);

// /api/thoughts/:id - get a single thought by it's _id
router.route('/:id').get(getThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:id/reactions
router.route('/:id/reactions').post(newReaction);

// /api/thoughts/:id/reactions/:reactionId
router.route('/:id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;