import { Platform, ToastAndroid, TouchableOpacity } from "react-native";
import React from "react";
import { Card, Text, XStack } from "tamagui";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { Dimensions } from "react-native";
import { themeColors } from "../constants";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { url } from "~/env";
import MenuBar from "./MenuBar";
import { colors, fontSizes } from "../styles";
import * as SecureStore from "expo-secure-store";

dayjs.locale("en");

const cardWidth = Dimensions.get("window").width - 30;

const GetAppComponent = () => {
  const token = SecureStore.getItem("token");

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
  console.log("Doctor ID: ", parseInt(docId));
  console.log("Doctor Name: ", docName);
  console.log("-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=");
  console.log("Clinic Id: ", parseInt(clinicId));
  console.log("Clinic Name: ", clinicName);
  console.log("-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=");
  console.log("Patient ID: ", parseInt(patient.id));
  console.log("Patient Name: ", patient.name);
  console.log("-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=");


  const setAppObj = {
    "id":0,
    "patientName":"",
    "clinicName":"",
    "doctorName":"",
    "visitDate":"",
    "tokenNumber":0,
    "status":0,
    "clinicTotalAppointments":0,
    "clinicLastAppointmentToken":0,
    "charges":0,
    "prescription":"",
    "diagnosis":"",
    "age":0,
    "weight":0,
    "bloodPressure":"",
    "followupDate":"",
    "patientId":patientId,
    "clinicId":clinicId,
    "doctorId":docId,
    //"treatments":[]
  }

  const encodedApp = encodeURIComponent(JSON.stringify(setAppObj));

  const dispactBooked = () => {
    axios
      .get(
        `${url}setAppointment?token=${token}&appointment=${encodedApp}`,
      )
      .then((res) => {
        console.log("Appointment Booked: ", res.data);
        {
          Platform.OS === "ios"
            ? alert("Appointment Booked")
            : ToastAndroid.show("Appointment Booked", ToastAndroid.LONG);
        }
        setTimeout(() => {
          router.push("/(auth)/(tabs)/(home)/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error setting appointment: ", error);
      });
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
            {dayjs().format("DD-MMM-YYYY")}
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
                justifyContent:"center",
                borderRadius: 7,
                padding: 10,
                flex: 1,
                alignItems: "center",
              },
            ]}
          >
            <Text fontFamily={"ArialB"} color={colors.white}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispactBooked()}
            style={{
              flex: 1,
              backgroundColor: "#0066a1",
              borderRadius: 5,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text fontFamily={"ArialB"} color={colors.white}>
              Get Appointment
            </Text>
          </TouchableOpacity>
        </XStack>
      </Card>
    </>
  );
};
export default GetAppComponent;
