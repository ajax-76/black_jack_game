var express = require('express');
var router = express.Router();

router.use('/api',require('../gamecore/routes/gameroutes'));

module.exports =router;