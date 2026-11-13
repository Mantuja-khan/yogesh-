import validator from "validator";
import { saveContact, getContacts as fetchAllContacts } from "../services/storageService.js";
import { sendAdminNotification, sendClientConfirmation } from "../services/emailService.js";

/**
 * Handle new contact form submission
 * POST /api/contact
 */
export async function submitContact(req, res, next) {
  try {
    const { name, email, phone, message, source } = req.body;

    // Validation
    const errors = [];

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.push("Full name is required (minimum 2 characters).");
    }

    if (!email || typeof email !== "string" || !validator.isEmail(email.trim())) {
      errors.push("A valid email address is required.");
    }

    if (phone && typeof phone === "string" && phone.trim()) {
      const sanitizedPhone = phone.replace(/[^\d+()\s-]/g, "");
      if (sanitizedPhone.length < 7 || sanitizedPhone.length > 25) {
        errors.push("Please provide a valid contact telephone number.");
      }
    }

    if (message && typeof message === "string" && message.length > 4000) {
      errors.push("Message cannot exceed 4000 characters.");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.join(" "),
        errors,
      });
    }

    // Sanitize input values
    const cleanData = {
      name: validator.escape(name.trim()),
      email: email.trim().toLowerCase(),
      phone: phone ? validator.escape(phone.trim()) : "",
      message: message ? message.trim() : "",
      source: source ? validator.escape(source.trim()) : "Website Contact Form",
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown",
      userAgent: req.headers["user-agent"] || "Unknown",
    };

    // Save to database/file
    const savedContact = await saveContact(cleanData);

    // Send emails in background (non-blocking for ultra-fast response)
    Promise.allSettled([
      sendAdminNotification(savedContact),
      sendClientConfirmation(savedContact),
    ]).catch((err) => {
      console.error("[ContactController] Background email dispatch error:", err);
    });

    return res.status(201).json({
      success: true,
      message: "Thank you! Your message has been received. Our team will contact you shortly.",
      inquiryId: savedContact.id,
      data: {
        id: savedContact.id,
        name: savedContact.name,
        email: savedContact.email,
        createdAt: savedContact.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get all contact inquiries
 * GET /api/contact
 */
export async function getContacts(req, res, next) {
  try {
    const contacts = await fetchAllContacts();
    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
}

