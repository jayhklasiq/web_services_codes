const express = require('express');
const router = express.Router();
const homepsetup = require('../controllers/homeController')

router.get('/', homepsetup.homePage)

module.exports = router;