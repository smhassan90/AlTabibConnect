import React from "react";
import { View } from "tamagui";
import DocDetails from "~/app/components/home/DocDetails";
import MenuBar from "~/app/components/MenuBar";
import { colors, spacingPrim } from "~/app/styles";
import constants from "expo-constants";

const statusBarHeight = constants.statusBarHeight;

const Page = () => {

  return (
    <View flex={1} backgroundColor={colors.primary}>
      <View
        paddingTop={statusBarHeight}
        paddingHorizontal={spacingPrim}
        width={"100%"}
        backgroundColor={colors.yellow}
      >
        <MenuBar title="" />
      </View>
      <DocDetails heading="Well Known Doctors" />
    </View>
  );
};

export default Page;
