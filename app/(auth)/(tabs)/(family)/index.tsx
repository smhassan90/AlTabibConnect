import { Dimensions, Image, View } from "react-native";
import React, { useEffect, useState } from "react";
import MenuBar from "~/app/components/MenuBar";
import { Button, ButtonText, Text, XStack, YStack } from "tamagui";
import { FlatList } from "react-native-gesture-handler";
import { colors, fontSizes } from "~/app/styles";
import { url } from "~/env";
import axios from "axios";
import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import constants from "expo-constants";
import LottieView from "lottie-react-native";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const token = SecureStore.getItem("token");

  const parseDateString = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
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

          let age = currentDate.getFullYear() - dobDate.getFullYear();
          const birthMonth = dobDate.getMonth() + 1;
          if (
            currentDate.getMonth() + 1 < birthMonth ||
            (currentDate.getMonth() + 1 === birthMonth &&
              currentDate.getDate() < dobDate.getDate())
          ) {
            age--; // decrease ager pending bday
          }
          patient.age = age;
          return patient;
        });
        setPatients(updatedPatients);
        console.log(
          "Updated Family members: ",
          JSON.stringify(updatedPatients, null, 2),
        );
        setTimeout(() => {
          setLoading(false);
        }
        , 3000);
      })
      .catch((err) => {
        console.log("Error getting family: ", err);
        setLoading(false);
      });
  }, []);

  const checkHistory = (patientId: string) => {
    SecureStore.setItem("patientId", patientId);
    router.push("/(auth)/(tabs)/(family)/getHistory");
  };

  const statusBarHeight = constants.statusBarHeight;

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <View
        style={{
          paddingTop: statusBarHeight,
          paddingHorizontal: 10,
          width: "100%",
          backgroundColor: colors.yellow,
          paddingBottom: 5,
        }}
      >
        <MenuBar title="My Family" />
      </View>
      <YStack marginTop={10} flex={1} gap={10} paddingHorizontal={10}>
        <Link href="/AddFamily" asChild>
          <Button backgroundColor={colors.yellow} width={"100%"}>
            <ButtonText>Add Family Member</ButtonText>
          </Button>
        </Link>
        {loading ? (
          <View
            style={{
              alignSelf: "center",
              gap: 20,
              position: "absolute",
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              color={colors.white}
              fontFamily={"ArialB"}
              fontSize={fontSizes.L}
            >
              Getting Family
            </Text>
            <LottieView
              speed={2.0}
              autoPlay
              style={{
                width: 100,
                height: 100,
              }}
              source={require("~/assets/HeartLoader.json")}
            />
          </View>
        ) : (
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
                    source={
                      item.age > 18 && item.gender === "male"
                        ? require("~/assets/man.png")
                        : item.age > 18 && item.gender === "female"
                          ? require("~/assets/woman.png")
                          : item.age <= 18 && item.gender === "male"
                            ? require("~/assets/boy.png")
                            : require("~/assets/girl.png")
                    }
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
                  <Button
                    onPress={() => checkHistory(item.id.toString())}
                    backgroundColor={colors.primary}
                    flex={1}
                  >
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
        )}
      </YStack>
    </View>
  );
};

export default Page;
