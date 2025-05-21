import React, { useEffect, useState } from "react";
import {
  colors,
  paddingM,
  paddingL,
  styles,
  spacingL,
  spacingS,
  fontFamily,
  fontSizes,
} from "./../../../../app/styles";
import { Card, Image, Text, View, XStack, YStack } from "tamagui";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
} from "react-native";
import { AlertNotificationRoot } from "react-native-alert-notification";
import Header from "./../../../../app/components/ParentView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { RefreshControl } from "react-native-gesture-handler";
import dayjs from "dayjs";
import MenuBar from "./../../../../app/components/MenuBar";
import NotificationCard from "./card";
type Notification = {
  read: boolean;
  timestamp: number;
  [key: string]: any;
};

export default function Page() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();
  const loadNotifications = async () => {
    const stored = await AsyncStorage.getItem("patientNotifications");
    if (stored) {
      const notifications = JSON.parse(stored);
      console.log(notifications, "notifications");
      const now = dayjs();
      const filtered = notifications.filter((notification) => {
        const notificationTime = dayjs(notification.timestamp);
        const diffInMinutes = now.diff(notificationTime, "minute");
        return diffInMinutes <= 5;
      });
      setNotifications(filtered);
    }
  };
  useEffect(() => {
    if (isFocused) {
      loadNotifications();
    }
    setRefresh(false);
  }, [isFocused, refresh]);
  const handleNotificationPress = async (index) => {
    const updated = [...notifications];
    if (!updated[index].read) {
      updated[index].read = true;
      await AsyncStorage.setItem(
        "patientNotifications",
        JSON.stringify(updated)
      );
      setNotifications(updated);
    }
  };
  return (
    <AlertNotificationRoot>
      <View flex={1} backgroundColor={colors.primary}>
        <Header>
          <MenuBar title="Notifications" />
        </Header>
        {/* <YStack padding={paddingM}>
          {notifications?.map((notification, index) => (
            <NotificationCard key={index} notification={notification} />
          ))}
        </YStack> */}
        <YStack flex={1} paddingTop={10}>
          {notifications.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  colors={[colors.yellow]}
                  tintColor={colors.white}
                  onRefresh={() => {
                    setRefresh(true);
                  }}
                />
              }
              refreshing={true}
              horizontal={false}
              decelerationRate="normal"
              data={notifications}
              keyExtractor={(item: any) => item.timestamp.toString()}
              renderItem={({ item, index }) => (
                <NotificationCard
                  notification={item}
                  onPress={() => handleNotificationPress(index)}
                />
              )}
            />
          ) : (
            <YStack alignItems="center" flex={1} justifyContent="center">
              <Text
                textAlign="center"
                fontFamily={fontFamily.bold}
                fontSize={fontSizes.M}
                color={"white"}
              >
                No Notifications
              </Text>
            </YStack>
          )}
        </YStack>
      </View>
    </AlertNotificationRoot>
  );
}

const inp = StyleSheet.create({
  input: {
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: colors.white,
  },
});
