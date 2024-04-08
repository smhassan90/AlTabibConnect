import { Dimensions, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, ButtonText, Text, View, XStack, YStack } from "tamagui";
import { router } from "expo-router";
import { colors, fontSizes, spacingPrim } from "../styles";
import MenuBar from "./MenuBar";
import axios from "axios";
import { url } from "~/env";
import { useDispatch } from "react-redux";
import { addPatient } from "../context/actions/patientActions";
import * as SecureStore from "expo-secure-store";
import Header from "./ParentView";
import { WhiteBold } from "./CusText";
import { HeartLoader } from "./Animations";

const cardWidth = Dimensions.get("window").width;

const BookingComponents = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);

  const token = SecureStore.getItem("token");

  const parseDateString = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    axios.get(`${url}getFamily?token=${token}`).then((res) => {
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
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });
  }, []);

  const checkHistory = (patientId: string) => {
    SecureStore.setItem("patientId", patientId);

    router.push("/(auth)/(tabs)/(family)/getHistory");
  };

  const dispactBooked = (id: any, name: any) => {
    const reduxPatients = dispatch(addPatient({ id, name }));
    router.push("/(auth)/(tabs)/(home)/GetAppointment");
  };
  return (
    <View flex={1} backgroundColor={colors.primary}>
      <Header>
        <MenuBar title=" Choose Patient" />
      </Header>
      <YStack justifyContent="center" flex={1} paddingHorizontal={spacingPrim}>
        {loading ? (
          <View
            gap={20}
            alignItems="center"
            position="absolute"
            justifyContent="center"
            alignSelf="center"
            height={cardWidth}
            width={cardWidth}
          >
            <WhiteBold>Loading your Family</WhiteBold>
            <HeartLoader />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={patients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <YStack
                marginVertical={spacingPrim}
                backgroundColor={colors.white}
                borderRadius={10}
                width={"100%"}
                key={item.id}
                padding={spacingPrim}
                gap={spacingPrim}
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
                        color={colors.yellow}
                        fontFamily={"ArialB"}
                        fontSize={fontSizes.SM}
                      >
                        Name:{" "}
                      </Text>
                      <Text
                        color={colors.primary}
                        fontFamily={"ArialB"}
                        fontSize={fontSizes.SM}
                      >
                        {item.name}{" "}
                      </Text>
                    </XStack>

                    <XStack marginLeft={5} gap={5}>
                      <Text
                        color={colors.yellow}
                        fontFamily={"ArialB"}
                        fontSize={fontSizes.SM}
                      >
                        Age:
                      </Text>
                      <Text
                        color={colors.primary}
                        fontFamily={"ArialB"}
                        fontSize={fontSizes.SM}
                      >
                        {item.age}
                      </Text>
                    </XStack>

                    <XStack marginLeft={5} gap={5}>
                      <Text
                        color={colors.yellow}
                        fontFamily={"ArialB"}
                        fontSize={fontSizes.SM}
                      >
                        Phone:{" "}
                      </Text>
                      <Text
                        color={colors.primary}
                        fontFamily={"ArialB"}
                        fontSize={fontSizes.SM}
                      >
                        {item.cellNumber}
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
        )}
      </YStack>
    </View>
  );
};

export default BookingComponents;
