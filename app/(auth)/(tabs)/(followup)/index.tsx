import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { RefreshControl, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Card, Text, XStack, YStack } from "tamagui";
import {
  colors,
  fontSizes,
  paddingL,
  paddingM,
  spacingPrim,
  spacingS,
} from "~/app/styles";
import MenuBar from "~/app/components/MenuBar";
import { url } from "~/env";
import * as SecureStore from "expo-secure-store";
import dayjs from "dayjs";
import Header from "~/app/components/ParentView";
import { PrimBtn } from "~/app/components/CusButtons";

export default function Page() {
  const [activeTab, setActiveTab] = useState("PENDING");

  const [refresh, setRefresh] = useState(false);

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
    if (!refresh) {
      axios
        .get(
          `${url}viewAppointments?token=${token}&visitDate=&clinicId=1&patientId=0&doctorId=2&appointmentId=0&followupDate`,
        )
        .then((res) => {
          console.log("FOLLOWUP RES:", JSON.stringify(res.data, null, 2));
          //console.log('Response:', JSON.stringify(res.data.data, null, 2));
          setAppData(res.data.data.appointments);
          //console.log('Response Appointment Data:', JSON.stringify(appData, null, 2));

          res.data.data.appointments.map((item: any) => {
            if (
              !successApps.some((app: any) => app.id === item.id) &&
              item.status === 1
            ) {
              setSuccessApps((prevSuccessApps: {}) => [
                ...prevSuccessApps,
                item,
              ]);
            } else if (
              !pendingApps.some((app: any) => app.id === item.id) &&
              item.status !== 1
            ) {
              setPendingApps((prevPendingApps: {}) => [
                ...prevPendingApps,
                item,
              ]);
            }
          });

          console.log("Pending Apps:", JSON.stringify(pendingApps, null, 2));
          console.log(
            "Successfull Apps:",
            JSON.stringify(successApps, null, 2),
          );
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching Succ/Pen Appointments:", error);
        });
    }
    setRefresh(false);
  }, [refresh]);

  const goToHisory = (val: string) => {
    SecureStore.setItem("patientId", val);
    router.push("/(auth)/(tabs)/(family)/getHistory");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      {/* Title Bar */}
      <Header>
        <MenuBar title="My Follow-Ups" />
      </Header>

      {/* Tab Bar */}

      {/* Content */}
      <YStack
        paddingTop={paddingM}
        gap={spacingPrim}
        flex={1}
        marginHorizontal={spacingPrim}
      >
        <FlatList
          horizontal={false}
          decelerationRate="normal"
          data={successApps}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => setRefresh(true)}
              colors={[colors.yellow]}
              tintColor={colors.white}
            />
          }
          //keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }) => (
            <Card
              paddingTop={paddingM}
              marginBottom={paddingM}
              padding={paddingL}
              gap={spacingPrim}
              width={"100%"}
              flexDirection="column"
              backgroundColor={colors.white}
            >
              <XStack gap={spacingS}>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.yellow}
                >
                  Patient Name:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.primary}
                >
                  {item.patientName}
                </Text>
              </XStack>
              <XStack gap={spacingS}>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.yellow}
                >
                  Follow-up Date:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.primary}
                >
                  {dayjs(item.followupDate).format("DD MMM YYYY")}
                </Text>
              </XStack>
              <XStack gap={spacingS}>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.yellow}
                >
                  Doctor Name:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.primary}
                >
                  {item.doctorName}
                </Text>
              </XStack>
              <XStack gap={spacingS}>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.yellow}
                >
                  Clinic Name:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.primary}
                >
                  {item.clinicName}
                </Text>
              </XStack>
              <XStack gap={spacingS}>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.yellow}
                >
                  Prescription:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.primary}
                >
                  {item.prescription}
                </Text>
              </XStack>
              <XStack gap={spacingS}>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.yellow}
                >
                  Diagnosis:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.primary}
                >
                  {item.diagnosis}
                </Text>
              </XStack>
              <XStack gap={spacingS}>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.yellow}
                >
                  Weight:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.primary}
                >
                  {item.weight}
                </Text>
              </XStack>
              <XStack gap={spacingS}>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.yellow}
                >
                  BP:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.primary}
                >
                  {item.bloodPressure}
                </Text>
              </XStack>
              <XStack gap={spacingS}>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.yellow}
                >
                  Charges:
                </Text>
                <Text
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                  color={colors.primary}
                >
                  {item.charges}
                </Text>
              </XStack>
              <XStack gap={10}>
                {/* <Button
                  onPress={() => goToHisory(item.patientId.toString())}
                  flex={1}
                  backgroundColor={colors.primary}
                >
                  <ButtonText
                    fontFamily={"ArialB"}
                    fontSize={fontSizes.SM}
                    color={colors.white}
                  >
                    Patient History
                  </ButtonText>
                </Button> */}
                <PrimBtn onPress={() => goToHisory(item.patientId.toString())}>
                  Patient History
                </PrimBtn>
              </XStack>
            </Card>
          )}
        />
      </YStack>
    </View>
  );
}

const styles = {
  cardText: {
    fontSize: fontSizes.SM,
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
