import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import Form from "../components/Form";
import { containers } from "../constants";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { colors } from "../styles";
import { CusText } from "../components/CusText";

const Register = () => {
  return (
    <AlertNotificationRoot>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={[
            containers.fullScreen,
            {
              gap: 15,
              padding: 15,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.primary,
            },
          ]}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <CusText color="white" bold xl>Register</CusText>
          <CusText color="white" sm>Get Doctors, Appointments & Medical History</CusText>
          <Form />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </AlertNotificationRoot>
  );
};

export default Register;
