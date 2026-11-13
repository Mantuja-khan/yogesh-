import validator from "validator";
import { saveSubscriber, getSubscribers as fetchAllSubscribers } from "../services/storageService.js";

/**
 * Handle newsletter subscription
 * POST /api/newsletter
 */
export async function subscribeNewsletter(req, res, next) {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string" || !validator.isEmail(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const result = await saveSubscriber(email);

    if (result.isExisting) {
      return res.status(200).json({
        success: true,
        message: "You are already subscribed to our newsletter!",
        data: result,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Thank you for subscribing to our weekly newsletter!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get all newsletter subscribers
 * GET /api/newsletter
 */
export async function getSubscribers(req, res, next) {
  try {
    const subscribers = await fetchAllSubscribers();
    return res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    next(error);
  }
}

