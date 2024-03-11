import { Alert, TouchableOpacity } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { Button, ButtonText, Text, View, Image } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CustomDrawer = (props: any) => {
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
          backgroundColor={"lightgray"}
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
          <Text color={"white"} fontSize={24} fontFamily={"ArialB"}>
            Syed Anas Ahmed
          </Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View
        paddingBottom={bottom + 20}
      >
        <Button
          backgroundColor={"red"}
          marginHorizontal={10}
          onPress={handleLogout}
        >
          <ButtonText fontFamily={"ArialB"}>Logout</ButtonText>
        </Button>
      </View>
    </View>
  );
};
