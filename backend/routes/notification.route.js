// import express from "express";
// import { protectRoute } from "../middleware/protectRoute.js";
// import { getNotifications, markAsRead } from "../controllers/notification.controller.js";

// const router = express.Router();

// router.get("/", protectRoute, getNotifications);
// router.post("/read", protectRoute, markAsRead);

// export default router;


import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { deleteNotifications, getNotifications } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);

export default router;
