import React, { useEffect, useState } from "react";
import MenuBar from "~/app/components/MenuBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "~/app/styles";
import { Card, Text, View, XStack, YStack } from "tamagui";
import axios from "axios";
import { url } from "~/env";
import * as SecureStore from "expo-secure-store";
import { DateType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import Header from "~/app/components/ParentView";

const Page = () => {
  const token = SecureStore.getItem("token");
  const patientId = SecureStore.getItem("patientId");
  const doctorId = SecureStore.getItem("doctorId");

  const [empty, setEmpty] = useState(true);

  const [patientName, setPatientName] = useState("");
  const [appDate, setAppDate] = useState("");
  const [charges, setCharges] = useState("");
  const [prescription, setPrescription] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [followupDate, setFollowupDate] = useState("");

  const [date, setDate] = useState<DateType>(dayjs());

  const fetchHistory = () => {
    axios
      .get(
        `${url}getPatientHistory?token=${token}&patientId=${patientId}&doctorId=${doctorId}`,
      )
      .then((res) => {
        console.log(
          "GET HISTORY RESPONSE: ",
          JSON.stringify(res.data.data, null, 2),
        );

        {
          res.data.data.appointments ? setEmpty(true) : setEmpty(false);
        }

        res.data.data.appointments.map((item: any) => {
          setPatientName(item.patientName);
          setAppDate(item.visitDate);
          //setTokenNumber(item.tokenNumber);
          setCharges(item.charges);
          setPrescription(item.prescription);
          setDiagnosis(item.diagnosis);
          setWeight(item.weight);
          setBloodPressure(item.bloodPressure);
          setFollowupDate(item.followupDate);

          // console.log('Patient Name:', patientName);
          // console.log('Visit Date:', appDate);
          // console.log('Token Number:', tokenNumber);
          // console.log('Charges:', charges);
          // console.log('Prescription:', prescription);
          // console.log('Diagnosis:', diagnosis);
          // console.log('Weight:', weight);
          // console.log('Blood Pressure:', bloodPressure);
          // console.log('Followup Date:', followupDate);
        });
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
        <Card
          unstyled
          borderWidth={1}
          borderColor={colors.white}
          padded
          justifyContent="center"
          backgroundColor={colors.lightGray}
          animation="bouncy"
          gap={10}
        >
          <XStack gap={10}>
            <Text color={colors.yellow} fontSize={16} fontFamily={"ArialB"}>
              Name:
            </Text>
            <Text color={colors.primary} fontSize={16} fontFamily={"ArialB"}>
              {patientName}
            </Text>
          </XStack>
          {/* <XStack gap={10}>
          <Text color={colors.yellow} fontSize={16} fontFamily={'ArialB'}>
            Age:
          </Text>
          <Text color={colors.primary} fontSize={16} fontFamily={'ArialB'}>
            null
          </Text>
        </XStack> */}
          <XStack gap={10}>
            <Text color={colors.yellow} fontSize={16} fontFamily={"ArialB"}>
              Appointment Date:
            </Text>
            <Text color={colors.primary} fontSize={16} fontFamily={"ArialB"}>
              {appDate}
            </Text>
          </XStack>
          <XStack gap={10}>
            <Text color={colors.yellow} fontSize={16} fontFamily={"ArialB"}>
              Follow-up Date:
            </Text>
            <Text color={colors.primary} fontSize={16} fontFamily={"ArialB"}>
              {followupDate}
            </Text>
          </XStack>
          <XStack gap={10}>
            <Text color={colors.yellow} fontSize={16} fontFamily={"ArialB"}>
              Diagnosis
            </Text>
            <Text color={colors.primary} fontSize={16} fontFamily={"ArialB"}>
              {diagnosis}
            </Text>
          </XStack>
          <XStack gap={10}>
            <Text color={colors.yellow} fontSize={16} fontFamily={"ArialB"}>
              Prescription:
            </Text>
            <Text color={colors.primary} fontSize={16} fontFamily={"ArialB"}>
              {prescription}
            </Text>
          </XStack>
          <XStack gap={10}>
            <Text color={colors.yellow} fontSize={16} fontFamily={"ArialB"}>
              Charges:
            </Text>
            <Text color={colors.primary} fontSize={16} fontFamily={"ArialB"}>
              {charges}
            </Text>
          </XStack>
          <XStack gap={10}>
            <Text color={colors.yellow} fontSize={16} fontFamily={"ArialB"}>
              BP:
            </Text>
            <Text color={colors.primary} fontSize={16} fontFamily={"ArialB"}>
              {bloodPressure}
            </Text>
          </XStack>
          <XStack gap={10}>
            <Text color={colors.yellow} fontSize={16} fontFamily={"ArialB"}>
              Weight:
            </Text>
            <Text color={colors.primary} fontSize={16} fontFamily={"ArialB"}>
              {weight}
            </Text>
          </XStack>
        </Card>
      )}
    </View>
  );
};

export default Page;
