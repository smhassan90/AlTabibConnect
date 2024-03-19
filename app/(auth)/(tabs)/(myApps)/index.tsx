import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonText, Card, Text, XStack, YStack } from "tamagui";
import { buttons, colors, fontSizes } from "~/app/styles";
import MenuBar from "~/app/components/MenuBar";
import { url } from "~/env";
import * as SecureStore from "expo-secure-store";
import dayjs from "dayjs";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { BlurView } from "expo-blur";

export default function Page() {
  const [date, setDate] = useState<DateType>(dayjs());
  const [isModalVisible, setIsModalVisible] = useState(false);

  const currDate = date ? dayjs(date).format("YYYY-MM-DD") : "Date of Birth";

  const [activeTab, setActiveTab] = useState("PENDING");

  const token = SecureStore.getItem("token");

  const [loading, setLoading] = useState(false);
  const [appData, setAppData] = useState([]);

  const [successApps, setSuccessApps] = useState<any>([]);
  const [pendingApps, setPendingApps] = useState<any>([]);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  //USE YOUR OWN URL!!
  useEffect(() => {
    // Axios GET request to fetch doctors data
    setLoading(true);
    axios
      .get(
        `${url}viewAppointments?token=${token}&visitDate=${currDate}&clinicId=0&patientId=0&doctorId=0&appointmentId=0&followupDate`,
      )
      .then((res) => {
        console.log("Date Chosen:", currDate);
        console.log("Response:", JSON.stringify(res.data.data, null, 2));
        setAppData(res.data.data.appointments);

        const successAppsArray: any[] = [];
        const pendingAppsArray: any[] = [];

        res.data.data.appointments.forEach((item: any) => {
          if (item.status === 1) {
            // Replace existing items in successApps array with new items
            successAppsArray.push(item);
          } else {
            // Replace existing items in pendingApps array with new items
            pendingAppsArray.push(item);
          }
        });

        setSuccessApps(successAppsArray);
        setPendingApps(pendingAppsArray);

        console.log("Pending Apps:", JSON.stringify(pendingApps, null, 2));
        console.log("Successfull Apps:", JSON.stringify(successApps, null, 2));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Succ/Pen Appointments:", error);
      });
  }, [currDate]);

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
      <MenuBar title="Your Appointments" />

      {/* Content */}
      <YStack gap={10} flex={1}>
        <TouchableOpacity
          style={[buttons.secBtn]}
          onPress={() => setIsModalVisible(true)}
        >
          <Text color={"white"} fontFamily={"ArialB"}>
            {date ? dayjs(date).format("MMMM DD, YYYY") : "Date of Birth"}
          </Text>
        </TouchableOpacity>
        <View style={tabStyles.tabBar}>
          <TouchableOpacity
            style={[
              tabStyles.tabItem,
              activeTab === "PENDING" && tabStyles.activeTabItem,
            ]}
            onPress={() => handleTabPress("PENDING")}
          >
            <Text fontFamily={"ArialB"} fontSize={18} color={colors.yellow}>
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tabStyles.tabItem,
              activeTab === "SUCCESSFUL" && tabStyles.activeTabItem,
            ]}
            onPress={() => handleTabPress("SUCCESSFUL")}
          >
            <Text fontFamily={"ArialB"} fontSize={18} color={colors.yellow}>
              Successful
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === "PENDING" && pendingApps.length === 0 && (
          <YStack alignItems="center" flex={1} justifyContent="center">
            <Text
              textAlign="center"
              fontFamily={"ArialB"}
              fontSize={fontSizes.M}
              color={"white"}
            >
              No appointments for this day
            </Text>
          </YStack>
        )}
        {activeTab === "SUCCESSFUL" && successApps.length === 0 && (
          <YStack alignItems="center" flex={1} justifyContent="center">
            <Text
              textAlign="center"
              fontFamily={"ArialB"}
              fontSize={fontSizes.M}
              color={"white"}
            >
              No completed appointments on this day
            </Text>
          </YStack>
        )}
        {activeTab === "PENDING" ? (
          <FlatList
            horizontal={false}
            decelerationRate="normal"
            data={pendingApps}
            //keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item }) => (
              <>
                <Card
                  marginBottom={10}
                  padded
                  gap={10}
                  width={"100%"}
                  flexDirection="column"
                  backgroundColor={colors.white}
                >
                  <XStack gap={5}>
                    <Text
                      fontFamily={"ArialB"}
                      fontSize={16}
                      color={colors.yellow}
                    >
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
                    <Text
                      fontFamily={"ArialB"}
                      fontSize={16}
                      color={colors.yellow}
                    >
                      Appointment Token:
                    </Text>
                    <Text
                      fontFamily={"ArialB"}
                      fontSize={16}
                      color={colors.primary}
                    >
                      {item.tokenNumber}
                    </Text>
                  </XStack>
                  <XStack gap={5}>
                    <Text
                      fontFamily={"ArialB"}
                      fontSize={16}
                      color={colors.yellow}
                    >
                      Appointment Date:
                    </Text>
                    <Text
                      fontFamily={"ArialB"}
                      fontSize={16}
                      color={colors.primary}
                    >
                      {dayjs(item.visitDate).format("DD-MMM-YYYY")}
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
              </>
            )}
          />
        ) : (
          <FlatList
            style={{ width: "100%" }}
            refreshing={true}
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
                  <Text
                    fontFamily={"ArialB"}
                    fontSize={16}
                    color={colors.yellow}
                  >
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
                  <Text
                    fontFamily={"ArialB"}
                    fontSize={16}
                    color={colors.yellow}
                  >
                    Appointment Token:
                  </Text>
                  <Text
                    fontFamily={"ArialB"}
                    fontSize={16}
                    color={colors.primary}
                  >
                    {item.tokenNumber}
                  </Text>
                </XStack>
                <XStack gap={5}>
                  <Text
                    fontFamily={"ArialB"}
                    fontSize={16}
                    color={colors.yellow}
                  >
                    Doctor:
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
                  <Text
                    fontFamily={"ArialB"}
                    fontSize={16}
                    color={colors.yellow}
                  >
                    Clinic:
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
                  <Text
                    fontFamily={"ArialB"}
                    fontSize={16}
                    color={colors.yellow}
                  >
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
                <XStack gap={10}>
                  <Button
                    onPress={() => goToHisory(item.patientId.toString())}
                    flex={1}
                    backgroundColor={colors.primary}
                  >
                    <ButtonText
                      fontFamily={"ArialB"}
                      fontSize={14}
                      color={colors.white}
                    >
                      Patient History
                    </ButtonText>
                  </Button>
                </XStack>
              </Card>
            )}
          />
          

        )}
        
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
                  <Text color={"white"} fontFamily={"ArialB"}>
                    Close
                  </Text>
                </TouchableOpacity>
              </XStack>
            </View>
          </BlurView>
        </Modal>
      </YStack>
    </SafeAreaView>
  );
}

const tabStyles = {
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
};
