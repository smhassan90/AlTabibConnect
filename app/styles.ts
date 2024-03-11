import { StyleSheet } from "react-native";

export const colors = {
  primary: "#0066a1",
  primaryDark: "#2d3181",
  gradSec: "#23333a",
  black: "#525252",
  white: "#ffffff",
  labelGray: "#8a8a8a",
  linkBlue: "#00a2ff",
  yellow: "#ffa600",
  green: "#0ab99c",
  red: "#ff0000",
  lightGray: "#f5f5f5",
  border: "#e6e6e6",
};

const fontsFams = {
  ArialB: "ArialB",
};
export { fontsFams };

const fontSizes = {
  XL: 32,
  L: 22,
  M: 18,
  SM: 16,
  XSM: 12,
};
export { fontSizes };

const buttons = StyleSheet.create({
  primaryBtn: {
    //flex:1,
    borderRadius: 5,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  secBtn: {
    width: 300,
    //flex:1,
    borderRadius: 10,
    backgroundColor: colors.yellow,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  terBtn: {
    width: 300,
    //flex:1,
    borderRadius: 10,
    backgroundColor: colors.green,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  redBtn: {
    width: 300,
    //flex:1,
    borderRadius: 10,
    backgroundColor: colors.red,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
export { buttons };

const textStyles = StyleSheet.create({
  heading: {
    fontFamily: fontsFams.ArialB,
    color: colors.white,
    fontSize: fontSizes.XL,
  },
  subHeading: {
    fontFamily: fontsFams.ArialB,
    color: colors.black,
    fontSize: fontSizes.L,
  },
  normal: {
    fontFamily: fontsFams.ArialB,
    color: "#eeeeee",
    fontSize: fontSizes.SM,
  },
  subNormal: {
    fontFamily: fontsFams.ArialB,
    color: colors.black,
    fontSize: fontSizes.SM,
  },
  small: {
    fontFamily: fontsFams.ArialB,
    color: colors.black,
    fontSize: fontSizes.XSM,
  },
  whiteFont: {
    fontFamily: fontsFams.ArialB,
    color: colors.white,
  },
});
export { textStyles };
