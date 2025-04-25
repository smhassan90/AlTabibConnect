import { TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { Separator, XStack, YStack } from "tamagui";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import { borders, buttons, colors, spacingPrim } from "../styles";
import { url } from "./../../env";
import { useDispatch } from "react-redux";
import { addUser } from "../context/actions/userActions";
import { Spinner } from "./Animations";
import { LinkText, PrimBold, WhiteBold } from "./CusText";
import * as SecureStore from "expo-secure-store";

const FormDeleteUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [num, setNum] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(true);

  const validateNum = (num: string) => num.length === 11 && num.startsWith("0");
  const validatePass = (pass: string) => pass.length >= 5;
  const isEmptyString = (str: string) => str.trim() === "";

  const emptyFields = (num: string, password: string) =>
    ![num, password].some(isEmptyString);

  const validateSubmit = (num: string, password: string) =>
    validateNum(num) && validatePass(password) && emptyFields(num, password);

  const handleNumChange = (text: string) => {
    setNum(text);
  };

  const handlePassChange = (text: string) => {
    setPass(text);
  };

  const handleSubmit = () => {
    if (!validateNum(num)) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Phone number should be 11 characters and start with 0",
        button: "Close",
      });
    } else if (!validatePass(pass)) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Password should be at least 5 characters",
        button: "Close",
      });
    } else if (!emptyFields(num, pass)) {
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

  // USE YOUR OWN URL!!
  const deleteUrl = `${url}deleteUser`;
  const payload = {
    username: num,
    password: pass,
  };
  const fetchLoginData = () => {
    axios
      .post(deleteUrl, payload)
      .then((response) => {
        if (response.data.status == 200) {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: "Delete Account Successfully",
            button: "Close",
          });
          setTimeout(()=>{
            router.replace("/Login");
          },2000)
          setLoading(false);
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: "Error Delete User, enter correct details",
            button: "Close",
          });
          console.log("Error, Status code: ", response.status);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <YStack
      width={"100%"}
      justifyContent="center"
      backgroundColor={colors.white}
      gap={spacingPrim}
      padding={spacingPrim + 10}
      borderRadius={borders.SM}
    >
      <XStack
        gap={10}
        backgroundColor={"white"}
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
          placeholder="Enter Your Phone"
          onChangeText={handleNumChange}
          placeholderTextColor="#808080a4"
        />
      </XStack>
      <XStack
        gap={10}
        backgroundColor={"white"}
        borderColor={"#ebebeb"}
        borderWidth={1}
        borderRadius={5}
        padding={10}
      >
        <AntDesign name="lock" size={24} color={colors.primary} />
        <Separator vertical borderColor={"lightgray"} />
        <TextInput
          value={pass}
          style={{ flex: 1, fontFamily: "ArialB" }}
          placeholder="Enter Your Password"
          onChangeText={handlePassChange}
          placeholderTextColor="#808080a4"
          autoCapitalize="none"
          secureTextEntry={showPass}
        />
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <AntDesign
            name={showPass ? "eye" : "eyeo"}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </XStack>
      <TouchableOpacity onPress={handleSubmit} style={[buttons.primaryBtn]}>
        {loading ? <Spinner /> : <WhiteBold>Delete</WhiteBold>}
      </TouchableOpacity>

      <XStack alignItems="center" justifyContent="center" gap={spacingPrim}>
        <PrimBold>Already have an account?</PrimBold>
        <TouchableOpacity onPress={() => router.push("/Login")}>
          <LinkText>Login</LinkText>
        </TouchableOpacity>
      </XStack>
    </YStack>
  );
};
export default FormDeleteUser;
