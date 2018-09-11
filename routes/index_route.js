const express = require('express');
const router = express.Router();
// Require controller modules.
const indexController = require('../controllers/index_controller');

// GET catalog home page.
router.get('/', indexController.index);

module.exports = router;