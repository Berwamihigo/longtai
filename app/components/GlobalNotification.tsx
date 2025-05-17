import { create } from 'zustand';
import NotificationToast from './NotificationToast';
import { motion, AnimatePresence } from 'framer-motion';

type NotificationItem = {
  id: string;
  message: string;
  type: 'success' | 'error';
};

type NotificationStore = {
  notifications: NotificationItem[];
  addNotification: (message: string, type: 'success' | 'error') => void;
  removeNotification: (id: string) => void;
};

const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (message: string, type: 'success' | 'error') => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }]
    }));
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id)
      }));
    }, 3000);
  },
  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    }));
  }
}));

export function useNotification() {
  const store = useNotificationStore();
  
  // Debounced showNotification function
  const showNotification = (message: string, type: 'success' | 'error') => {
    // Check if the same message is already in the queue
    const isDuplicate = store.notifications.some(n => n.message === message);
    if (!isDuplicate) {
      store.addNotification(message, type);
    }
  };

  return { showNotification };
}

export default function GlobalNotification() {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence mode="sync">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <NotificationToast
              show={true}
              message={notification.message}
              type={notification.type}
              onClose={() => removeNotification(notification.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
} 