import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DocDetails from "~/app/components/home/DocDetails";
import MenuBar from "~/app/components/MenuBar";
import { colors } from "~/app/styles";

const Page = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:colors.primary,paddingHorizontal:10,paddingBottom:10}}>
      <MenuBar title="" />
      <DocDetails heading="Well Known Doctors" />
    </SafeAreaView>
  );
};

export default Page;
