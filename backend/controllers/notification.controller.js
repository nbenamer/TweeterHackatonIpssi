import Notification from "mongoose/TweeterHackatonIpssi/backend/models/Notification.js";

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ to: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        console.log("Error in getNotifications:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const markAsRead = async (req, res) => {
    try {
        await Notification.updateMany({ to: req.user._id, read: false }, { read: true });
        res.status(200).json({ message: "Notifications marked as read" });
    } catch (error) {
        console.log("Error in markAsRead:", error.message);
        res.status(500).json({ error: error.message });
    }
};