import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { containers } from "./constants";
import { AlertNotificationRoot } from "react-native-alert-notification";
import FormLogin from "./components/FormLogin";
import { colors, textStyles } from "./styles";
import React from "react";

const LoginScreen = () => {
  return (
    <AlertNotificationRoot>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={[containers.fullScreen]}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={{gap:15, padding:15, alignContent:"center", justifyContent:"center", flex:1, backgroundColor:colors.primary, flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
              <Text style={[textStyles.heading,{ textAlign: "center" }]}>Login</Text>
              <Text style={[textStyles.normal, { textAlign: "center" }]}>
                Search Doctors, Get Appointments & Medical
                History
              </Text>
              <FormLogin />
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </AlertNotificationRoot>
  );
};

export default LoginScreen;
