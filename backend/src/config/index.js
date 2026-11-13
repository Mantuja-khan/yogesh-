import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the backend/ folder (one level up from src/config/)
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Strip spaces from the app password (Google sometimes shows it with spaces)
const smtpPass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
const smtpUser = process.env.SMTP_USER || "";

export const config = {
  port: parseInt(process.env.PORT, 10) || 5006,
  clientOrigins: (process.env.CLIENT_ORIGIN || "http://localhost:8080,http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim()),
  notificationEmail: process.env.NOTIFICATION_EMAIL || smtpUser,
  smtp: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT, 10) || 465,
    secure: true, // port 465 is always SSL
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    // FROM must match the authenticated Gmail account
    from: `"SS Production House" <${smtpUser}>`,
  },
  storageMode: process.env.STORAGE_MODE || "file",
};

