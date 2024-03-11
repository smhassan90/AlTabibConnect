import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import GetAppComponent from "~/app/components/GetAppComponent";
import { colors } from "~/app/styles";

const Page = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:colors.primary,paddingHorizontal:10,paddingBottom:10}}>
      <GetAppComponent />
    </SafeAreaView>
  );
};

export default Page;
