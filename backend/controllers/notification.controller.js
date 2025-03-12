import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
	try {
		const notifications = await Notification.find({ to: req.user._id })
			.sort({ createdAt: -1 })
			.populate("from", "username profileImg");

		res.status(200).json(notifications);
	} catch (error) {
		console.log("Error in getNotifications:", error.message);
		res.status(500).json({ error: error.message });
	}
};

export const markAsRead = async (req, res) => {
	try {
		const { id } = req.params;
		const notification = await Notification.findById(id);

		if (!notification) return res.status(404).json({ error: "Notification not found" });

		if (notification.to.toString() !== req.user._id.toString()) {
			return res.status(403).json({ error: "Unauthorized" });
		}

		notification.read = true;
		await notification.save();

		res.status(200).json({ message: "Notification marked as read" });
	} catch (error) {
		console.log("Error in markNotificationAsRead:", error.message);
		res.status(500).json({ error: error.message });
	}
};
