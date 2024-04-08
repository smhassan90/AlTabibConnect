import { MaterialIcons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { colors } from "../styles";
import { CustomContent } from "~/app/components/home/CustomContent";
import { useEffect, useRef, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
import axios from "axios";
import { Platform } from "react-native";
import * as Device from "expo-device";
import { url } from "~/env";

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
    const FCMtoken = expoPushToken
      .replace("ExponentPushToken[", "")
      .replace("]", "");
    axios.get(`${url}updateFCMToken?token=${TOKEN}&fcm=${FCMtoken}`);

    registerForPushNotificationsAsync().then((expoToken) =>
      setExpoPushToken(expoToken),
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("WTF");
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [TOKEN]);

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
