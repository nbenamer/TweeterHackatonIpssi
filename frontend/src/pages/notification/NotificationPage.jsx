import { useEffect, useState } from "react";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const res = await fetch("/api/notifications");
            const data = await res.json();
            setNotifications(data);
        };
        fetchNotifications();
    }, []);

    return (
        <div className="notifications">
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications</p>
            ) : (
                notifications.map((notif) => (
                    <div key={notif._id} className={`notification ${notif.read ? "read" : "unread"}`}>
                        <p>{notif.type === "follow" ? `${notif.from.username} followed you` : "New activity"}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Notifications;