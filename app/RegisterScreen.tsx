import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import Form from "./components/Form";
import { containers } from "./constants";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { colors, textStyles } from "./styles";

const RegisterScreen = () => {
  return (
    <AlertNotificationRoot>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={[containers.fullScreen]}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={{
              gap: 15,
              padding: 15,
              alignContent: "center",
              justifyContent: "center",
              flex: 1,
              backgroundColor: colors.primary,
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={[textStyles.heading]}>Register</Text>
            <Text style={[textStyles.normal, { textAlign: "center" }]}>
              You can search Doctors, Book Appointments & check Medical History
            </Text>
            <Form />
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </AlertNotificationRoot>
  );
};

export default RegisterScreen;
