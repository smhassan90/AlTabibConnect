import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FontColors, RegLog, fonts, form } from "../constants";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { Separator, XStack } from "tamagui";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import { buttons, colors, fontSizes, fontsFams } from "../styles";
import { url } from "~/env";
import { useDispatch } from "react-redux";
import { addUser } from "../context/actions/userActions";
import { tokenCache } from "../getToken";

const FormLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [num, setNum] = useState("03323403109");
  const [pass, setPass] = useState("password123");

  const validateNum = (num: string) => num.length >= 11;
  const isEmptyString = (str: string) => str.trim() === "";

  const emptyFields = (num: string, password: string) =>
    ![num, password].some(isEmptyString);

  const validateSubmit = (num: string, password: string) =>
    validateNum(num) && emptyFields(num, password);

  const handleNumChange = (text: string) => {
    setNum(text);
  };

  const handlePassChange = (text: string) => {
    setPass(text);
  };

  const handleSubmit = () => {
    if (!validateSubmit(num, pass)) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Please fill all details correctly",
        button: "Close",
      });
    } else {
      setLoading(true);
      fetchLoginData();
    }
  };

  const getCurrentTimestamp = () => {
    const now = new Date();
    const date = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear().toString();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `${date}-${month}-${year}-${hours}-${minutes}-${seconds}`;
  };

  const currentTimeStamp = getCurrentTimestamp();

  //USE YOUR OWN URL!!

  const loginUrl = `${url}login?username=${num}&password=${pass}&UUID=${currentTimeStamp}&type=2`;

  const fetchLoginData = () => {
    axios
      .get(loginUrl)
      .then((response) => {
        if (response.status === 200) {
          const USER = {
            name: num,
            pass: pass,
            token: response.data.data.token,
          };

          dispatch(addUser(USER));

          console.log(
            "RESPONSE STATUS: ",
            JSON.stringify(response.status, null, 2),
          );
          console.log(
            "Response TOKEN: ",
            JSON.stringify(response.data.data.token, null, 2),
          );
          tokenCache
            .setToken("token", response.data.data.token)
            .then(() => {
              console.log(
                `Login Token Storage successfull: ${tokenCache.getToken("token")}`,
              );
              router.replace("/(auth)/(tabs)/(home)");
            })
            .catch((error) => {
              console.error("Error storing token: ", error);
            });
        } else {
          console.log("Error, Status code: ", response.status);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Server Error: ", error.response.data);
          console.error("Status Code: ", error.response.status);
          console.error("Headers: ", error.response.headers);
          setLoading(false);
        } else if (error.request) {
          console.error("No response received: ", error.request);
          setLoading(false);
        } else {
          console.error("Request Error: ", error.message);
          setLoading(false);
        }
      });
  };

  return (
    <View style={form.layout}>
      <XStack alignItems="center" gap={5}>
        <XStack
          gap={10}
          backgroundColor={"white"}
          flex={1}
          borderColor={"#ebebeb"}
          borderWidth={1}
          borderRadius={5}
          padding={10}
        >
          <AntDesign name="user" size={24} color={colors.primary} />
          <Separator vertical borderColor={"lightgray"} />
          <TextInput
            value={num}
            keyboardType="numeric"
            maxLength={11}
            style={{ padding: 0, flex: 1, fontFamily: "ArialB" }}
            placeholder="Enter Your Username"
            onChangeText={handleNumChange}
            placeholderTextColor="#808080a4"
          />
        </XStack>
      </XStack>
      <XStack alignItems="center" gap={5}>
        <XStack
          gap={10}
          backgroundColor={"white"}
          flex={1}
          borderColor={"#ebebeb"}
          borderWidth={1}
          borderRadius={5}
          padding={10}
        >
          <AntDesign name="lock" size={24} color={colors.primary} />
          <Separator vertical borderColor={"lightgray"} />
          <TextInput
            value={pass}
            style={{ padding: 0, flex: 1, fontFamily: "ArialB" }}
            placeholder="Enter Your Password"
            onChangeText={handlePassChange}
            placeholderTextColor="#808080a4"
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </XStack>
      </XStack>
      <TouchableOpacity onPress={handleSubmit} style={[buttons.primaryBtn]}>
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Text style={[fonts.subBold, FontColors.whiteFont]}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={[RegLog.onPressStyle, { zIndex: -1000 }]}>
        <Text
          style={[
            {
              fontSize: fontSizes.SM,
              fontFamily: fontsFams.ArialB,
              color: colors.primary,
            },
          ]}
        >
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push("/Register")}>
          <Text
            style={[
              {
                fontSize: fontSizes.SM,
                fontFamily: fontsFams.ArialB,
                color: colors.linkBlue,
              },
            ]}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default FormLogin;
