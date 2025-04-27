/** @format */

// contexts/notification.context.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "@/lib/firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { toast } from "@/hooks/use-toast"; // Your toast hook
import { useAuth } from "./auth.context";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(firestore, "notifications"),
      where("toUserId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let newNotifications = [];

      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          newNotifications.push({ id: change.doc.id, ...data });

          // show toast
          toast({
            title: "New Notification",
            description: data.message,
          });
        }
      });

      setNotifications((prev) => [...prev, ...newNotifications]);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const markAsRead = async (notificationId) => {
    try {
      await updateDoc(doc(firestore, "notifications", notificationId), {
        read: true,
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};
