const express = require("express");
const { body } = require("express-validator");
const { protect } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");
const {
    registerUser,
    registerManager,
    registerAdmin,
    login
} = require("../controllers/authController");
const {
    createOrganisation,
    generateJoinCode,
    joinOrganisation
} = require("../controllers/organisationController");
const {
    createPoll,
    votePoll,
    getPollResults,
    getOrgPolls,
    closePoll,
    openPoll
} = require("../controllers/pollController");

// Add your validators here or import them if defined elsewhere
const emailValidator = body("email").isEmail().normalizeEmail();
const passwordValidator = body("password").isLength({ min: 6 });


const { registerLimiter, loginLimiter } = require("../middleware/rateLimiter");
const router = express.Router();


// Auth routes with rate limiting
router.post("/register-user", registerLimiter, emailValidator, passwordValidator, registerUser);
router.post("/register-manager", protect, requireRole("admin"), registerLimiter, emailValidator, passwordValidator, registerManager);
router.post("/register-admin", registerLimiter, emailValidator, passwordValidator, registerAdmin);
router.post("/login", loginLimiter, emailValidator, body("password").notEmpty().trim().escape(), login);



module.exports = router;