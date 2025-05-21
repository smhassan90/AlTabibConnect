import {
  Alert,
  Dimensions,
  Image,
  Modal,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Separator, TextArea, View, XStack, YStack } from "tamagui";
import MenuBar from "./../../../../app/components/MenuBar";
import {
  colors,
  fontFamily,
  fontSizes,
  spacingM,
  spacingPrim,
  spacingS,
} from "./../../../../app/styles";
import constants from "expo-constants";
import { Text } from "tamagui";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  PrimaryBtn,
  PrimBtn,
  SecBtn,
  SecondaryBtn,
} from "./../../../../app/components/CusButtons";
import { PrimBold, WhiteBold } from "./../../../../app/components/CusText";
import { useSelector } from "react-redux";
import { CustomModal } from "./../../../../app/components/Modal";
import { BlurView } from "expo-blur";
import { userData } from "./../../../../app/components/home/CustomContent";
import { Rating, AirbnbRating } from "react-native-ratings";
import SwipeRating from "react-native-ratings/dist/SwipeRating";
import axios from "axios";
import { url } from "./../../../../env";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { addAppointment } from "./../../../context/actions/appointmentActions";
// import { addAppointment } from "../../context/actions/appointmentActions";
import { router } from "expo-router";

const statusBarHeight = constants.statusBarHeight;

const dummyReviews = [
  {
    id: 1,
    name: "Ali",
    rating: 4,
    review: "Good Doctor",
  },
  {
    id: 2,
    name: "Ahmed",
    rating: 5,
    review: "Good Doctor",
  },
  {
    id: 3,
    name: "Asad",
    rating: 3,
    review: "Good Doctor",
  },
];

type doctorType = {
  id: number;
  name: string;
  gender: string;
  qualifications: Array<{ id: number; name: string }>;
  specializations: Array<{ id: number; name: string }>;
  address: string;
  age: number;
  doctorClinicDALS: Array<{
    id: number;
    clinic: { id: number; name: string };
    charges: number;
    startTime: string;
    endTime: string;
  }>;
};

const DoctorProfile = () => {
  const [refresh, setRefresh] = useState(false);

  const [doctor, setDoctor] = useState<doctorType>();

  const reduxData = useSelector((state: any) => state.selectedDoctor);

  const [toggleModal, setToggleModal] = useState(false);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const token = SecureStore.getItem("token");
  const dispatch = useDispatch();

  const modalPress = () => {
    setToggleModal(true);
  };

  useEffect(() => {
    setDoctor(reduxData.selectedDoctor);
    setRefresh(false);
  }, [reduxData.selectedDoctor, refresh]);

  // const handleGetAppointment = (doc: any, clinic: any, doctorId: string) => {
  //     console.log(JSON.stringify(doc),"doc")
  //     console.log(JSON.stringify(clinic),"clinic")
  //     // return
  //     dispatch(addAppointment(doc, clinic));
  //     SecureStore.setItem("doctorId", doctorId);
  //     router.push("/(auth)/(tabs)/(home)/SetAppointment");
  //   };
  const handleGetAppointment = () => {
    router.push("/(auth)/(tabs)/(home)/SetAppointment");
  };

  const sendFeedback = () => {
    const Feedback = {
      doctorId: doctor.id,
      patientId: userData.id,
      detail: review,
      rating: rating,
    };

    const encodedFeedback = encodeURIComponent(JSON.stringify(Feedback));

    axios
      .get(`${url}addFeedback?token=${token}&feedback=${encodedFeedback}`)
      .then((res) => {
        if (res.status === 200) {
          Alert.alert("Feedback Submitted");
        }
      })
      .catch((err) => {
        Alert.alert(`Error encountered: ${err}`);
      });
    console.log("TOKEN:", token);
    console.log("DOCTOR ID:", doctor.id);
    console.log("PATIENT ID:", userData.id);
    console.log("RATING:", rating);
    console.log("DETAIL:", review);
  };

  return (
    <>
      <View flex={1} backgroundColor={colors.primary}>
        <View
          paddingTop={statusBarHeight}
          paddingHorizontal={spacingPrim}
          width={"100%"}
          backgroundColor={colors.yellow}
        >
          <MenuBar title="Doctor Profile" />
        </View>
        {/* <YStack
          gap={spacingPrim}
          flex={1}
          padding={spacingM}
          paddingBottom={0}
          backgroundColor={colors.primary}
        > */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => setRefresh(true)}
              colors={[colors.yellow]}
              tintColor={colors.white}
            />
          }
          contentContainerStyle={{ gap: 20, padding: spacingM }}
        >
          <YStack
            borderRadius={10}
            gap={5}
            padding={spacingM}
            backgroundColor={colors.white}
            ai={"center"}
          >
            <Image
              source={require("./../../../../assets/docMale.png")}
              style={{ width: 150, height: 150 }}
            />
            <XStack gap={10}>
              <Text
                fontSize={fontSizes.SM}
                color={colors.primary}
                fontFamily={"ArialB"}
              >
                {doctor?.name}
              </Text>
              <Text
                fontFamily={fontFamily.bold}
                fontSize={fontSizes.SM}
                color={colors.yellow}
              >
                4.5
              </Text>
              <Text fontSize={fontSizes.SM}>⭐</Text>
            </XStack>
            {/* <XStack gap={5}>
                <Text fontSize={fontSizes.SM} color={colors.yellow}>
                  {doctor?.specializations.map((s) => `${s.name}`)}
                </Text>
                
                <Text fontSize={fontSizes.SM} color={colors.yellow}>
                  (
                  {doctor?.qualifications.map((q, index) => (
                    <React.Fragment key={q.id}>
                      {q.name}
                      {index < doctor.qualifications.length - 1 && " | "}
                    </React.Fragment>
                  ))}
                  )
                </Text>
              </XStack> */}
            <YStack gap={5}>
              <Text fontSize={fontSizes.SM} color={colors.yellow}>
                {doctor?.specializations.map((s) => (
                  <Text key={s.id}>{s.name}</Text>
                ))}
              </Text>

              <Text
                justifyContent="center"
                fontSize={fontSizes.SM}
                color={colors.yellow}
              >
                {doctor?.qualifications.map((q, index) => (
                  <Text key={q.id}>
                    {q.name}
                    {index < doctor.qualifications.length - 1 && " | "}
                  </Text>
                ))}
              </Text>
            </YStack>
            <XStack
              justifyContent="center"
              flexDirection="row"
              c
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
            <XStack>
              {/* <PrimBtn onPress={modalPress}>
                  <WhiteBold>Write Review</WhiteBold>
                </PrimBtn> */}
              <PrimaryBtn onPress={modalPress} isBold>
                Write Review
              </PrimaryBtn>
            </XStack>
          </YStack>
          <FlatList
            scrollEnabled={false}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={() => setRefresh(true)}
                colors={[colors.yellow]}
                tintColor={colors.white}
              />
            }
            data={doctor?.doctorClinicDALS}
            contentContainerStyle={{ gap: 10 }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card
                flex={1}
                padding={spacingM}
                backgroundColor={colors.white}
                borderRadius={10}
              >
                <YStack flex={1} gap={spacingS}>
                  <Text
                    fontFamily={fontFamily.bold}
                    fontSize={fontSizes.SM}
                    color={colors.yellow}
                  >
                    Clinic Name:
                  </Text>
                  <Text
                    fontFamily={fontFamily.bold}
                    fontSize={fontSizes.SM}
                    color={colors.primary}
                  >
                    {item.clinic.name}
                  </Text>
                  <Text
                    fontFamily={fontFamily.bold}
                    fontSize={fontSizes.SM}
                    color={colors.yellow}
                  >
                    Timings:
                  </Text>
                  <Text
                    fontFamily={fontFamily.bold}
                    fontSize={fontSizes.SM}
                    color={colors.primary}
                  >
                    {item.startTime} - {item.endTime}
                  </Text>

                  <Text
                    fontFamily={fontFamily.regular}
                    fontSize={fontSizes.SM}
                    color={colors.yellow}
                  >
                    Fees
                  </Text>
                  <Text
                    fontFamily={fontFamily.bold}
                    fontSize={fontSizes.SM}
                    color={colors.primary}
                  >
                    Rs. {item.charges}
                  </Text>
                  <View
                    width={"100%"}
                    flexDirection="row"
                    justifyContent="space-between"
                    marginTop={spacingPrim}
                    gap={spacingPrim}
                  >
                    {/* Buttons for actions */}
                    {/* <PrimBtn
                      onPress={() =>
                        console.log(JSON.stringify(doctor, null, 2))
                      }
                    >
                      <WhiteBold>Get Directions</WhiteBold>
                    </PrimBtn> */}
                    <PrimaryBtn isBold>Get Directions</PrimaryBtn>
                    {/* <SecBtn onPress={() => console.log("hellow")}>
                      <Text fontFamily={fontFamily.bold} color={colors.white}>
                        Get Appointment
                      </Text>
                    </SecBtn> */}
                    <SecondaryBtn onPress={() => handleGetAppointment()} isBold>
                      Get Appointment
                    </SecondaryBtn>
                    {/* <SecBtn
                       onPress={() => handleGetAppointment()}>
                       <Text
                       fontFamily={fontFamily.bold}
                        color={colors.white}>
                           Get Appointment
                        </Text>
                        </SecBtn> */}
                  </View>
                </YStack>
              </Card>
            )}
          />
        </ScrollView>
        {/* </YStack> */}
      </View>
      <CustomModal visible={toggleModal} onClose={() => setToggleModal(false)}>
        <YStack
          width={"100%"}
          backgroundColor={"white"}
          borderRadius={10}
          elevation={2}
          padding={spacingM}
          gap={spacingPrim}
        >
          <TouchableOpacity
            style={{
              gap: spacingPrim,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("./../../../../assets/man.png")}
              style={{
                borderRadius: 50,
                width: 75,
                height: 75,
              }}
            />
            <View gap={spacingS}>
              <Text
                color={colors.primary}
                fontFamily={fontFamily.bold}
                fontSize={fontSizes.M}
              >
                {userData.name}
              </Text>
              <Text
                color={colors.yellow}
                fontFamily={fontFamily.regular}
                fontSize={fontSizes.SM}
              >
                {/* Posting publicly across Al Tabib */}
              </Text>
            </View>
          </TouchableOpacity>

          <AirbnbRating
            reviews={["Terrible", "Bad", "OK", "Good", "Amazing"]}
            count={5}
            size={30}
            defaultRating={3}
            onFinishRating={(rating) => setRating(rating)}
          />

          <TextArea
            textAlign="center"
            unstyled
            borderRadius={5}
            borderColor={colors.labelGray}
            borderWidth={1}
            padding={spacingPrim}
            placeholderTextColor={colors.labelGray}
            placeholder="Write your review here"
            fontFamily={"ArialB"}
            onChangeText={setReview}
          />
          <XStack gap={spacingPrim}>
            {/* <SecBtn onPress={() => setToggleModal(false)}>
              <Text fontFamily={fontFamily.bold} color={colors.white}>
                Cancel
              </Text>
            </SecBtn> */}
            <SecondaryBtn onPress={() => setToggleModal(false)} isBold>
              cancel
            </SecondaryBtn>
            {/* <PrimBtn onPress={sendFeedback}>
              <WhiteBold>Submit</WhiteBold>
            </PrimBtn> */}
            <PrimaryBtn onPress={sendFeedback} isBold>
              Submit
            </PrimaryBtn>
          </XStack>
        </YStack>
      </CustomModal>
    </>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({});
