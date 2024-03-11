import { Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuBar from "~/app/components/MenuBar";
import { Button, ButtonText, Card, XStack, YStack } from "tamagui";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "~/app/styles";
import { FontColors, fonts } from "~/app/constants";
import { url } from "~/env";
import axios from "axios";
import { Link } from "expo-router";
import { tokenCache } from "~/app/getToken";

const Page = () => {
  const [patients, setPatients] = useState([]);
  const [token, setToken] = useState("");

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
    tokenCache.getToken("token").then((token) => {
      setToken(token as string);
    });
    axios.get(`${url}getFamily?token=${token}`).then((res) => {
      const patients = res.data.data.patients;
      console.log("Patients: ", JSON.stringify(patients, null, 2));

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
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.primary,
        flex: 1,
        paddingHorizontal: 10,
      }}
    >
      <MenuBar title="Your Family Details" />
      <Card
        padding={10}
        gap={10}
        flex={1}
        alignItems="center"
        unstyled
        backgroundColor={colors.white}
        marginBottom={10}
      >
        <Link href="/AddFamily" asChild>
          <Button backgroundColor={colors.yellow} width={"100%"}>
            <ButtonText>Add Family Member</ButtonText>
          </Button>
        </Link>
        <FlatList
          style={{ width: "100%" }}
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
              <XStack>
                <Image
                  source={require("~/assets/doctor.png")}
                  style={{ borderRadius: 50, width: 100, height: 100 }}
                />
                <YStack justifyContent="center" paddingLeft gap={10}>
                  <XStack marginLeft={5}>
                    <Text style={[fonts.normalBold, FontColors.whiteFont]}>
                      Name:{" "}
                    </Text>
                    <Text style={[fonts.normal, FontColors.whiteFont]}>
                      {item.name}
                    </Text>
                  </XStack>

                  <XStack marginLeft={5}>
                    <Text style={[fonts.normalBold, FontColors.whiteFont]}>
                      Age:{" "}
                    </Text>
                    <Text style={[fonts.normal, FontColors.whiteFont]}>
                      {item.age}
                    </Text>
                  </XStack>

                  <XStack marginLeft={5}>
                    <Text style={[fonts.normalBold, FontColors.whiteFont]}>
                      Phone:{" "}
                    </Text>
                    <Text style={[fonts.normal, FontColors.whiteFont]}>
                      {item.cellNumber}
                    </Text>
                  </XStack>
                </YStack>
              </XStack>

              <XStack gap={5}>
                <Button backgroundColor={colors.green} flex={1}>
                  <ButtonText>Check History</ButtonText>
                </Button>
                <Button backgroundColor={colors.red} flex={1}>
                  <ButtonText>Remove Member</ButtonText>
                </Button>
              </XStack>
            </YStack>
          )}
        />
      </Card>
    </SafeAreaView>
  );
};

export default Page;
