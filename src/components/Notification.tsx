import React from 'react';
import { toast } from 'sonner';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  React.useEffect(() => {
    const showToast = () => {
      toast(message, {
        duration: 5000, // Duration in milliseconds
        style: {
          background: '#4CAF50', // Customize background color
          color: '#fff', // Customize text color
          borderRadius: '8px', // Rounded corners
          padding: '16px', // Padding for the toast
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for depth
        },
        onDismiss: onClose, // Call onClose when the toast is dismissed
      });
    };

    showToast(); // Show the toast when the component mounts
  }, [message, onClose]); // Include message and onClose in the dependency array

  return null; // Return null since we are using sonner for notifications
};

export default Notification;