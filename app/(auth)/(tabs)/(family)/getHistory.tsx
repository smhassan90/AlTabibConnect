import React, { useEffect, useState } from "react";
import MenuBar from "~/app/components/MenuBar";
import {
  colors,
  fontSizes,
  paddingL,
  paddingM,
  spacingPrim,
  spacingS,
} from "~/app/styles";
import { Card, Text, View, XStack, YStack } from "tamagui";
import axios from "axios";
import { url } from "~/env";
import * as SecureStore from "expo-secure-store";
import dayjs from "dayjs";
import Header from "~/app/components/ParentView";
import { FlatList, RefreshControl } from "react-native";

const Page = () => {
  const token = SecureStore.getItem("token");
  const patientId = SecureStore.getItem("patientId");
  const doctorId = SecureStore.getItem("doctorId");

  const [empty, setEmpty] = useState(true);

  const [refresh, setRefresh] = useState(false);

  const [history, setHistory] = useState([]);

  const fetchHistory = () => {
    axios
      .get(
        `${url}getPatientHistory?token=${token}&patientId=${patientId}&doctorId=0`,
      )
      .then((res) => {
        console.log(
          "GET HISTORY RESPONSE: ",
          JSON.stringify(res.data, null, 2),
        );

        {
          res.data.data.appointments.length > 0
            ? setEmpty(false)
            : setEmpty(true);
        }

        setHistory(res.data.data.appointments);
      })
      .catch((err) => {
        console.log("ERROR FETCHING HISTORY:", err);
        console.log("patientId Async:", patientId);
        console.log("doctorId Async:", doctorId);
      });
  };

  useEffect(() => {
    console.log("=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
    console.log("LOCAL TOKEN:", token);
    console.log("LOCAL PID:,", patientId);
    console.log("LOCAL DOC ID:", doctorId);
    fetchHistory();
  }, []);

  return (
    <View backgroundColor={colors.primary} flex={1}>
      <Header>
        <MenuBar title="Patient History" />
      </Header>

      {empty ? (
        <YStack position="absolute" alignSelf="center" top={"50%"}>
          <Text color={colors.white} fontSize={20} fontFamily={"ArialB"}>
            No History Found
          </Text>
        </YStack>
      ) : (
        <YStack padding={paddingM} gap={spacingPrim}>
          <FlatList
            horizontal={false}
            decelerationRate="normal"
            data={history}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={() => setRefresh(true)}
                colors={[colors.yellow]}
                tintColor={colors.white}
              />
            }
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
              </Card>
            )}
          />
        </YStack>
      )}
    </View>
  );
};

export default Page;
