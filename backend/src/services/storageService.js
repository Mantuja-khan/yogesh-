import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, "../../data");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "subscribers.json");

/**
 * Ensure storage directory and files exist
 */
async function ensureStorage() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    try {
      await fs.access(CONTACTS_FILE);
    } catch {
      await fs.writeFile(CONTACTS_FILE, JSON.stringify([], null, 2), "utf-8");
    }

    try {
      await fs.access(SUBSCRIBERS_FILE);
    } catch {
      await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (error) {
    console.error("[StorageService] Failed to initialize storage directory:", error);
  }
}

// Initialize on startup
ensureStorage();

/**
 * Save a new contact form submission
 */
export async function saveContact(data) {
  await ensureStorage();
  try {
    const raw = await fs.readFile(CONTACTS_FILE, "utf-8");
    const contacts = JSON.parse(raw || "[]");

    const newContact = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      name: data.name,
      email: data.email,
      phone: data.phone || "Not provided",
      message: data.message || "",
      source: data.source || "Website Contact Form",
      ip: data.ip || "Unknown",
      userAgent: data.userAgent || "Unknown",
      createdAt: new Date().toISOString(),
      status: "new",
    };

    contacts.unshift(newContact);
    await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2), "utf-8");
    return newContact;
  } catch (error) {
    console.error("[StorageService] Error writing contact:", error);
    throw new Error("Failed to save contact inquiry to database");
  }
}

/**
 * Retrieve all contact submissions (latest first)
 */
export async function getContacts() {
  await ensureStorage();
  try {
    const raw = await fs.readFile(CONTACTS_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (error) {
    console.error("[StorageService] Error reading contacts:", error);
    return [];
  }
}

/**
 * Save a newsletter subscriber
 */
export async function saveSubscriber(email) {
  await ensureStorage();
  try {
    const raw = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    const subscribers = JSON.parse(raw || "[]");

    const normalizedEmail = email.toLowerCase().trim();
    const existing = subscribers.find((sub) => sub.email === normalizedEmail);

    if (existing) {
      return { ...existing, isExisting: true };
    }

    const newSubscriber = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      active: true,
    };

    subscribers.unshift(newSubscriber);
    await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), "utf-8");
    return { ...newSubscriber, isExisting: false };
  } catch (error) {
    console.error("[StorageService] Error saving subscriber:", error);
    throw new Error("Failed to save newsletter subscriber");
  }
}

/**
 * Retrieve all subscribers
 */
export async function getSubscribers() {
  await ensureStorage();
  try {
    const raw = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (error) {
    console.error("[StorageService] Error reading subscribers:", error);
    return [];
  }
}

