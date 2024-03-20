import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Modal, Animated } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonText, Card, Text, XStack, YStack } from "tamagui";
import { colors, fontSizes } from "~/app/styles";
import MenuBar from "~/app/components/MenuBar";
import { url } from "~/env";
import * as SecureStore from "expo-secure-store";
import dayjs from "dayjs";
import LottieView from "lottie-react-native";
import { BlurView } from "expo-blur";

export default function Page() {
  const [activeTab, setActiveTab] = useState("PENDING");

  const token = SecureStore.getItem("token");

  const [clinicId, setClinicId] = useState<number>();
  const [dateOfApp, setDateOfApp] = useState("");

  const [loading, setLoading] = useState(true);
  const [appData, setAppData] = useState([]);

  const [successApps, setSuccessApps] = useState<any>([]);
  const [pendingApps, setPendingApps] = useState<any>([]);

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setTimeout(() => {
      setModalVisible(false);
    }, 4000);
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  //USE YOUR OWN URL!!
  useEffect(() => {
    // Axios GET request to fetch doctors data
    axios
      .get(
        `${url}viewAppointments?token=${token}&visitDate=&clinicId=0&patientId=0&doctorId=0&appointmentId=0&followupDate`,
      )
      .then((res) => {
        //console.log('Response:', JSON.stringify(res.data.data, null, 2));
        setAppData(res.data.data.appointments);
        //console.log('Response Appointment Data:', JSON.stringify(appData, null, 2));sssssssss

        res.data.data.appointments.map((item: any) => {
          if (
            !successApps.some((app: any) => app.id === item.id) &&
            item.status === 1
          ) {
            successApps.push(item);
          } else if (
            !pendingApps.some((app: any) => app.id === item.id) &&
            item.status !== 1
          ) {
            pendingApps.push(item);
          }
        });

        console.log("Pending Apps:", JSON.stringify(pendingApps, null, 2));
        console.log("Successfull Apps:", JSON.stringify(successApps, null, 2));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Succ/Pen Appointments:", error);
      });
  }, []);

  const goToHisory = (val: string) => {
    SecureStore.setItem("patientId", val);
    router.push("/patientHistory");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
      }}
    >
      {/* Title Bar */}
      <MenuBar title="Upcoming Follow-ups" />

      {/* Tab Bar */}

      {/* Content */}
      <YStack gap={10} flex={1}>
        <FlatList
          horizontal={false}
          decelerationRate="normal"
          data={successApps}
          //keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }) => (
            <Card
              marginBottom={10}
              padded
              gap={10}
              width={"100%"}
              flexDirection="column"
              backgroundColor={colors.white}
            >
              <XStack gap={5}>
                <Text fontFamily={"ArialB"} fontSize={16} color={colors.yellow}>
                  Patient Name:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={16}
                  color={colors.primary}
                >
                  {item.patientName}
                </Text>
              </XStack>
              <XStack gap={5}>
                <Text fontFamily={"ArialB"} fontSize={16} color={colors.yellow}>
                  Follow-up Date:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={16}
                  color={colors.primary}
                >
                  {dayjs(item.followupDate).format("DD-MMM-YYYY")}
                </Text>
              </XStack>
              <XStack gap={5}>
                <Text fontFamily={"ArialB"} fontSize={16} color={colors.yellow}>
                  Doctor Name:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={16}
                  color={colors.primary}
                >
                  {item.doctorName}
                </Text>
              </XStack>
              <XStack gap={5}>
                <Text fontFamily={"ArialB"} fontSize={16} color={colors.yellow}>
                  Clinic Name:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={16}
                  color={colors.primary}
                >
                  {item.clinicName}
                </Text>
              </XStack>
              <XStack gap={5}>
                <Text fontFamily={"ArialB"} fontSize={16} color={colors.yellow}>
                  Prescription:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={16}
                  color={colors.primary}
                >
                  {item.prescription}
                </Text>
              </XStack>
              <XStack gap={5}>
                <Text fontFamily={"ArialB"} fontSize={16} color={colors.yellow}>
                  Diagnosis:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={16}
                  color={colors.primary}
                >
                  {item.diagnosis}
                </Text>
              </XStack>
              <XStack gap={5}>
                <Text fontFamily={"ArialB"} fontSize={16} color={colors.yellow}>
                  Weight:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={16}
                  color={colors.primary}
                >
                  {item.weight}
                </Text>
              </XStack>
              <XStack gap={5}>
                <Text fontFamily={"ArialB"} fontSize={16} color={colors.yellow}>
                  BP:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={16}
                  color={colors.primary}
                >
                  {item.bloodPressure}
                </Text>
              </XStack>
              <XStack gap={5}>
                <Text fontFamily={"ArialB"} fontSize={16} color={colors.yellow}>
                  Charges:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={16}
                  color={colors.primary}
                >
                  {item.charges}
                </Text>
              </XStack>
              <XStack gap={10}>
                <Button
                  onPress={() => goToHisory(item.patientId.toString())}
                  flex={1}
                  backgroundColor={colors.primary}
                >
                  <ButtonText
                    fontFamily={"ArialB"}
                    fontSize={16}
                    color={colors.white}
                  >
                    Patient History
                  </ButtonText>
                </Button>
              </XStack>
            </Card>
          )}
        />
        <Button title="Open Modal" onPress={toggleModal}>
          <ButtonText>Open Modal</ButtonText>
        </Button>
      </YStack>
      <CustomModal visible={modalVisible} onClose={toggleModal} />
    </SafeAreaView>
  );
}

const CustomModal = ({ visible, onClose }) => {
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
            speed={0.5}
            autoPlay
            loop={false}
            style={{
              width: 200,
              height: 200,
            }}
            source={require("~/assets/Success.json")}
          />
          <Text
            color={colors.primary}
            fontFamily={"ArialB"}
            fontSize={fontSizes.XL}
          >
            Success
          </Text>
          <Text
            color={colors.yellow}
            fontFamily={"ArialB"}
            fontSize={fontSizes.SM}
          >
            Appointment Booked Successfully
          </Text>
          <Button
            width={"80%"}
            title="Close"
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

const styles = {
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tabBar: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTabItem: {
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: colors.yellow,
  },
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