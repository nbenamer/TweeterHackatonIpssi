import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Notifications = () => {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const res = await fetch("/api/notifications");
				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "Error fetching notifications");
				setNotifications(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchNotifications();
	}, []);

	const markAsRead = async (id) => {
		try {
			await fetch(`/api/notifications/${id}/read`, { method: "PUT" });
			setNotifications((prev) =>
				prev.map((notif) => (notif._id === id ? { ...notif, read: true } : notif))
			);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="p-4 border border-gray-700">
			<h2 className="text-lg font-bold">Notifications</h2>
			{notifications.length === 0 && <p>No notifications yet.</p>}
			<ul>
				{notifications.map((notif) => (
					<li
						key={notif._id}
						className={`p-2 border-b ${notif.read ? "bg-gray-800" : "bg-gray-700"}`}
					>
						<Link to={`/profile/${notif.from.username}`} className="flex gap-2">
							<img src={notif.from.profileImg} alt="avatar" className="w-8 h-8 rounded-full" />
							<span>{notif.from.username} {notif.type === "follow" ? "followed you" : "reacted to your post"}</span>
						</Link>
						{!notif.read && (
							<button onClick={() => markAsRead(notif._id)} className="text-blue-500 ml-2">
								Mark as read
							</button>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Notifications;
