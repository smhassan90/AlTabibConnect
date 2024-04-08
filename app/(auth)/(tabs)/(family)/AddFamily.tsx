import { AntDesign, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Modal, Platform, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import {
  Button,
  ButtonText,
  Card,
  Separator,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";
import GenderPick from "~/app/components/GenderPick";
import MenuBar from "~/app/components/MenuBar";
import { buttons, colors, fontSizes, spacingPrim } from "~/app/styles";
import { useState } from "react";
import dayjs from "dayjs";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";
import { router } from "expo-router";
import axios from "axios";
import { url } from "~/env";
import { tokenCache } from "~/app/getToken";
import LottieView from "lottie-react-native";
import Header from "~/app/components/ParentView";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const Page = () => {
  const [date, setDate] = useState(new Date());
  const formatDate = dayjs(date).format("YYYY-MM-DD");

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [token, setToken] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalErrVisible, setModalErrVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const handleDate = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const toggleErrModal = () => {
    setModalErrVisible(!modalErrVisible);
    setTimeout(() => {
      setModalErrVisible(false);
    }, 3000);
  };

  tokenCache.getToken("token").then((token) => {
    setToken(token as string);
  });

  const isEmptyString = (str: string) => str.trim() === "";

  const emptyFields = (name: string, gender: string, date: string) =>
    ![name, gender, date].some(isEmptyString);

  const validateSubmit = (name: string, gender: string, date: string) =>
    emptyFields(name, gender, date);

  const handleGenderChange = (selectedGender: string) =>
    setGender(selectedGender);
  const handleNameChange = (name: string) => setName(name);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setTimeout(() => {
      setModalVisible(false);
      router.push("/(auth)/(tabs)/(family)/");
    }, 5000);
  };

  const handleSubmit = () => {
    if (!validateSubmit(name, gender, formatDate)) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Please fill all details correctly",
        button: "Close",
      });
    } else {
      addPatientData();
    }
  };

  const patient = {
    id: 1,
    name: `${name}`,
    gender: `${gender}`,
    dob: `${formatDate}`,
  };

  const encodedPatient = encodeURIComponent(JSON.stringify(patient));

  const addPUrl = `${url}addPatient?token=${token}&patient=${encodedPatient}`;

  const addPatientData = () => {
    axios
      .get(addPUrl)
      .then((response) => {
        if (response.status === 200) {
          console.log(
            "RESPONSE STATUS: ",
            JSON.stringify(response.status, null, 2),
          );
          console.log(
            "TOKEN: ",
            JSON.stringify(response.data.data.token, null, 2),
          );
          toggleModal();
        } else {
          toggleErrModal();
          console.log("Error, Status code: ", response.status);
        }
      })
      .catch((error) => {
        if (error.response) {
          toggleErrModal();
          // console.error("Server Error:", error.response.data);
          // console.error("Status Code:", error.response.status);
          // console.error("Headers:", error.response.headers);
        } else if (error.request) {
          toggleErrModal();

          // console.error("No response received:", error.request);
        } else {
          toggleErrModal();

          // console.error("Request Error:", error.message);
        }
      })
      .finally(() => {});
  };

  return (
    <View flex={1} backgroundColor={colors.primary}>
      <Header>
        <MenuBar title="Add Family Member" />
      </Header>
      <View flex={1}>
        <Card
          top={"5%"}
          unstyled
          width={"100%"}
          padding={spacingPrim}
          alignItems="center"
        >
          <YStack
            justifyContent="center"
            borderRadius={spacingPrim}
            padding={spacingPrim}
            backgroundColor={"white"}
            gap={spacingPrim}
            width={"100%"}
          >
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
                placeholder="Enter Name"
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
              <Separator
                alignSelf="stretch"
                vertical
                borderColor={"lightgray"}
              />

              {/* DATE PICKER */}

              {showPicker && (
                <RNDateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={handleDate}
                />
              )}

              <TouchableOpacity
                style={[buttons.primaryBtn, { flex: 1 }]}
                onPress={() => setShowPicker(!showPicker)}
              >
                <Text color={colors.white} fontFamily={"ArialB"}>
                  {date ? dayjs(date).format("MMMM DD, YYYY") : "Date of Birth"}
                </Text>
              </TouchableOpacity>
            </XStack>
            <XStack
              zIndex={100}
              borderColor={"#ebebeb"}
              borderWidth={1}
              gap={spacingPrim}
              backgroundColor={"white"}
              ai="center"
              borderRadius={5}
              padding={spacingPrim}
            >
              <Ionicons name="male-female" size={24} color={colors.primary} />
              <Separator als={"stretch"} vertical borderColor={"lightgray"} />
              <GenderPick
                genvalue={gender}
                onGenderChange={handleGenderChange}
              />
            </XStack>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[buttons.primaryBtn]}
            >
              <Text color={colors.white} fontFamily={"ArialB"}>
                Add
              </Text>
            </TouchableOpacity>
            {/* MODAL */}
          </YStack>
        </Card>
      </View>
      <CustomModal visible={modalVisible} onClose={toggleModal} type="1" />
      <CustomModal
        visible={modalErrVisible}
        onClose={toggleErrModal}
        type="2"
      />
    </View>
  );
};

const CustomModal = ({ visible, onClose, type }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
    >
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        style={{
          flexDirection: "column",
          padding: 15,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          width={"90%"}
          alignItems={"center"}
          backgroundColor={"white"}
          paddingBottom={20}
          borderRadius={10}
          gap={20}
        >
          <LottieView
            speed={type == "1" ? 0.5 : 2.0}
            autoPlay
            loop={false}
            style={{
              width: 200,
              height: 200,
            }}
            source={
              type == "1"
                ? require("~/assets/Success.json")
                : require("~/assets/Error.json")
            }
          />
          <Text
            color={colors.primary}
            fontFamily={"ArialB"}
            fontSize={fontSizes.XL}
          >
            {type == "1" ? "Success" : "Error"}
          </Text>
          <Text
            color={colors.yellow}
            fontFamily={"ArialB"}
            fontSize={fontSizes.SM}
          >
            {type == "1"
              ? "Family Member Added Successfully"
              : "Error Adding Family member"}
          </Text>
          <Button
            width={"80%"}
            onPress={onClose}
            backgroundColor={colors.primary}
          >
            <ButtonText>Close</ButtonText>
          </Button>
        </View>
      </BlurView>
    </Modal>
  );
};

export default Page;

const styles = {
  blurView: {
    padding: 15,
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 20,
    borderRadius: 10,
    gap: 20,
  },
};
