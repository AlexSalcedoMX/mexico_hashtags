const express = require('express');
const router = express.Router();
// Require controller modules.
const hashtagController = require('../controllers/hashtags_controller');

// GET catalog home page.
router.get('/', hashtagController.getHashtag);

module.exports = router;