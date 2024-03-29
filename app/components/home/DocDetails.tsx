import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  TextInput,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Separator, Text, View, XStack, YStack } from "tamagui";
import { Pagination } from "react-native-snap-carousel";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { addAppointment } from "../../context/actions/appointmentActions";
import axios from "axios";
import { colors, fontSizes } from "~/app/styles";
import { url } from "~/env";
import * as SecureStore from "expo-secure-store";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const cardWidth = Dimensions.get("window").width;

interface DocDetailsProps {
  heading: string;
}

const DocDetails: React.FC<DocDetailsProps> = ({ heading }) => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const [activeSlide, setActiveSlide] = React.useState(0);
  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = SecureStore.getItem("token");

  useEffect(() => {
    // Axios GET request to fetch doctors data
    axios
      .get(
        //USE YOUR OWN URL!!
        `${url}getAllBasicData?token=${token}`,
      )
      .then((res) => {
        console.log("DOCDETAILS RES:", JSON.stringify(res.data, null, 2));
        //console.log("Doctors Data: ", JSON.stringify(res.data.data.doctors[0], null, 2));
        setDoctorsData(res.data.data.doctors);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleGetAppointment = (doc: any, clinic: any, doctorId: string) => {
    dispatch(addAppointment(doc, clinic));
    SecureStore.setItem("doctorId", doctorId);
    router.push("/(auth)/(tabs)/(home)/SetAppointment");
  };

  const handleOpenMaps = (lat: string, long: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=34.0050561,71.9912959`;
    Linking.openURL(url);
  };

  const filteredDoctors = doctorsData.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <YStack flex={1} justifyContent="center">
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
          <Text
            color={colors.white}
            fontFamily={"ArialB"}
            fontSize={fontSizes.L}
          >
            Loading Doctors
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
        <YStack flex={1}>
          <XStack
            paddingHorizontal={10}
            backgroundColor={colors.yellow}
            paddingBottom={10}
            borderBottomLeftRadius={15}
            borderBottomRightRadius={15}
          >
            <View
              flexDirection="row"
              alignItems="center"
              borderRadius={20}
              backgroundColor={colors.white}
              padding={10}
              flex={1}
            >
              <Feather
                name="search"
                size={20}
                color={colors.primary}
                style={{ marginRight: 10 }}
              />
              <TextInput
                onChangeText={setSearchQuery}
                placeholder="Search Doctors"
                style={{ flex: 1, color: colors.primary }}
                placeholderTextColor={colors.primary}
              />
            </View>
          </XStack>
          <YStack paddingHorizontal={10}>
            <Animated.FlatList
              horizontal={false}
              contentContainerStyle={{ gap: 10 }}
              decelerationRate="normal"
              data={filteredDoctors}
              keyExtractor={(item: any) => item.id.toString()}
              renderItem={({ item }) => (
                <View
                  paddingHorizontal={10}
                  gap={15}
                  width="100%"
                  marginBottom={10}
                  backgroundColor={colors.white}
                  borderRadius={10}
                  paddingTop={15}
                  paddingBottom={5}
                  marginTop={10}
                >
                  {/* Doctor's information */}
                  <View gap={10} flexDirection="row" alignItems="center">
                    <Image
                      source={
                        item.gender == "male"
                          ? require("~/assets/docMale.png")
                          : require("~/assets/docFemale.png")
                      }
                      style={{
                        borderWidth: 1,
                        borderColor: "#d6d6d6",
                        borderRadius: 50,
                        width: 75,
                        height: 75,
                      }}
                    />
                    <View gap={5}>
                      <Text
                        color={colors.primary}
                        fontFamily={"ArialB"}
                        fontSize={20}
                      >
                        {item.name}
                      </Text>
                      <Text
                        color={colors.yellow}
                        fontFamily={"Arial"}
                        fontSize={fontSizes.M}
                      >
                        Dentist
                      </Text>
                      <Text
                        color={colors.yellow}
                        fontFamily={"Arial"}
                        fontSize={fontSizes.M}
                      >
                        {item.qualifications.map(
                          (qual: string) => qual.name + " | ",
                        )}
                      </Text>
                    </View>
                  </View>

                  <XStack
                    justifyContent="center"
                    flexDirection="row"
                    padding={10}
                  >
                    <YStack ai={"center"}>
                      <Text
                        fontSize={fontSizes.SM}
                        color={colors.primary}
                        fontFamily={"ArialB"}
                      >
                        397
                      </Text>
                      <Text
                        fontFamily={"Arial"}
                        fontSize={fontSizes.SM}
                        color={colors.yellow}
                      >
                        Checkups
                      </Text>
                    </YStack>
                    <Separator
                      borderColor={"lightgray"}
                      borderWidth={0.5}
                      alignSelf="stretch"
                      vertical
                      marginHorizontal={15}
                    />
                    <YStack ai={"center"}>
                      <Text
                        fontSize={fontSizes.SM}
                        color={colors.primary}
                        fontFamily={"ArialB"}
                      >
                        12 Years
                      </Text>
                      <Text
                        fontFamily={"Arial"}
                        fontSize={fontSizes.SM}
                        color={colors.yellow}
                      >
                        Experience
                      </Text>
                    </YStack>
                    <Separator
                      borderColor={"lightgray"}
                      borderWidth={0.5}
                      alignSelf="stretch"
                      vertical
                      marginHorizontal={15}
                    />
                    <YStack ai={"center"}>
                      <Text
                        fontSize={fontSizes.SM}
                        color={colors.primary}
                        fontFamily={"ArialB"}
                      >
                        91% (45)
                      </Text>
                      <Text
                        fontFamily={"Arial"}
                        fontSize={fontSizes.SM}
                        color={colors.yellow}
                      >
                        Satisfied
                      </Text>
                    </YStack>
                  </XStack>

                  {/* Clinics FlatList */}
                  <FlatList
                    snapToAlignment="center"
                    snapToInterval={cardWidth - 20 - 20}
                    decelerationRate={"fast"}
                    style={{ width: "100%" }}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={item.doctorClinicDALS}
                    keyExtractor={(clinic) => clinic.id.toString()}
                    renderItem={({ item: clinic }) => (
                      <View
                        borderColor={"#ebebeb"}
                        borderWidth={2}
                        borderRadius={10}
                        padding={10}
                        width={cardWidth - 20 - 20}
                        gap={5}
                      >
                        <Text
                          color={colors.yellow}
                          fontFamily={"Arial"}
                          fontSize={fontSizes.SM}
                        >
                          Clinic Name:
                        </Text>
                        <Text
                          color={colors.primary}
                          fontFamily={"ArialB"}
                          fontSize={fontSizes.SM}
                        >
                          {clinic.clinic.name}
                        </Text>
                        <Text
                          color={colors.yellow}
                          fontFamily={"Arial"}
                          fontSize={fontSizes.SM}
                        >
                          Charges:
                        </Text>
                        <Text
                          color={colors.primary}
                          fontFamily={"ArialB"}
                          fontSize={fontSizes.SM}
                        >
                          PKR {clinic.charges}
                        </Text>
                        <Text
                          color={colors.yellow}
                          fontFamily={"Arial"}
                          fontSize={fontSizes.SM}
                        >
                          Timings:
                        </Text>
                        <Text
                          color={colors.primary}
                          fontFamily={"ArialB"}
                          fontSize={fontSizes.SM}
                        >
                          {clinic.startTime} - {clinic.endTime}
                        </Text>

                        {/* Additional clinic information can be displayed here */}
                        <View
                          flexDirection="row"
                          justifyContent="space-between"
                          marginTop={10}
                          gap={10}
                        >
                          {/* Buttons for actions */}
                          <TouchableOpacity
                            onPress={() => handleOpenMaps}
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
                            <Text color={colors.white}>Get Directions</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              handleGetAppointment(
                                item,
                                item.doctorClinicDALS,
                                item.id.toString(),
                              )
                            }
                            style={{
                              flex: 1,
                              backgroundColor: "#ffa600",
                              borderRadius: 5,
                              height: 40,
                              alignItems: "center",
                              justifyContent: "center",
                              paddingHorizontal: 10,
                            }}
                          >
                            <Text color={colors.white}>Get Appointment</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    onScroll={({ nativeEvent }) => {
                      const xOffset = nativeEvent.contentOffset.x;
                      const index = Math.round(xOffset / cardWidth);
                      setActiveSlide(index);
                    }}
                  />
                  {/* Pagination dots */}
                  <View alignSelf="center">
                    <Pagination
                      dotsLength={item.doctorClinicDALS.length}
                      activeDotIndex={activeSlide}
                      containerStyle={style.paginationContainer}
                      dotStyle={style.paginationDot}
                      inactiveDotStyle={style.paginationInactiveDot}
                      inactiveDotOpacity={0.8}
                      inactiveDotScale={0.7}
                    />
                  </View>
                </View>
              )}
            />
          </YStack>
        </YStack>
      )}
    </YStack>
  );
};

export default DocDetails;

const style = StyleSheet.create({
  paginationContainer: {
    width: cardWidth - 22,
    paddingVertical: 8,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  paginationInactiveDot: {
    backgroundColor: colors.labelGray,
  },
});
