import { Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Card, Text, View, XStack } from "tamagui";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { Dimensions } from "react-native";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { url } from "./../../env";
import MenuBar from "./MenuBar";
import { buttons, colors, fontSizes, spacingPrim } from "../styles";
import * as SecureStore from "expo-secure-store";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";
import Header from "./ParentView";
import { WhiteBold } from "./CusText";
import { HeartLoader } from "./Animations";
import { PrimaryBtn, SecondaryBtn } from "./CusButtons";

dayjs.locale("en");

const cardWidth = Dimensions.get("window").width - 30;

const GetAppComponent = () => {
  const [loading, setLoading] = useState<boolean>();
  const token = SecureStore.getItem("token");

  const data = useSelector((state: any) => state.appointments);
  const patientRedux = useSelector((state: any) => state.patients);

  const currentDate = dayjs().format("YYYY-MM-DD");


  //WHOLE DOC LIST
  const docs = data[data.length - 1].doc;
  const docId = docs.id;
  const docName = docs.name;
  const clinicName = data[0].clinic.clinic.name;
  const clinicId = data[0].clinic.clinic.id;
  const patient = patientRedux[0];
  const patientId = patientRedux[0].id;

  const setAppObj = {
    id: 0,
    patientName: "",
    clinicName: "",
    doctorName: "",
    visitDate: currentDate,
    tokenNumber: 0,
    status: 0,
    clinicTotalAppointments: 0,
    clinicLastAppointmentToken: 0,
    charges: 0,
    prescription: "",
    diagnosis: "",
    age: 0,
    weight: 0,
    bloodPressure: "",
    followupDate: "",
    patientId: patientId,
    clinicId: clinicId,
    doctorId: docId,
    treatments: [],
  };

  
  const encodedApp = encodeURIComponent(JSON.stringify(setAppObj));

  const dispactBooked = () => {
    setLoading(true);
    console.log("Encoded Appointment: ", JSON.stringify(setAppObj, null, 2));
    console.log("TOKEN:", token);
    // return
    axios
      .get(`${url}setAppointment?token=${token}&appointment=${encodedApp}`)
      .then((res) => {
        console.log("Response: ", res.data);
        
        if (res.status === 200) {
          console.log("Set Appointment status: ", res.data);
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Appointment Booked",
            textBody: "Your appointment was booked successfully!",
          });
          setTimeout(() => {
            setLoading(false);
            Dialog.hide();
            router.push("/(auth)/(tabs)/(home)/");
          }, 2000);
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Error setting appointment",
            textBody: "Something went wrong",
          });
          setTimeout(() => {
            setLoading(false);
            Dialog.hide();
          }, 2000);
        }
      })
      .catch((error) => {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Error setting appointment",
          textBody: "Something went wrong",
        });
        setTimeout(() => {
          setLoading(false);
          Dialog.hide();
        }, 2000);
        console.error("Error setting appointment: ", error);
      });
  };

  const cancelBooking = () => {
    setTimeout(() => {
      router.push("/(auth)/(tabs)/(home)/SetAppointment");
    }, 500);
  };

  return (
    <AlertNotificationRoot>
      <View flex={1} backgroundColor={colors.primary}>
        <Header>
          <MenuBar title="Confirm Appointment" />
        </Header>
        <View alignItems="center" paddingHorizontal={spacingPrim}>
          <Card
            width={"100%"}
            marginTop={10}
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
              {docs.qualifications.map((item: any) => (
                <Text
                  key={item.id}
                  color={colors.primary}
                  fontFamily={"ArialB"}
                  fontSize={fontSizes.SM}
                >
                  {item.name}
                </Text>
              ))}
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
            <XStack gap={5}>
              {/* <TouchableOpacity
                onPress={() => cancelBooking()}
                style={[buttons.secBtn, { flex: 1 }]}
              >
                <Text fontFamily={"ArialB"} color={colors.white}>
                  Cancel
                </Text>
              </TouchableOpacity> */}
               <SecondaryBtn onPress={() => cancelBooking()}>Cancel</SecondaryBtn>
               <PrimaryBtn onPress={() => dispactBooked()}>Get Appointments</PrimaryBtn>                         
              {/* <TouchableOpacity
                onPress={() => dispactBooked()}
                style={[buttons.primaryBtn, { flex: 1 }]}
              >
                <Text fontFamily={"ArialB"} color={colors.white}>
                  Get Appointments
                </Text>
              </TouchableOpacity> */}
            </XStack>
          </Card>
        </View>
        {loading && (
          <View
            gap={10}
            alignItems="center"
            justifyContent="center"
            alignSelf="center"
            height={cardWidth}
            width={cardWidth}
          >
            <WhiteBold>Booking your Appointment</WhiteBold>
            <HeartLoader />
          </View>
        )}
      </View>
    </AlertNotificationRoot>
  );
};
export default GetAppComponent;
