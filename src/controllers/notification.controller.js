import { Notification } from "../models/notification.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { apierror } from "../utils/apierror.js";
import { sendEmail } from "../services/email.js";
import { sendSMS } from "../services/sms.js";
import { sendInApp } from "../services/inapp.js";

// POST /notifications
export const sendNotification = asyncHandler(async (req, res) => {
  const { userId, type, message, email, phone } = req.body;

  if (!userId || !type || !message) {
    throw new apierror(400, "userId, type, and message are required");
  }
  if (!["email", "sms", "in-app"].includes(type)) {
    throw new apierror(400, "Invalid notification type");
  }
  if (type === "email" && !email) {
    throw new apierror(400, "Email is required for email notifications");
  }
  if (type === "sms" && !phone) {
    throw new apierror(400, "Phone is required for SMS notifications");
  }

  // Create notification with pending status
  const notification = await Notification.create({
    userId,
    type,
    message,
    status: "pending",
    meta: { email, phone }
  });

  try {
    if (type === "email") {
      await sendEmail(email, "Notification", message);
    } else if (type === "sms") {
      await sendSMS(phone, message);
    } else if (type === "in-app") {
      await sendInApp(userId, message);
    }
    notification.status = "sent";
    notification.sentAt = new Date();
    await notification.save();

    return res.status(201).json(
      new apiresponse(201, notification, "Notification sent successfully")
    );
  } catch (error) {
    notification.status = "failed";
    notification.failureReason = error.message;
    await notification.save();

    throw new apierror(500, `Failed to send ${type} notification: ${error.message}`);
  }
});

// GET /users/:id/notifications
export const getUserNotifications = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new apierror(400, "User ID is required");
  }

  // Find all notifications for the user
  const notifications = await Notification.find({ userId: id }).sort({ createdAt: -1 });

  return res.status(200).json(
    new apiresponse(200, notifications, "Notifications retrieved successfully")
  );
});
