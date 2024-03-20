import { AntDesign, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Modal, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import {
  Button,
  ButtonText,
  Card,
  Separator,
  Text,
  XStack,
  YStack,
} from "tamagui";
import GenderPick from "~/app/components/GenderPick";
import MenuBar from "~/app/components/MenuBar";
import { buttons, colors, fontSizes } from "~/app/styles";
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

const Page = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [token, setToken] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalErrVisible, setModalErrVisible] = useState(false);

  const toggleErrModal = () => {
    setModalErrVisible(!modalErrVisible);
    setTimeout(() => {
      setModalErrVisible(false);
    }, 3000);
  };

  tokenCache.getToken("token").then((token) => {
    setToken(token as string);
  });

  const [date, setDate] = useState<DateType>(dayjs());
  const [isModalVisible, setIsModalVisible] = useState(false);

  const currDate = date ? dayjs(date).format("YYYY-MM-DD") : "Date of Birth";

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
    if (!validateSubmit(name, gender, currDate)) {
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
    dob: `${currDate}`,
  };

  const encodedPatient = encodeURIComponent(JSON.stringify(patient));

  const loginUrl = `${url}addPatient?token=${token}&patient=${encodedPatient}`;

  const addPatientData = () => {
    axios
      .get(loginUrl)
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
          // Dialog.show({
          //   type: ALERT_TYPE.SUCCESS,
          //   title: "Family member added",
          //   textBody: "Your family member was added successfully!",
          // });
          // setTimeout(() => {
          //   Dialog.hide();
          //   router.push("/(auth)/(tabs)/(family)/");
          // }, 2000);
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
    <SafeAreaView
      style={{
        backgroundColor: colors.primary,
        flex: 1,
        paddingHorizontal: 10,
      }}
    >
      <MenuBar title="Add Family Member" />
      <AlertNotificationRoot>
        <Card
          unstyled
          justifyContent="center"
          width={"100%"}
          padding={10}
          gap={15}
          flex={1}
          alignItems="center"
          //backgroundColor={"#eeeeee"}
        >
          <Text
            fontFamily={"ArialB"}
            fontSize={fontSizes.L}
            color={colors.white}
          >
            Please fill out the details
          </Text>
          <YStack
            justifyContent="center"
            borderRadius={10}
            padding={15}
            backgroundColor={"white"}
            gap={15}
            width={"100%"}
          >
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
              gap={10}
              backgroundColor={"white"}
              borderRadius={5}
              padding={10}
              alignItems="center"
            >
              <AntDesign name="calendar" size={24} color={colors.primary} />
              <Separator
                alignSelf="stretch"
                vertical
                borderColor={"lightgray"}
              />

              {/* DATE PICKER */}

              <TouchableOpacity
                style={[buttons.primaryBtn, { flex: 1 }]}
                onPress={() => setIsModalVisible(true)}
              >
                <Text color={colors.white} fontFamily={"ArialB"}>
                  {date ? dayjs(date).format("MMMM DD, YYYY") : "Date of Birth"}
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
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10,
                    gap: 10,
                  }}
                >
                  <DateTimePicker
                    dayContainerStyle={{
                      borderWidth: 2,
                      borderRadius: 10,
                      borderColor: "#f3f3f3",
                    }}
                    headerButtonStyle={{
                      backgroundColor: "white",
                      borderRadius: 7,
                    }}
                    headerContainerStyle={{
                      paddingHorizontal: 5,
                      backgroundColor: "#0066a1",
                      borderRadius: 10,
                    }}
                    headerTextStyle={{
                      color: "white",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                    displayFullDays={true}
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
                      <Text color={colors.white} fontFamily={"ArialB"}>
                        Close
                      </Text>
                    </TouchableOpacity>
                  </XStack>
                </View>
              </BlurView>
            </Modal>
          </YStack>
        </Card>
      </AlertNotificationRoot>
      <CustomModal visible={modalVisible} onClose={toggleModal} type="1" />
      <CustomModal
        visible={modalErrVisible}
        onClose={toggleErrModal}
        type="2"
      />
    </SafeAreaView>
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
        <View style={styles.modalContent}>
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
              : "Something Went Wrong!"}
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
