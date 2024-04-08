import { Image, RefreshControl, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import MenuBar from "~/app/components/MenuBar";
import { Button, Text, XStack, YStack } from "tamagui";
import { FlatList } from "react-native";
import {
  buttons,
  colors,
  fontFamily,
  fontSizes,
  spacingM,
  spacingPrim,
  spacingS,
} from "~/app/styles";
import { url } from "~/env";
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Header from "~/app/components/ParentView";
import { HeartLoader } from "~/app/components/Animations";
import { color } from "@tamagui/themes";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [patients, setPatients] = useState([]);
  const token = SecureStore.getItem("token");

  const parseDateString = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    if (!refresh) {
      axios
        .get(`${url}getFamily?token=${token}`)
        .then((res) => {
          const patients = res.data.data.patients;
          console.log("Family members: ", JSON.stringify(patients, null, 2));

          const updatedPatients = patients.map((patient: any) => {
            const dobDate = parseDateString(patient.dob);
            const currentDate = new Date();

            let age = currentDate.getFullYear() - dobDate.getFullYear();
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
          setLoading(false);
          console.log(
            "Updated Family members: ",
            JSON.stringify(updatedPatients, null, 2),
          );
        })
        .catch((err) => {
          console.log("Error getting family: ", err);
          setLoading(false);
        });
    }
    setRefresh(false);
  }, [refresh]);

  const checkHistory = (patientId: string) => {
    SecureStore.setItem("patientId", patientId);
    router.push("/(auth)/(tabs)/(family)/getHistory");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <Header>
        <MenuBar title="My Family" />
      </Header>
      <YStack paddingTop={10} flex={1} paddingHorizontal={10}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/(auth)/(tabs)/(family)/AddFamily")}
          style={[buttons.secBtn]}
        >
          <Text color={"white"} fontFamily={fontFamily.bold}>
            Add Family
          </Text>
        </TouchableOpacity>
        {loading ? (
          <View
            style={{
              alignSelf: "center",
              gap: spacingPrim,
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
            <HeartLoader />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={() => setRefresh(true)}
                colors={[colors.yellow]}
                tintColor={colors.white}
              />
            }
            contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
            horizontal={false}
            decelerationRate={"normal"}
            data={patients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <YStack
                backgroundColor={colors.white}
                borderColor={colors.white}
                borderRadius={spacingPrim}
                borderWidth={2}
                padding={spacingPrim}
                gap={spacingPrim}
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
                  <YStack justifyContent="center" paddingLeft gap={spacingPrim}>
                    <XStack marginLeft={5} gap={5}>
                      <Text
                        fontFamily={"ArialB"}
                        fontSize={fontSizes.SM}
                        color={colors.yellow}
                      >
                        Name:
                      </Text>
                      <Text
                        fontFamily={"ArialB"}
                        fontSize={fontSizes.SM}
                        color={colors.primary}
                        maxWidth={200}
                      >
                        {item.name}
                      </Text>
                    </XStack>

                    <XStack marginLeft={5} gap={spacingS}>
                      <Text
                        fontFamily={"ArialB"}
                        fontSize={fontSizes.SM}
                        color={colors.yellow}
                      >
                        Age:
                      </Text>
                      <Text
                        fontFamily={"ArialB"}
                        fontSize={fontSizes.SM}
                        color={colors.primary}
                      >
                        {item.age}
                      </Text>
                    </XStack>
                  </YStack>
                </XStack>

                <XStack gap={spacingS}>
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
