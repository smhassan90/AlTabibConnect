import { MaterialIcons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { colors } from "../styles";
import { CustomContent } from "./../../app/components/home/CustomContent";
import { useEffect, useRef, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
import axios from "axios";
import { Alert, Platform } from "react-native";
import * as Device from "expo-device";
import { url } from "./../../env";
import messaging from "@react-native-firebase/messaging";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const DrawerLayout = () => {
  const TOKEN = SecureStore.getItem("token");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (
          remoteMessage &&
          remoteMessage.data &&
          remoteMessage.data.title &&
          remoteMessage.data.body
        ) {
          const newNotification = {
            title: remoteMessage.data?.title || "New Notification",
            body: remoteMessage.data?.body || "",
            timestamp: new Date().toISOString(),
            AppointmentId: remoteMessage.data?.AppointmentId,
            read: false,
          };
          console.log(remoteMessage, "remoteMessage Osama OKAY");
          try {
            const existing = await AsyncStorage.getItem("notifications");
            const notifications = existing ? JSON.parse(existing) : [];
            notifications.unshift(newNotification);
            await AsyncStorage.setItem(
              "notifications",
              JSON.stringify(notifications)
            );
          } catch (err) {
            console.log("Error saving initial notification:", err);
          }
        }
      });
  }, []);
  useEffect(() => {
    const requestPermissionAndGetToken = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Authorization status:", authStatus);
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log("FCM Token:", fcmToken);
          setExpoPushToken(fcmToken);
          axios.get(
            `http://192.168.18.21:8080/tabib/updateFCMToken?token=${TOKEN}&fcmToken=${fcmToken}`
          );
        }
      } else {
        Alert.alert(
          "Permission denied",
          "Please allow notification permissions"
        );
      }
    };

    requestPermissionAndGetToken();
    console.log("PUSHINGGG:", expoPushToken);

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage, "remoteMessage");
      const newNotification = {
        title: remoteMessage.data?.title || "New Notification",
        body: remoteMessage.data?.body || "",
        timestamp: new Date().toISOString(),
        AppointmentId: remoteMessage.data?.AppointmentId,
        read: false,
      };
      try {
        const existing = await AsyncStorage.getItem("patientNotifications");
        const notifications = existing ? JSON.parse(existing) : [];
        notifications.unshift(newNotification);
        await AsyncStorage.setItem(
          "patientNotifications",
          JSON.stringify(notifications)
        );
      } catch (err) {
        console.log("Error saving notification:", err);
      }
      Toast.show({
        type: "info",
        // text1: remoteMessage.notification?.title || 'New Notification',
        // text2: remoteMessage.notification?.body || '',
        text1: remoteMessage.data?.title || "New Notification",
        text2: remoteMessage.data?.body || "",
        position: "top",
        visibilityTime: 2000,
      });
    });
    const resetBadge = async () => {
      try {
        await Notifications.setBadgeCountAsync(0);
        console.log("Badge count reset to 0");
      } catch (error) {
        console.log("Error resetting badge count:", error);
      }
    };
    resetBadge(); // Call it immediately when app loads

    const subscription = Notifications.addNotificationResponseReceivedListener(
      () => {
        resetBadge(); // Also reset badge when user interacts with a notification
      }
    );

    return unsubscribe;
    subscription.remove();
  }, [TOKEN, expoPushToken]);

  return (
    <Drawer
      drawerContent={CustomContent}
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.primary,
        },
        headerShown: false,
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerItemStyle: { height: 0 },
          headerTintColor: colors.primary,
          headerTitle: "Home",
          drawerLabel: "Get Appointment",
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "a8c49790-adb1-4f30-aec5-2cb6d2f2ab88",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
