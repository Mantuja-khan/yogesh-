import { Router } from "express";
import { submitContact, getContacts } from "../controllers/contactController.js";
import { contactLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// POST /api/contact - Submit new inquiry (rate-limited)
router.post("/", contactLimiter, submitContact);

// GET /api/contact - List all submissions
router.get("/", getContacts);

export default router;

