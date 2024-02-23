const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');
const friendsRoutes = require('./friendsRoutes');

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);
router.use('/friends', friendsRoutes);

module.exports = router;