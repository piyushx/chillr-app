const express = require("express")
const router = express.Router()
const authorizeUser = require("../middleware/authorizeUser")
const postModel = require("../dataModels/postDataModel");





module.exports = router;