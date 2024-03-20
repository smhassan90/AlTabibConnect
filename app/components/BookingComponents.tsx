import { FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, ButtonText, Card, Text, XStack, YStack } from "tamagui";
import { router } from "expo-router";
import { colors, fontSizes } from "../styles";
import MenuBar from "./MenuBar";
import axios from "axios";
import { url } from "~/env";
import { useDispatch } from "react-redux";
import { addPatient } from "../context/actions/patientActions";
import * as SecureStore from "expo-secure-store";

const BookingComponents = () => {
  const dispatch = useDispatch();

  const [patients, setPatients] = useState([]);


  const token = SecureStore.getItem("token")


  //const PATIENT:any[] = [];

  const parseDateString = (dateString: string) => {
    const months: { [key: string]: number } = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    const parts = dateString.split("-");
    const day = parseInt(parts[0]);
    const month = months[parts[1].substr(0, 3)]; // Get the month index from the months object
    const year =
      parseInt(parts[2]) < 50
        ? 2000 + parseInt(parts[2])
        : 1900 + parseInt(parts[2]); // Assume 20th or 21st century based on year
    return new Date(year, month, day);
  };

  useEffect(() => {
    axios
      .get(
        `${url}getFamily?token=${token}`,
      )
      .then((res) => {
        const patients = res.data.data.patients;

        const updatedPatients = patients.map((patient: any) => {
          const dobDate = parseDateString(patient.dob);
          const currentDate = new Date();
          const age = currentDate.getFullYear() - dobDate.getFullYear();
          if (
            currentDate.getMonth() < dobDate.getMonth() ||
            (currentDate.getMonth() === dobDate.getMonth() &&
              currentDate.getDate() < dobDate.getDate())
          ) {
            patient.age = age - 1;
          } else {
            patient.age = age;
          }
          return patient;
        });
        setPatients(updatedPatients);

        console.log(
          "Updated Patients: ",
          JSON.stringify(updatedPatients, null, 2),
        );
      });
  }, []);

  const checkHistory = (patientId:string) => {

    SecureStore.setItem("patientId", patientId);
    
    router.push("/(auth)/(tabs)/(family)/getHistory");
  }

  const dispactBooked = (id: any, name: any) => {
    const reduxPatients = dispatch(addPatient({ id, name }));
    router.push("/(auth)/(tabs)/(home)/GetAppointment");
  };
  return (
    <>
      <MenuBar title=" Choose Patient" />
      <Card
        padding={10}
        flex={1}
        alignItems="center"
        unstyled
        backgroundColor={"white"}
      >
        <FlatList
          style={{width: "100%" }}
          data={patients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <YStack
              marginBottom={10}
              borderColor={colors.border}
              borderRadius={10}
              borderWidth={2}
              width={"100%"}
              key={item.id}
              padding={10}
              gap={10}
              alignItems="flex-start"
              justifyContent="center"
            >
              {/*{PATIENT.push({id:item.id, name:item.name})}*/}
              <XStack>
                <Image
                  source={require("~/assets/man.png")}
                  style={{ borderRadius: 50, width: 100, height: 100 }}
                />
                <YStack justifyContent="center" paddingLeft gap={10}>
                  <XStack marginLeft={5}>
                    <Text
                      color={colors.yellow}
                      fontFamily={"ArialB"}
                      fontSize={fontSizes.SM}
                    >
                      Name:{" "}
                    </Text>
                    <Text color={colors.primary} fontFamily={"ArialB"} fontSize={fontSizes.SM}>
                      {item.name} id
                      {item.id}
                    </Text>
                  </XStack>

                  {/* <XStack marginLeft={5}>
                    <Text
                      color={colors.yellow}
                      fontFamily={"ArialB"}
                      fontSize={fontSizes.SM}
                    >
                      Age:{" "}
                    </Text>
                   <Text color={colors.primary} fontFamily={"ArialB"} fontSize={fontSizes.SM}>
                      {item.age}
                    </Text>
                  </XStack> */}

                  <XStack marginLeft={5}>
                    <Text
                      color={colors.yellow}
                      fontFamily={"ArialB"}
                      fontSize={fontSizes.SM}
                    >
                      Phone:{" "}
                    </Text>
                   <Text color={colors.primary} fontFamily={"ArialB"} fontSize={fontSizes.SM}>
                      {item.cellNumber}
                    </Text>
                  </XStack>
                </YStack>
              </XStack>
              {/* <XStack gap={5}>
                <Button backgroundColor={colors.yellow} flex={1}>
                  <ButtonText>Choose Date</ButtonText>
                </Button>
              </XStack> */}

              <XStack gap={5}>
                <Button onPress={()=>checkHistory(item.id.toString())} backgroundColor={colors.primary} flex={1}>
                  <ButtonText>Check History</ButtonText>
                </Button>
                <Button
                  onPress={() => dispactBooked(item.id, item.name)}
                  backgroundColor={colors.yellow}
                  flex={1}
                >
                  <ButtonText>Select Patient</ButtonText>
                </Button>
              </XStack>
            </YStack>
          )}
        />
      </Card>
    </>
  );
};

export default BookingComponents;
