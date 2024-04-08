import { Alert, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Button, ButtonText, Text, View, Image, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { router, useNavigation } from "expo-router";
import { colors, fontSizes } from "~/app/styles";
import { FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import constants from "expo-constants";
import axios from "axios";
import { url } from "~/env";

export let userData = {};

export const CustomContent = (props: any) => {
  useEffect(() => {
    const token = SecureStore.getItem("token");
    axios
      .get(`${url}getProfile?token=${token}`)
      .then((res) => {
        userData = res.data.data.patients[0];
        console.log("PROFILE DATA: ", JSON.stringify(userData, null, 2));
      })
      .catch((err) => {
        console.log("ERROR GETTING PROFILE: ", err);
      });
  }, []);

  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const topSpace = constants.statusBarHeight;

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            SecureStore.deleteItemAsync("token");
            router.replace("/Login");
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View flex={1}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/(auth)/(tabs)/(profile)")}
          style={{
            marginTop: -topSpace - 10,
            width: "100%",
            paddingHorizontal: 20,
            paddingTop: 50,
            paddingBottom: 20,
            backgroundColor: colors.yellow,
            marginBottom: 10,
            gap: 10,
          }}
        >
          <Image
            height={100}
            width={100}
            borderRadius={50}
            source={require("~/assets/man.png")}
          />
          <YStack gap={3}>
            <Text
              color={colors.white}
              fontSize={fontSizes.M}
              fontFamily={"ArialB"}
            >
              {userData.name}
            </Text>
            <Text
              color={colors.white}
              fontSize={fontSizes.SM}
              fontFamily={"Arial"}
            >
              {userData.cellNumber}
            </Text>
          </YStack>
        </TouchableOpacity>
        <DrawerItemList {...props} />
        <DrawerItem
          style={{ marginLeft: 20 }}
          labelStyle={{ fontFamily: "ArialB", color: colors.white }}
          activeBackgroundColor={colors.primary}
          icon={({ size, color }) => (
            <MaterialIcons name="home" size={size} color={colors.yellow} />
          )}
          label={"Get Appointment"}
          onPress={() => {
            router.replace("/(auth)/(tabs)/(home)/");
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        />
        <DrawerItem
          style={{ marginLeft: 20 }}
          labelStyle={{ fontFamily: "ArialB", color: colors.white }}
          icon={({ size, color }) => (
            <FontAwesome6
              name="house-medical-circle-exclamation"
              size={20}
              color={colors.yellow}
            />
          )}
          label={"My Appointments"}
          onPress={() => {
            router.replace("/(auth)/(tabs)/(myApps)/");
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        />
        <DrawerItem
          style={{ marginLeft: 20 }}
          labelStyle={{ fontFamily: "ArialB", color: colors.white }}
          icon={({ size, color }) => (
            <MaterialIcons
              name="family-restroom"
              size={size}
              color={colors.yellow}
            />
          )}
          label={"My Family"}
          onPress={() => {
            router.replace("/(auth)/(tabs)/(family)/");
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        />
        <DrawerItem
          style={{ marginLeft: 20 }}
          labelStyle={{ fontFamily: "ArialB", color: colors.white }}
          icon={({ size, color }) => (
            <MaterialIcons
              name="follow-the-signs"
              size={size}
              color={colors.yellow}
            />
          )}
          label={"My Follow-ups"}
          onPress={() => {
            router.replace("/(auth)/(tabs)/(followup)/");
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        />
        <DrawerItem
          style={{ marginLeft: 20 }}
          labelStyle={{ fontFamily: "ArialB", color: colors.white }}
          icon={({ size, color }) => (
            <FontAwesome name="user-md" size={size} color={colors.yellow} />
          )}
          label={"My Profile"}
          onPress={() => {
            router.replace("/(auth)/(tabs)/(profile)/");
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        />
      </DrawerContentScrollView>

      <View paddingBottom={bottom + 20}>
        <Button
          backgroundColor={"$red9Light"}
          marginHorizontal={10}
          onPress={handleLogout}
        >
          <ButtonText fontFamily={"ArialB"}>Logout</ButtonText>
        </Button>
      </View>
    </View>
  );
};
