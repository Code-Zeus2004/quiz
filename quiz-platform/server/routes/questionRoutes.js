const express = require("express");
const router = express.Router();

const questionController = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Create question (ADMIN ONLY)
router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    questionController.createQuestion
);

module.exports = router;