import {
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
  Linking,
  TextInput,
  Animated,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Separator, Text, View, XStack, YStack } from "tamagui";
import { Pagination } from "react-native-snap-carousel";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { addAppointment } from "../../context/actions/appointmentActions";
import axios from "axios";
import {
  borders,
  colors,
  fontFamily,
  fontSizes,
  spacingL,
  spacingPrim,
  spacingS,
} from "~/app/styles";
import { url } from "~/env";
import * as SecureStore from "expo-secure-store";
import { Feather } from "@expo/vector-icons";
import { PrimBtn, SecBtn } from "../CusButtons";
import { WhiteBold } from "../CusText";
import { HeartLoader } from "../Animations";

const cardWidth = Dimensions.get("window").width;

const DocDetails: React.FC = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [activeSlide, setActiveSlide] = React.useState(0);
  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = SecureStore.getItem("token");

  useEffect(() => {
    // Axios GET request to fetch doctors data
    if (!refresh) {
      axios
        .get(
          //USE YOUR OWN URL!!
          `${url}getAllBasicData?token=${token}`,
        )
        .then((res) => {
          console.log(
            "DOCDETAILS RES:",
            JSON.stringify(res.data.data, null, 2),
          );
          //console.log("Doctors Data: ", JSON.stringify(res.data.data.doctors[0], null, 2));
          setDoctorsData(res.data.data.doctors);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
      setRefresh(false);
    }
    setRefresh(false);
  }, [refresh]);

  const handleGetAppointment = (doc: any, clinic: any, doctorId: string) => {
    dispatch(addAppointment(doc, clinic));
    SecureStore.setItem("doctorId", doctorId);
    router.push("/(auth)/(tabs)/(home)/SetAppointment");
  };

  const handleOpenMaps = () => {
    console.log("Directions Pressed");
    const link = `https://www.google.com/maps/search/?api=1&query=34.0050561,71.9912959`;
    Linking.openURL(link);
  };

  const filteredDoctors = doctorsData.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <YStack flex={1} justifyContent="center">
      {loading ? (
        <View
          gap={spacingPrim}
          alignItems="center"
          position="absolute"
          justifyContent="center"
          alignSelf="center"
          height={cardWidth}
          width={cardWidth}
        >
          <WhiteBold>Loading Doctors</WhiteBold>
          <HeartLoader />
        </View>
      ) : (
        <YStack flex={1}>
          <XStack
            paddingHorizontal={spacingPrim}
            backgroundColor={colors.yellow}
            paddingBottom={spacingPrim}
            borderBottomLeftRadius={borders.L}
            borderBottomRightRadius={borders.L}
          >
            <View
              flexDirection="row"
              alignItems="center"
              borderRadius={borders.L}
              backgroundColor={colors.white}
              padding={spacingPrim}
              flex={1}
            >
              <Feather
                name="search"
                size={20}
                color={colors.primary}
                style={{ marginRight: spacingPrim }}
              />
              <TextInput
                onChangeText={setSearchQuery}
                placeholder="Search Doctors"
                style={{ flex: 1, color: colors.primary }}
                placeholderTextColor={colors.primary}
              />
            </View>
          </XStack>
          <YStack paddingHorizontal={spacingPrim}>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => setRefresh(true)}
                  colors={[colors.yellow]}
                  tintColor={colors.white}
                />
              }
              horizontal={false}
              decelerationRate="normal"
              data={filteredDoctors}
              keyExtractor={(item: any) => item.id.toString()}
              renderItem={({ item }) => (
                <View
                  padding={spacingPrim}
                  gap={spacingPrim}
                  width="100%"
                  backgroundColor={colors.white}
                  borderRadius={borders.L}
                  marginTop={spacingPrim}
                >
                  {/* Doctor's information */}
                  <View
                    gap={spacingPrim}
                    flexDirection="row"
                    alignItems="center"
                  >
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
                    <View gap={spacingS}>
                      <Text
                        color={colors.primary}
                        fontFamily={fontFamily.bold}
                        fontSize={fontSizes.L}
                      >
                        {item.name}
                      </Text>
                      <Text
                        color={colors.yellow}
                        fontFamily={fontFamily.regular}
                        fontSize={fontSizes.M}
                      >
                        Dentist
                      </Text>
                      <Text
                        color={colors.yellow}
                        fontFamily={fontFamily.regular}
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
                    padding={spacingPrim}
                  >
                    <YStack gap={spacingS} ai={"center"}>
                      <Text
                        fontSize={fontSizes.SM}
                        color={colors.primary}
                        fontFamily={fontFamily.bold}
                      >
                        397
                      </Text>
                      <Text
                        fontFamily={fontFamily.regular}
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
                      marginHorizontal={spacingPrim}
                    />
                    <YStack gap={spacingS} ai={"center"}>
                      <Text
                        fontSize={fontSizes.SM}
                        color={colors.primary}
                        fontFamily={fontFamily.bold}
                      >
                        12 Years
                      </Text>
                      <Text
                        fontFamily={fontFamily.regular}
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
                      marginHorizontal={spacingPrim}
                    />
                    <YStack gap={spacingS} ai={"center"}>
                      <Text
                        fontSize={fontSizes.SM}
                        color={colors.primary}
                        fontFamily={fontFamily.bold}
                      >
                        91% (45)
                      </Text>
                      <Text
                        fontFamily={fontFamily.regular}
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
                    snapToInterval={cardWidth - spacingL - spacingL}
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
                        borderRadius={borders.L}
                        padding={10}
                        width={cardWidth - spacingL - spacingL}
                        gap={spacingS}
                      >
                        <Text
                          color={colors.yellow}
                          fontFamily={fontFamily.regular}
                          fontSize={fontSizes.SM}
                        >
                          Clinic Name:
                        </Text>
                        <Text
                          color={colors.primary}
                          fontFamily={fontFamily.bold}
                          fontSize={fontSizes.SM}
                        >
                          {clinic.clinic.name}
                        </Text>
                        <Text
                          color={colors.yellow}
                          fontFamily={fontFamily.regular}
                          fontSize={fontSizes.SM}
                        >
                          Charges:
                        </Text>
                        <Text
                          color={colors.primary}
                          fontFamily={fontFamily.bold}
                          fontSize={fontSizes.SM}
                        >
                          PKR {clinic.charges}
                        </Text>
                        <Text
                          color={colors.yellow}
                          fontFamily={fontFamily.regular}
                          fontSize={fontSizes.SM}
                        >
                          Timings:
                        </Text>
                        <Text
                          color={colors.primary}
                          fontFamily={fontFamily.bold}
                          fontSize={fontSizes.SM}
                        >
                          {clinic.startTime} - {clinic.endTime}
                        </Text>

                        {/* Additional clinic information can be displayed here */}
                        <View
                          flexDirection="row"
                          justifyContent="space-between"
                          marginTop={spacingPrim}
                          gap={spacingPrim}
                        >
                          {/* Buttons for actions */}
                          <PrimBtn onPress={handleOpenMaps}>
                            <WhiteBold>Get Directions</WhiteBold>
                          </PrimBtn>
                          <SecBtn
                            onPress={() =>
                              handleGetAppointment(
                                item,
                                item.doctorClinicDALS,
                                item.id.toString(),
                              )
                            }
                          >
                            <Text
                              fontFamily={fontFamily.bold}
                              color={colors.white}
                            >
                              Get Appointment
                            </Text>
                          </SecBtn>
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
