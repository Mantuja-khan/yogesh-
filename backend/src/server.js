import express from "express";
import cors from "cors";
import { config } from "./config/index.js";
import contactRoutes from "./routes/contactRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import { generalLimiter } from "./middleware/rateLimiter.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Trust reverse proxies (needed for rate limiters & IP detection behind proxies)
app.set("trust proxy", 1);

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);

      // In development or if origin matches configured origins
      const allowedOrigins = config.clientOrigins;
      const isAllowed =
        allowedOrigins.includes("*") ||
        allowedOrigins.includes(origin) ||
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:");

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Body Parsers
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// General Rate Limiter for all API routes
app.use("/api", generalLimiter);

// Request Logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Welcome Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    service: "SS Production House API",
    status: "online",
    endpoints: {
      health: "/api/health",
      contact: "/api/contact (POST/GET)",
      newsletter: "/api/newsletter (POST/GET)",
    },
  });
});

// API Routes
app.use("/api/health", healthRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);

// 404 & Central Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
const server = app.listen(config.port, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 SS Production House Backend Server Running!`);
  console.log(`📡 Local URL:   http://localhost:${config.port}`);
  console.log(`📬 Contact API: http://localhost:${config.port}/api/contact`);
  console.log(`🩺 Health API:  http://localhost:${config.port}/api/health`);
  console.log(`==================================================\n`);
});

// Graceful Shutdown
const handleShutdown = (signal) => {
  console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log("[Server] Closed remaining connections.");
    process.exit(0);
  });
};

process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));

export default app;

