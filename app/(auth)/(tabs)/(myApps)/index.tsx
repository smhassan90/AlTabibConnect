import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonText, Card, Text, XStack, YStack } from "tamagui";
import { colors } from "~/app/styles";
import MenuBar from "~/app/components/MenuBar";
import { url } from "~/env";
import * as SecureStore from "expo-secure-store";
import dayjs from "dayjs";

export default function Page() {
  const [activeTab, setActiveTab] = useState("PENDING");

  const token = SecureStore.getItem("token");

  const [clinicId, setClinicId] = useState<number>();
  const [dateOfApp, setDateOfApp] = useState("");

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
      <MenuBar title="Your Appointments" />

      {/* Tab Bar */}

      {/* Content */}
      <YStack gap={10} flex={1}>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === "PENDING" && styles.activeTabItem,
            ]}
            onPress={() => handleTabPress("PENDING")}
          >
            <Text fontFamily={"ArialB"} fontSize={18} color={colors.yellow}>
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === "SUCCESSFUL" && styles.activeTabItem,
            ]}
            onPress={() => handleTabPress("SUCCESSFUL")}
          >
            <Text fontFamily={"ArialB"} fontSize={18} color={colors.yellow}>
              Successful
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === "PENDING" ? (
            <FlatList
              horizontal={false}
              decelerationRate="normal"
              data={pendingApps}
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
                    backgroundColor={colors.yellow}
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
      </YStack>
    </SafeAreaView>
  );
}

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
};
