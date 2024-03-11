import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import BookingComponents from "~/app/components/BookingComponents";
import { colors } from "~/app/styles";

const Page = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:colors.primary,paddingHorizontal:10,paddingBottom:10}}>
      <BookingComponents />
    </SafeAreaView>
  );
};

export default Page;
