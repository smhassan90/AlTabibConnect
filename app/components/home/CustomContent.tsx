import { Alert } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Button, ButtonText, Text, View, Image } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { router, useNavigation } from "expo-router";
import { colors } from "~/app/styles";
import { FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";

export const CustomContent = (props: any) => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();

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
            router.replace("/LoginScreen");
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View flex={1}>
      <DrawerContentScrollView {...props}>
        <View
          marginHorizontal={10}
          paddingVertical={20}
          borderRadius={10}
          //backgroundColor={"lightgray"}
          marginBottom={10}
          alignItems="center"
          gap={10}
        >
          <Image
            height={100}
            width={100}
            //alignSelf="center"
            borderRadius={50}
            source={{
              uri: "https://lh3.googleusercontent.com/pw/ABLVV87DzwHP62UImU7R1nHuilbogC05sWMFkxIszzTzyME0YlXojhRgXQsDdn6S-ZQLVJhAlabuAEXUhNfJKTk5yYeYEGOmcfj0usKvHCrRv_SwepxHDhKCoVInKg-4nhSkmOMjjWtXDTZu-ut6e-NtC3fnhQ=w607-h607-s-no-gm",
            }}
          />
          <Text color={colors.primary} fontSize={24} fontFamily={"ArialB"}>
            Syed Anas Ahmed
          </Text>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          style={{ marginLeft: 20 }}
          labelStyle={{ fontFamily: "ArialB", color: colors.yellow }}
          // activeTintColor={colors.primary}
          // inactiveTintColor={colors.white}
          activeBackgroundColor={colors.primary}
          inactiveBackgroundColor={colors.white}
          icon={({ size, color }) => (
            <MaterialIcons name="home" size={size} color={colors.primary} />
          )}
          label={"Get Appointment"}
          onPress={() => {
            router.replace("/(auth)/(tabs)/(home)/");
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        />
        <DrawerItem
          style={{ marginLeft: 20 }}
          labelStyle={{ fontFamily: "ArialB", color: colors.yellow }}
          // activeTintColor={colors.primary}
          // inactiveTintColor={colors.white}
          // activeBackgroundColor={colors.primary}
          // inactiveBackgroundColor={colors.white}
          icon={({ size, color }) => (
            <FontAwesome6
              name="house-medical-circle-exclamation"
              size={20}
              color={colors.primary}
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
          labelStyle={{ fontFamily: "ArialB", color: colors.yellow }}
          // activeTintColor={colors.primary}
          // inactiveTintColor={colors.white}
          // activeBackgroundColor={colors.primary}
          // inactiveBackgroundColor={colors.white}
          icon={({ size, color }) => (
            <MaterialIcons
              name="family-restroom"
              size={size}
              color={colors.primary}
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
          labelStyle={{ fontFamily: "ArialB", color: colors.yellow }}
          // activeTintColor={colors.primary}
          // inactiveTintColor={colors.white}
          // activeBackgroundColor={colors.primary}
          // inactiveBackgroundColor={colors.white}
          icon={({ size, color }) => (
            <MaterialIcons
              name="follow-the-signs"
              size={size}
              color={colors.primary}
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
          labelStyle={{ fontFamily: "ArialB", color: colors.yellow }}
          // activeTintColor={colors.primary}
          // inactiveTintColor={colors.white}
          // activeBackgroundColor={colors.primary}
          // inactiveBackgroundColor={colors.white}
          icon={({ size, color }) => (
            <FontAwesome name="user-md" size={size} color={colors.primary} />
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
          backgroundColor={colors.yellow}
          marginHorizontal={10}
          onPress={handleLogout}
        >
          <ButtonText fontFamily={"ArialB"}>Logout</ButtonText>
        </Button>
      </View>
    </View>
  );
};
