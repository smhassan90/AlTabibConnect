import { Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuBar from "~/app/components/MenuBar";
import { Button, ButtonText, Text, XStack, YStack } from "tamagui";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "~/app/styles";
import { url } from "~/env";
import axios from "axios";
import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const Page = () => {
  const [patients, setPatients] = useState([]);
  const token = SecureStore.getItem("token");

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
      .get(`${url}getFamily?token=${token}`)
      .then((res) => {
        const patients = res.data.data.patients;
        console.log("Family members: ", JSON.stringify(patients, null, 2));

        const updatedPatients = patients.map((patient: any) => {
          const dobDate = parseDateString(patient.dob);
          const currentDate = new Date();
          console.log("Org array Date: ", patient.dob);
          console.log("array Date: ", dobDate.toString());
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
          "Updated Family members: ",
          JSON.stringify(updatedPatients, null, 2),
        );
      })
      .catch((err) => {
        console.log("Error getting family: ", err);
      });
  }, []);

  const checkHistory = (patientId: string) => {
    SecureStore.setItem("patientId",patientId)
    router.push("/(auth)/(tabs)/(family)/getHistory")
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.primary,
        flex: 1,
        paddingHorizontal: 10,
      }}
    >
      <MenuBar title="My Family" />
      <YStack flex={1} gap={10}>
        <Link href="/AddFamily" asChild>
          <Button backgroundColor={colors.yellow} width={"100%"}>
            <ButtonText>Add Family Member</ButtonText>
          </Button>
        </Link>
        <FlatList
          style={{ flex: 1, width: "100%" }}
          data={patients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <YStack
              backgroundColor={"white"}
              marginBottom={10}
              borderColor={colors.white}
              borderRadius={10}
              borderWidth={2}
              width={"100%"}
              padding={10}
              gap={10}
              alignItems="flex-start"
              justifyContent="center"
            >
              <XStack>
                <Image
                  source={require("~/assets/man.png")}
                  style={{ borderRadius: 50, width: 100, height: 100 }}
                />
                <YStack justifyContent="center" paddingLeft gap={10}>
                  <XStack marginLeft={5} gap={5}>
                    <Text
                      fontFamily={"ArialB"}
                      fontSize={16}
                      color={colors.yellow}
                    >
                      Name:
                    </Text>
                    <Text
                      fontFamily={"ArialB"}
                      fontSize={16}
                      color={colors.primary}
                    >
                      {item.name}
                    </Text>
                  </XStack>

                  <XStack marginLeft={5} gap={5}>
                    <Text
                      fontFamily={"ArialB"}
                      fontSize={16}
                      color={colors.yellow}
                    >
                      Age:
                    </Text>
                    <Text
                      fontFamily={"ArialB"}
                      fontSize={16}
                      color={colors.primary}
                    >
                      {item.age}
                    </Text>
                  </XStack>
                </YStack>
              </XStack>

              <XStack gap={5}>
                <Button onPress={()=>checkHistory(item.id.toString())} backgroundColor={colors.primary} flex={1}>
                  <Text color={colors.white} fontFamily={"ArialB"}>
                    Check History
                  </Text>
                </Button>
                <Button backgroundColor={colors.yellow} flex={1}>
                  <Text color={colors.white} fontFamily={"ArialB"}>
                    Remove Member
                  </Text>
                </Button>
              </XStack>
            </YStack>
          )}
        />
      </YStack>
    </SafeAreaView>
  );
};

export default Page;
