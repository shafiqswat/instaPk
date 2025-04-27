/** @format */

// src/components/hooks/useFirebaseNotification.js
"use client";
import { toast } from "@/hooks/use-toast";
import { messaging, getToken, onMessage } from "@/lib/firebaseConfig";
import { useEffect } from "react";

const VAPID_KEY =
  "BM_WKu9vtWOHK9UUXJz6Ln8MwuoqaA8emFp2OKzujiTmWkpcuTtKm8riAisekBAOQr56nzNXqn6Bcs7U10Kklg0"; // FCM -> Project Settings -> Cloud Messaging -> Web Push certificates

export const useFirebaseNotification = () => {
  useEffect(() => {
    if (!messaging) return;

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(messaging, { vapidKey: VAPID_KEY })
          .then((currentToken) => {
            if (currentToken) {
              console.log("FCM Token:", currentToken);
              // you can send this token to your server to send notifications
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
          });
      }
    });

    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      toast({
        title: payload?.notification?.title,
        description: payload?.notification?.body,
      });
    });
  }, []);
};
