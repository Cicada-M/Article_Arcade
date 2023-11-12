import React, { useState } from "react";

const notificationsData = [
  { id: 1, message: "New blog post published." },
  { id: 2, message: "You have a new follower." },
  { id: 3, message: "Someone liked your post." },
  // Add more notifications as needed
];

function NotificationCard({ message }) {
  return (
    <div className="bg-white border rounded-lg p-4 mb-4 shadow-lg">
      <p>{message}</p>
    </div>
  );
}

function NotificationContainer() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [show, setShow] = useState(true);

  return (
    <div
      className={`fixed right-0 top-0 mt-12 w-64 h-64 overflow-y-auto z-50 transition-opacity ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-bold mb-4">Notifications</h2>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            message={notification.message}
          />
        ))}
      </div>
    </div>
  );
}

export default NotificationContainer;
