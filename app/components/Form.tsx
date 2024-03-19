import {
  Dimensions,
  Keyboard,
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
import { Link, router } from "expo-router";
import { YStack } from "tamagui";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import GenderPick from "./GenderPick";
import axios from "axios";
import * as Progress from "react-native-progress";
import { buttons, colors, fontSizes, fontsFams } from "../styles";
import { BlurView } from "expo-blur";
import { url } from "~/env";
import { useDispatch } from "react-redux";
import { addToken } from "../context/actions/tokenActions";
import { tokenCache } from "../getToken";

const screenwidth = Dimensions.get("screen").width;

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
  const loginUrl = `${url}registerPatient?patient=${encodedPatient}&uuid=123&type=2`;

  const fetchRegisterData = () => {
    axios
      .get(loginUrl)
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
                router.replace("/LoginScreen");
                setLoading(false);
              }, 2000);
            })
            .catch((error: any) => {
              console.error("Error storing token: ", error);
            });
          setLoading(false);
        } else {
          console.log("Error, Status code: ", response.status);
          setLoading(false);
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <YStack
      justifyContent="center"
      borderRadius={10}
      padding={15}
      backgroundColor={"white"}
      gap={15}
      width={"100%"}
    >
      {loading
        ? (Keyboard.dismiss(),
          (
            <View
              style={{
                borderColor: "lightgray",
                borderRadius: 10,
                borderWidth: 2,
                alignSelf: "center",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                zIndex: 1000,
                gap: 20,
                height: screenwidth * 0.75,
                width: screenwidth * 0.75,
              }}
            >
              <Text style={[fonts.headingSmall, FontColors.primaryFont]}>
                Logging In
              </Text>
              <Progress.CircleSnail
                thickness={7}
                size={100}
                color={["#0ab99c", "#0044ff", "#ffa600"]}
              />
            </View>
          ))
        : null}
      <XStack
        borderColor={"#ebebeb"}
        borderWidth={1}
        borderRadius={5}
        gap={10}
        backgroundColor={"white"}
        padding={10}
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
        gap={10}
        backgroundColor={"white"}
        borderRadius={5}
        padding={10}
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
        gap={10}
        backgroundColor={"white"}
        borderRadius={5}
        padding={10}
        alignItems="center"
      >
        <AntDesign name="calendar" size={24} color={colors.primary} />
        <Separator alignSelf="stretch" vertical borderColor={"lightgray"} />

        {/* DATE PICKER */}

        <TouchableOpacity
          style={[buttons.primaryBtn, { flex: 1 }]}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={{ color: "white", fontFamily: "ArialB" }}>
            {date ? dayjs(date).format("MMMM DD, YYYY") : "Choose Date"}
          </Text>
        </TouchableOpacity>
      </XStack>
      <XStack
        borderColor={"#ebebeb"}
        borderWidth={1}
        zIndex={100}
        gap={10}
        backgroundColor={"white"}
        ai="center"
        borderRadius={5}
        padding={10}
      >
        <Ionicons name="male-female" size={24} color={colors.primary} />
        <Separator als={"stretch"} vertical borderColor={"lightgray"} />
        <GenderPick genvalue={gender} onGenderChange={handleGenderChange} />
      </XStack>
      <XStack
        borderColor={"#ebebeb"}
        borderWidth={1}
        gap={10}
        backgroundColor={"white"}
        borderRadius={5}
        padding={10}
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
        gap={10}
        backgroundColor={"white"}
        borderRadius={5}
        padding={10}
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
        <Text
          style={[
            fonts.sub,
            FontColors.whiteFont,
            { textAlignVertical: "center" },
          ]}
        >
          Register
        </Text>
      </TouchableOpacity>

      <View style={RegLog.onPressStyle}>
        <Text
          style={[
            {
              fontSize: fontSizes.SM,
              fontFamily: fontsFams.ArialB,
              color: colors.primary,
            },
          ]}
        >
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push("/Login")}>
          <Text
            style={[
              {
                fontSize: fontSizes.SM,
                fontFamily: fontsFams.ArialB,
                color: colors.linkBlue,
              },
            ]}
          >
            Login
          </Text>
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
            style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }}
          >
            <DateTimePicker
              dayContainerStyle={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: "#f3f3f3",
              }}
              headerButtonStyle={{ backgroundColor: "white", borderRadius: 7 }}
              headerContainerStyle={{
                paddingHorizontal: 5,
                backgroundColor: "#4E54DA",
                borderRadius: 10,
              }}
              headerTextStyle={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
              headerButtonColor="#4E54DA"
              selectedItemColor="#4E54DA"
              mode="single"
              date={date}
              onChange={(date) => setDate(date.date)}
            />
            <XStack>
              <TouchableOpacity
                style={[buttons.primaryBtn, { flex: 1 }]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={{ color: "white", fontFamily: "ArialB" }}>
                  Close
                </Text>
              </TouchableOpacity>
            </XStack>
          </View>
        </BlurView>
      </Modal>
    </YStack>
  );
};
export default Form;
