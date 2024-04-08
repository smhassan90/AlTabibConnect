import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import GetAppComponent from "~/app/components/GetAppComponent";
import { colors } from "~/app/styles";
import { View } from "tamagui";

const Page = () => {
  return (
    <View flex={1} backgroundColor={colors.primary}>
      <GetAppComponent />
    </View>
  );
};

export default Page;
