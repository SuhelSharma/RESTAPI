const express = require("express");
const router = express.Router();
const { handlePost, handleGet } = require("../controllers/controller");


if (!handlePost || !handleGet) {
    console.error("❌ Error: Controller functions are not properly imported.");
}

router.post("/", handlePost);
router.get("/", handleGet);

module.exports = router;
