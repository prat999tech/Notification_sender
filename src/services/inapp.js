import { Notification } from "../models/notification.model.js";

 const sendInApp = async (userId, message) => {
  const notification = await Notification.create({
    userId,
    type: "in-app",
    message,
    status: "sent",      // Mark as sent immediately
    meta: {},            // Add extra info if needed
    read: false,         // Unread by default
    retryCount: 0
    // failureReason is left undefined
  });
  return notification;
};

export { sendInApp };
