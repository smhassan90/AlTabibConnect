import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, RefreshControl } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Card, Text, View, XStack, YStack } from "tamagui";
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
import { WhiteBold } from "~/app/components/CusText";
import { HeartLoader } from "~/app/components/Animations";

export default function Page() {
  const cardWidth = Dimensions.get("window").width - 30;

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

          setTimeout(() => {
            console.log("Pending Apps:", JSON.stringify(pendingApps, null, 2));
            console.log(
              "Successfull Apps:",
              JSON.stringify(successApps, null, 2),
            );
          }, 2000);
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
    <View flex={1} backgroundColor={colors.primary}>
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
        jc={"center"}
      >
        {loading === true ? (
          <View
            gap={10}
            alignItems="center"
            justifyContent="center"
            position="absolute"
            alignSelf="center"
          >
            <WhiteBold>No Follow-ups found</WhiteBold>
          </View>
        ) : (
          <FlatList
            horizontal={false}
            decelerationRate="normal"
            data={pendingApps}
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
                    Appointment Date:
                  </Text>
                  <Text
                    fontFamily={"ArialB"}
                    fontSize={fontSizes.SM}
                    color={colors.primary}
                  >
                    {item.visitDate
                      ? dayjs(item.visitDate).format("D MMM YYYY")
                      : "Pending"}
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
                    {item.followupDate
                      ? dayjs(item.followupDate).format("DD MMM YYYY")
                      : "Pending"}
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
                <XStack gap={10}>
                  <PrimBtn
                    onPress={() => goToHisory(item.patientId.toString())}
                  >
                    Patient History
                  </PrimBtn>
                </XStack>
              </Card>
            )}
          />
        )}
      </YStack>
    </View>
  );
}
