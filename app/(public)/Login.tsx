import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { containers } from "../constants";
import { AlertNotificationRoot } from "react-native-alert-notification";
import FormLogin from "../components/FormLogin";
import { colors, fontSizes, spacingM, spacingPrim } from "../styles";
import React from "react";
import { WhiteBold } from "../components/CusText";
import { Text } from "tamagui";

const Login = () => {
  return (
    <AlertNotificationRoot>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={[
            containers.fullScreen,
            {
              gap: spacingPrim,
              padding: spacingM,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.primary,
            },
          ]}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text fontFamily={"ArialB"} color={"white"} fontSize={fontSizes.XL}>
            Login
          </Text>
          <WhiteBold>Get Doctors, Appointments & Medical History</WhiteBold>
          <FormLogin />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </AlertNotificationRoot>
  );
};

export default Login;
