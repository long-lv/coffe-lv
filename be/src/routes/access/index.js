'use strict'

const express = require("express");
const accessController = require("../../controllers/access.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const router = express.Router();
// signUp /signin
router.post('/admin/signup',asyncHandler(accessController.singUp))
router.post('/admin/login',asyncHandler(accessController.login))
// authentication 
router.use(authentication);
//logout
router.post('/admin/logout',asyncHandler(accessController.logOut))
//
module.exports = router;