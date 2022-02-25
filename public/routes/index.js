const router = require('express').Router();
const noteRoutes = require('../routes/apiRoutes');
const index = require('../routes/htmlRoutes');

router.use(noteRoutes);
router.use(index);

module.exports = router;