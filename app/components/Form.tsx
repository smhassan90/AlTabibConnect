import {
  Dimensions,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import dayjs from "dayjs";
import React, { useState } from "react";
import { FontColors, RegLog, fonts } from "../constants";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { Separator, XStack } from "tamagui";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { YStack } from "tamagui";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import GenderPick from "./GenderPick";
import axios from "axios";
import { buttons, colors, fontSizes, fontsFams, spacingPrim } from "../styles";
import { BlurView } from "expo-blur";
import { url } from "~/env";
import { useDispatch } from "react-redux";
import { addToken } from "../context/actions/tokenActions";
import { tokenCache } from "../getToken";
import { Spinner } from "./Animations";
import { LinkText, PrimBold, WhiteBold } from "./CusText";

const Form = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [num, setNum] = useState("03");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [gender, setGender] = useState("");
  const [verifyPass, setverifyPass] = useState("");

  const [date, setDate] = useState<DateType>(dayjs());
  const [isModalVisible, setIsModalVisible] = useState(false);

  const currDate = date ? dayjs(date).format("DD-MMM-YYYY") : "Date of Birth";

  const isEmptyString = (str: string) => str.trim() === "";
  const validateNum = (num: string) => num.length >= 11;

  //Validation Metdods
  const emptyFields = (
    num: string,
    name: string,
    password: string,
    verifyPass: string,
    gender: string,
    date: string,
  ) => ![num, name, password, verifyPass, gender, date].some(isEmptyString);

  const validateSubmit = (
    num: string,
    name: string,
    password: string,
    verifyPass: string,
    gender: string,
    date: string,
  ) =>
    validateNum(num) &&
    emptyFields(num, name, password, verifyPass, gender, date) &&
    password === verifyPass;

  //Input Changing
  const handleNumChange = (text: string) => setNum(text);
  const handlePassChange = (text: string) => setPass(text);
  const handleVerifyPassChange = (text: string) => setverifyPass(text);
  const handleGenderChange = (selectedGender: string) =>
    setGender(selectedGender);
  const handleNameChange = (name: string) => setName(name);

  const handleSubmit = () => {
    if (!validateSubmit(num, name, pass, verifyPass, gender, currDate)) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Please fill all details correctly",
        button: "Close",
      });
    } else {
      setLoading(true);
      fetchRegisterData();
    }
  };

  //Putting inputs in JSON format then encoding it and passing it to the axios
  const patient = {
    name: `${name}`,
    gender: `${gender}`,
    password: `${pass}`,
    cellNumber: `${num}`,
    dob: `${currDate}`,
  };

  const encodedPatient = encodeURIComponent(JSON.stringify(patient));

  //USE YOUR OWN URL!!
  const registerUrl = `${url}registerPatient?patient=${encodedPatient}&uuid=123&type=2`;

  const fetchRegisterData = () => {
    axios
      .get(registerUrl)
      .then((response) => {
        if (response.status === 200) {
          dispatch(addToken(response.data.data.token));

          console.log(
            "RESPONSE STATUS: ",
            JSON.stringify(response.status, null, 2),
          );
          console.log(
            "TOKEN: ",
            JSON.stringify(response.data.data.token, null, 2),
          );
          tokenCache
            .setToken("token", response.data.data.token)
            .then(() => {
              setTimeout(() => {
                console.log(
                  `Register Token stored successfully: ${tokenCache.getToken("token")}`,
                );
                router.replace("/Login");
                setLoading(false);
              }, 2000);
            })
            .catch((error: any) => {
              console.error("Error storing token: ", error);
            });
        } else {
          console.log("Error, Status code: ", response.status);
          //setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Server Error:", error.response.data);
          console.error("Status Code:", error.response.status);
          console.error("Headers:", error.response.headers);
          setLoading(false);
        } else if (error.request) {
          console.error("No response received:", error.request);
          setLoading(false);
        } else {
          console.error("Request Error:", error.message);
          setLoading(false);
        }
      });
  };

  return (
    <YStack
      justifyContent="center"
      borderRadius={spacingPrim}
      padding={15}
      backgroundColor={"white"}
      gap={15}
      width={"100%"}
    >
      <XStack
        borderColor={"#ebebeb"}
        borderWidth={1}
        borderRadius={5}
        gap={spacingPrim}
        backgroundColor={"white"}
        padding={spacingPrim}
      >
        <AntDesign name="phone" size={24} color={colors.primary} />
        <Separator vertical borderColor={"lightgray"} />
        <TextInput
          style={{ padding: 0, flex: 1, fontFamily: "ArialB" }}
          placeholder="Enter Your Phone"
          keyboardType="phone-pad"
          maxLength={11}
          value={num}
          onChangeText={handleNumChange}
          placeholderTextColor="#808080a4"
          textContentType="telephoneNumber"
        />
      </XStack>
      <XStack
        borderColor={"#ebebeb"}
        borderWidth={1}
        gap={spacingPrim}
        backgroundColor={"white"}
        borderRadius={5}
        padding={spacingPrim}
      >
        <AntDesign name="user" size={24} color={colors.primary} />
        <Separator vertical borderColor={"lightgray"} />
        <TextInput
          style={{ padding: 0, flex: 1, fontFamily: "ArialB" }}
          placeholder="Enter Your Name"
          onChangeText={handleNameChange}
          placeholderTextColor="#808080a4"
          textContentType="name"
        />
      </XStack>
      <XStack
        borderColor={"#ebebeb"}
        borderWidth={1}
        zIndex={100}
        gap={spacingPrim}
        backgroundColor={"white"}
        borderRadius={5}
        padding={spacingPrim}
        alignItems="center"
      >
        <AntDesign name="calendar" size={24} color={colors.primary} />
        <Separator alignSelf="stretch" vertical borderColor={"lightgray"} />

        {/* DATE PICKER */}

        <TouchableOpacity
          style={[buttons.primaryBtn, { flex: 1 }]}
          onPress={() => setIsModalVisible(true)}
        >
          <WhiteBold>
            {date ? dayjs(date).format("MMMM DD, YYYY") : "Choose Date"}
          </WhiteBold>
        </TouchableOpacity>
      </XStack>
      <XStack
        borderColor={"#ebebeb"}
        borderWidth={1}
        zIndex={100}
        gap={spacingPrim}
        backgroundColor={"white"}
        ai="center"
        borderRadius={5}
        padding={spacingPrim}
      >
        <Ionicons name="male-female" size={24} color={colors.primary} />
        <Separator als={"stretch"} vertical borderColor={"lightgray"} />
        <GenderPick genvalue={gender} onGenderChange={handleGenderChange} />
      </XStack>
      <XStack
        borderColor={"#ebebeb"}
        borderWidth={1}
        gap={spacingPrim}
        backgroundColor={"white"}
        borderRadius={5}
        padding={spacingPrim}
      >
        <AntDesign name="lock" size={24} color={colors.primary} />
        <Separator vertical borderColor={"lightgray"} />
        <TextInput
          style={{
            padding: 0,
            flex: 1,
            fontFamily: "ArialB",
          }}
          placeholder="Choose Password"
          onChangeText={handlePassChange}
          placeholderTextColor="#808080a4"
          autoCapitalize="none"
          textContentType="password"
        />
      </XStack>
      <XStack
        borderColor={"#ebebeb"}
        borderWidth={1}
        gap={spacingPrim}
        backgroundColor={"white"}
        borderRadius={5}
        padding={spacingPrim}
      >
        <AntDesign name="lock" size={24} color={colors.primary} />
        <Separator vertical borderColor={"lightgray"} />
        <TextInput
          style={{
            padding: 0,
            flex: 1,
            fontFamily: "ArialB",
          }}
          onChangeText={handleVerifyPassChange}
          placeholder="Re-Enter Password"
          placeholderTextColor="#808080a4"
          autoCapitalize="none"
          textContentType="password"
        />
      </XStack>
      <TouchableOpacity onPress={handleSubmit} style={[buttons.primaryBtn]}>
        {loading ? <Spinner /> : <WhiteBold>Register</WhiteBold>}
      </TouchableOpacity>

      <View style={RegLog.onPressStyle}>
        <PrimBold>Already have an account?</PrimBold>
        <TouchableOpacity onPress={() => router.push("/Login")}>
          <LinkText>Login</LinkText>
        </TouchableOpacity>
      </View>

      {/* MODAL */}

      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="fade"
      >
        <BlurView
          style={{
            padding: 15,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          experimentalBlurMethod="dimezisBlurView"
        >
          <View
            style={{
              gap: spacingPrim,
              backgroundColor: "white",
              padding: spacingPrim,
              borderRadius: spacingPrim,
            }}
          >
            <DateTimePicker
              dayContainerStyle={{
                borderWidth: 2,
                borderRadius: spacingPrim,
                borderColor: "#f3f3f3",
              }}
              headerButtonStyle={{ backgroundColor: "white", borderRadius: 7 }}
              headerContainerStyle={{
                paddingHorizontal: 5,
                backgroundColor: "#0066a1",
                borderRadius: spacingPrim,
              }}
              headerTextStyle={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
              headerButtonColor="#0066a1"
              selectedItemColor="#0066a1"
              mode="single"
              date={date}
              onChange={(date) => setDate(date.date)}
            />
            <XStack>
              <TouchableOpacity
                style={[buttons.primaryBtn, { flex: 1 }]}
                onPress={() => setIsModalVisible(false)}
              >
                <WhiteBold>Close</WhiteBold>
              </TouchableOpacity>
            </XStack>
          </View>
        </BlurView>
      </Modal>
    </YStack>
  );
};
export default Form;
