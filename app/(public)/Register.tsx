import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import Form from "../components/Form";
import { containers } from "../constants";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { colors, fontSizes } from "../styles";
import { WhiteBold } from "../components/CusText";
import { Text } from "tamagui";

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
          <Text fontFamily={"ArialB"} fontSize={fontSizes.XL} color="white">
            Register
          </Text>
          <Text fontFamily={"ArialB"} fontSize={fontSizes.SM} color="white">
            Get Doctors, Appointments & Medical History
          </Text>
          <Form />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </AlertNotificationRoot>
  );
};

export default Register;
