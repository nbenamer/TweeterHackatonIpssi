// import Notification from "mongoose/TweeterHackatonIpssi/backend/models/Notifications.js";

// export const getNotifications = async (req, res) => {
//     try {
//         const notifications = await Notification.find({ to: req.user._id }).sort({ createdAt: -1 });
//         res.status(200).json(notifications);
//     } catch (error) {
//         console.log("Error in getNotifications:", error.message);
//         res.status(500).json({ error: error.message });
//     }
// };

// export const markAsRead = async (req, res) => {
//     try {
//         await Notification.updateMany({ to: req.user._id, read: false }, { read: true });
//         res.status(200).json({ message: "Notifications marked as read" });
//     } catch (error) {
//         console.log("Error in markAsRead:", error.message);
//         res.status(500).json({ error: error.message });
//     }
// };


import Notification from "../models/Notification.js";

// Dans votre contrôleur backend
export const getNotifications = async (req, res) => {
	try {
	  const userId = req.user._id;
  
	  const notifications = await Notification.find({ to: userId }).populate({
		path: "from",
		select: "username profileImg",
	  });
  
	  // Assurez-vous que les données sont formatées correctement pour le frontend
	  res.status(200).json(notifications);
	} catch (error) {
	  console.log("Error in getNotifications function", error.message);
	  res.status(500).json({ error: "Internal Server Error" });
	}
  };

export const deleteNotifications = async (req, res) => {
	try {
		const userId = req.user._id;

		await Notification.deleteMany({ to: userId });

		res.status(200).json({ message: "Notifications deleted successfully" });
	} catch (error) {
		console.log("Error in deleteNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
