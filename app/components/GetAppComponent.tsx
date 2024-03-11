import { Platform, ToastAndroid, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Card, Text, XStack } from "tamagui";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { Dimensions } from "react-native";
import { FontColors, fonts, themeColors } from "../constants";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { url } from "~/env";
import MenuBar from "./MenuBar";
import { colors, fontSizes } from "../styles";
import { tokenCache } from "../getToken";

dayjs.locale("en");

const cardWidth = Dimensions.get("window").width - 30;

const GetAppComponent = () => {

  const [token, setToken] = useState("");

  tokenCache.getToken("token").then((token) => {
    setToken(token as string);
  });

  const data = useSelector((state: any) => state.appointments);

  const patientRedux = useSelector((state: any) => state.patients);

  //WHOLE DOC LIST
  const docs = data[data.length - 1].doc;

  const docId = data[data.length - 1].doc.id;
  const docName = data[data.length - 1].doc.name;
  const clinicName =
    docs.doctorClinicDALS[docs.doctorClinicDALS.length - 1].clinic.name;
  const clinicId =
    docs.doctorClinicDALS[docs.doctorClinicDALS.length - 1].clinic.id;
  const patient = patientRedux[0];
  const patientId = patientRedux[0].id;

  console.log("User Token: ", token);
  console.log("-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=");
  console.log("Doctor ID: ", docId);
  console.log("Doctor Name: ", docName);
  console.log("-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=");
  console.log("Clinic Id: ", clinicId);
  console.log("Clinic Name: ", clinicName);
  console.log("-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=");
  console.log("Patient ID: ", patient.id);
  console.log("Patient Name: ", patient.name);
  console.log("-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=");

  const uri = url;

  const dispactBooked = () => {
    axios
      .get(
        `${uri}setAppointment?token=${token}&doctorId=${docId}&clinicId=${clinicId}&patientId=${patientId}&visitDate=2024-02-26`,
      )
      .then((res) => {
        console.log("Appointment Booked: ", res.data);
      })
      .catch((error) => {
        console.error("Error setting appointment: ", error);
      });
    {
      Platform.OS === "ios"
        ? alert("Appointment Booked")
        : ToastAndroid.show("Appointment Booked", ToastAndroid.LONG);
    }
    setTimeout(() => {
      router.push("/(auth)/(tabs)/(home)/");
    }, 2000);
  };

  const cancelBooking = () => {
    setTimeout(() => {
      router.push("/(auth)/(tabs)/(home)/SetAppointment");
    }, 2000);
  };

  return (
    <>
      <MenuBar title="Confirm Appointment" />
      <Card
        width={cardWidth}
        padding={10}
        gap={15}
        marginBottom={10}
        backgroundColor={"white"}
        overflow="scroll"
      >
        <XStack gap={5}>
          <Text
            color={colors.yellow}
            fontFamily={"ArialB"}
            fontSize={fontSizes.SM}
          >
            Date:
          </Text>
          <Text
            color={colors.primary}
            fontFamily={"ArialB"}
            fontSize={fontSizes.SM}
          >
            {dayjs().format("D-MMM-YYYY")}
          </Text>
        </XStack>
        <XStack gap={5}>
          <Text
            color={colors.yellow}
            fontFamily={"ArialB"}
            fontSize={fontSizes.SM}
          >
            Doctor Name:
          </Text>
          <Text
            color={colors.primary}
            fontFamily={"ArialB"}
            fontSize={fontSizes.SM}
          >
            {docName}
          </Text>
        </XStack>
        <XStack gap={5}>
          <Text
            color={colors.yellow}
            fontFamily={"ArialB"}
            fontSize={fontSizes.SM}
          >
            Qualification:
          </Text>
          {/* {docs.qualifications.map((item: any) => (
                    <Text
            color={colors.primary}
            fontFamily={"ArialB"}
            fontSize={fontSizes.SM}
          >{item.name}</Text>
        ))} */}
        </XStack>
        <XStack gap={5}>
          <Text
            color={colors.yellow}
            fontFamily={"ArialB"}
            fontSize={fontSizes.SM}
          >
            Clinic Name:
          </Text>
          <Text
            color={colors.primary}
            fontFamily={"ArialB"}
            fontSize={fontSizes.SM}
          >
            {clinicName}
          </Text>
        </XStack>
        <XStack gap={5}>
          <Text
            color={colors.yellow}
            fontFamily={"ArialB"}
            fontSize={fontSizes.SM}
          >
            Patient Name:
          </Text>
          <Text
            color={colors.primary}
            fontFamily={"ArialB"}
            fontSize={fontSizes.SM}
          >
            {patient.name}
          </Text>
        </XStack>
        <XStack gap={5} justifyContent="space-between">
          <TouchableOpacity
            onPress={() => cancelBooking()}
            style={[
              themeColors.yellow,
              {
                borderRadius: 7,
                padding: 10,
                flex: 1,
                alignItems: "center",
              },
            ]}
          >
            <Text style={[FontColors.whiteFont, fonts.normal]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispactBooked()}
            style={[
              themeColors.blue,
              {
                borderRadius: 7,
                padding: 10,
                flex: 1,
                alignItems: "center",
              },
            ]}
          >
            <Text style={[FontColors.whiteFont, fonts.normal]}>
              Get Appointment
            </Text>
          </TouchableOpacity>
        </XStack>
      </Card>
    </>
  );
};
export default GetAppComponent;
