const router = require('express').Router();
const userRoutes = require('./userRoutes');
const BlogpostRoutes = require('./BlogpostRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/Blogpost', BlogpostRoutes);
router.use('/comments', commentRoutes)

module.exports = router;
