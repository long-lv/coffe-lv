'use strict'

const express = require("express");
const accessController = require("../../controllers/access.controller");
const router = express.Router();

// signUp 
router.post('/admin/signup',accessController.singUp)

module.exports = router;