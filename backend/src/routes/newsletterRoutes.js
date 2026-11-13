import { Router } from "express";
import { subscribeNewsletter, getSubscribers } from "../controllers/newsletterController.js";
import { contactLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// POST /api/newsletter - Subscribe (rate-limited)
router.post("/", contactLimiter, subscribeNewsletter);

// GET /api/newsletter - List subscribers
router.get("/", getSubscribers);

export default router;


