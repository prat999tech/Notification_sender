// routes/notification.routes.js
import express from "express";
import { getUserNotifications } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/users/:id/notifications", getUserNotifications);

export default router;
