import { Router } from "express";

const router = Router();

// GET /api/health
router.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "SS Production House Backend API",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;

