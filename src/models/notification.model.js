import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { 
    type: String, required: true
 }, // Use String instead of ObjectId with ref
  type: {
     type: String, enum: ["email", "sms", "in-app"], required: true 
    },
  message: { 
    type: String, required: true
 },
  status: {
     type: String, enum: ["pending", "sent", "failed"], default: "pending"
     },
  meta: { 
    type: mongoose.Schema.Types.Mixed,  // For storing email, phone number, etc.
    default: {}
  },
  read: {
     type: Boolean, default: false
     }, // For in-app notifications
  retryCount: {
     type: Number, default: 0 
    },
  failureReason: {
     type: String
     },
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);
