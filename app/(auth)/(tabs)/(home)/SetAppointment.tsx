import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import BookingComponents from "~/app/components/BookingComponents";
import { colors } from "~/app/styles";
import { View } from "tamagui";

const Page = () => {
  return (
    <View flex={1} backgroundColor={colors.primary}>
      <BookingComponents />
    </View>
  );
};

export default Page;
