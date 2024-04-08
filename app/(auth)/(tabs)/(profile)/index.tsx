import React, { useState } from "react";
import MenuBar from "~/app/components/MenuBar";
import { buttons, colors, fontSizes } from "~/app/styles";
import { Card, Image, Text, XStack } from "tamagui";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { url } from "~/env";
import { TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";
import { router } from "expo-router";
import { userData } from "~/app/components/home/CustomContent";
import Header from "~/app/components/ParentView";
import dayjs from "dayjs";

export default function Page() {
  const token = SecureStore.getItem("token");

  const [password, setPassword] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newConNewPw, setConNewPw] = useState("");

  const handleOldPassChange = (text: string) => setPassword(text);
  const handleNewPassChange = (text: string) => setNewPw(text);
  const handleConNewPassChange = (text: string) => setConNewPw(text);

  const [changePassState, setChangePassState] = useState(false);

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

  const changePw = (oldPw: string, newPw: string) => {
    axios
      .get(
        `${url}changePassword?token=${token}&oldPassword=${oldPw}&newPassword=${newPw}`,
      )
      .then((res) => {
        console.log(JSON.stringify(res.data, null, 2));
        if (res.data.status == 200) {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Password Changed",
            textBody: "Password has been changed successfully",
          });
          setTimeout(() => {
            Dialog.hide();
            setChangePassState(false);
          }, 2000);
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Error Changing Password",
            textBody: "Something went wrong",
          });
          setTimeout(() => {
            Dialog.hide();
            setChangePassState(false);
          }, 2000);
        }
      })
      .catch((err: any) => {
        console.log("ERROR CHANGING PW: ", err);
      });
  };

  return (
    <AlertNotificationRoot>
      <View style={{ flex: 1, backgroundColor: colors.primary }}>
        <Header>
          <MenuBar title="Profile" />
        </Header>
        <Card
          marginTop={10}
          marginHorizontal={10}
          gap={15}
          unstyled
          padded
          backgroundColor={colors.lightGray}
        >
          <Image
            alignSelf="center"
            height={100}
            width={100}
            borderRadius={50}
            source={require("~/assets/man.png")}
          />
          <XStack gap={5}>
            <Text
              fontSize={fontSizes.SM}
              color={colors.yellow}
              fontFamily={"ArialB"}
            >
              Name:
            </Text>
            <Text
              fontSize={fontSizes.SM}
              color={colors.primary}
              fontFamily={"ArialB"}
            >
              {/* {userData.name} */}
              {userData.name}
            </Text>
          </XStack>
          <XStack gap={5}>
            <Text
              fontSize={fontSizes.SM}
              color={colors.yellow}
              fontFamily={"ArialB"}
            >
              Phone:
            </Text>
            <Text
              fontSize={fontSizes.SM}
              color={colors.primary}
              fontFamily={"ArialB"}
            >
              {userData.cellNumber}
            </Text>
          </XStack>
          <XStack gap={5}>
            <Text
              fontSize={fontSizes.SM}
              color={colors.yellow}
              fontFamily={"ArialB"}
            >
              Gender:
            </Text>
            <Text
              fontSize={fontSizes.SM}
              color={colors.primary}
              fontFamily={"ArialB"}
            >
              {userData.gender}
            </Text>
          </XStack>
          <XStack gap={5}>
            <Text
              fontSize={fontSizes.SM}
              color={colors.yellow}
              fontFamily={"ArialB"}
            >
              DOB:
            </Text>
            <Text
              fontSize={fontSizes.SM}
              color={colors.primary}
              fontFamily={"ArialB"}
            >
              {dayjs(userData.dob).format("DD MMM YYYY")}
            </Text>
          </XStack>
          {changePassState ? (
            <>
              <TextInput
                autoCapitalize="none"
                onChangeText={handleOldPassChange}
                placeholderTextColor={colors.labelGray}
                style={inp.input}
                //secureTextEntry
                placeholder="Enter old password"
              />
              <TextInput
                autoCapitalize="none"
                onChangeText={handleNewPassChange}
                placeholderTextColor={colors.labelGray}
                style={inp.input}
                placeholder="Enter new password"
              />
              <TextInput
                autoCapitalize="none"
                onChangeText={handleConNewPassChange}
                placeholderTextColor={colors.labelGray}
                style={inp.input}
                placeholder="Confirm new password"
              />
              <XStack gap={5}>
                <TouchableOpacity
                  style={[buttons.secBtn, { flex: 1 }]}
                  onPress={() => {
                    setChangePassState(!changePassState);
                  }}
                >
                  <Text fontFamily={"ArialB"} color={colors.white}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[buttons.primaryBtn, { flex: 1 }]}
                  onPress={() => {
                    changePw(password, newPw);
                  }}
                >
                  <Text fontFamily={"ArialB"} color={colors.white}>
                    Confirm
                  </Text>
                </TouchableOpacity>
              </XStack>
            </>
          ) : (
            <TouchableOpacity
              style={[buttons.primaryBtn]}
              onPress={() => {
                setChangePassState(!changePassState);
              }}
            >
              <Text color={colors.white} fontFamily={"ArialB"}>
                Change Password
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={buttons.redBtn} onPress={handleLogout}>
            <Text fontFamily={"ArialB"} color={colors.white}>
              Logout
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    </AlertNotificationRoot>
  );
}

const inp = StyleSheet.create({
  input: {
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: colors.white,
  },
});
