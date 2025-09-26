const express = require('express');
const router = express.Router();


const { protect } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");
const {
	createOrganisation,
	generateJoinCode,
	joinOrganisation
} = require("../controllers/organisationController");

// Organisation routes
router.post("/create-organisation", protect, requireRole("manager"), createOrganisation);
router.post("/generate-join-code/:organisationId/", protect, requireRole("manager"), generateJoinCode);
router.post("/join-organisation", protect, joinOrganisation);

module.exports = router;
