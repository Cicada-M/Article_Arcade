import "./Notification.css";
export default function NotificationCard({ message }) {
  return (
    <div className="notification-card bg-white rounded-lg shadow-md p-4 mb-4">
      <p>{message}</p>
    </div>
  );
}
