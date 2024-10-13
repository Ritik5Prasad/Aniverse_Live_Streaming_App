const express = require("express");
const router = express.Router();
const {
  refreshToken,
  signInWithGoogle,
} = require("../controllers/auth");


router.post("/login", signInWithGoogle);
router.post("/refresh-token", refreshToken);

module.exports = router;
