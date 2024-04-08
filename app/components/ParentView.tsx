import { View } from "react-native";
import React from "react";
import constants from "expo-constants";
import { borders, colors, spacingPrim, spacingS } from "../styles";

const statusBarHeight = constants.statusBarHeight;

const Header = ({ children }: { children: any }) => {
  return (
    <View
      style={{
        paddingTop: statusBarHeight,
        paddingHorizontal: spacingPrim,
        width: "100%",
        backgroundColor: colors.yellow,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: borders.L,
        borderBottomRightRadius: borders.L,
        paddingBottom: spacingS,
      }}
    >
      {children}
    </View>
  );
};

export default Header;
