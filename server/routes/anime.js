const express = require("express");
const { getAnime } = require("../controllers/anime");
const router = express.Router();

router.get("/list", getAnime);

module.exports = router;
