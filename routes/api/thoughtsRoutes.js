const router = require('express').Router();
const { getAllThoughts, getThought, newThought } = require('../../controllers/thoughtsController');

// /api/thoughts - get all thoughts, post new thought and push to user thoughts array
router.route('/').get(getAllThoughts).post(newThought);

// /api/thoughts/:id - get a single thought by it's _id
router.route('/:id').get(getThought);

module.exports = router;