'use strict'

const express = require('express');
const { checkApiKey, checkPermission } = require('../auth/checkAuth');
const router = express.Router();
// check api key
router.use(checkApiKey);
router.use(checkPermission('001'));
router.use('/v1/api',require('./access'))
module.exports = router;