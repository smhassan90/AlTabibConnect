import { StyleSheet } from "react-native";

export const spacingS = 5;
export const spacingPrim = 10;
export const spacingM = 15;
export const spacingL = 20;

export const paddingS = 5;
export const paddingM = 10;
export const paddingL = 15;
export const paddingXL = 20;

export const colors = {
  primary: "#0066a1",
  primaryDark: "#2d3181",
  gradSec: "#23333a",
  black: "#525252",
  white: "#ffffff",
  labelGray: "#a1a1a1",
  linkBlue: "#00a2ff",
  yellow: "#ffa600",
  green: "#3bad6d",
  red: "#ff5757",
  lightGray: "#f5f5f5",
  border: "#e6e6e6",
};

const fontsFams = {
  ArialB: "ArialB",
};
export { fontsFams };

const fontSizes = {
  XSM: 15,
  SM: 16,
  M: 18, //Doc Name,
  L: 20,
  XL: 24,
};
export { fontSizes };

const borders = {
  SM: 5,
  M: 10,
  L: 15,
};
export { borders };

const fontFamily = {
  bold: "ArialB",
  regular: "Arial",
};
export { fontFamily };

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
    //flex:1,
    borderRadius: 5,
    backgroundColor: colors.yellow,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  terBtn: {
    borderRadius: 5,
    backgroundColor: colors.green,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  redBtn: {
    borderRadius: 5,
    backgroundColor: colors.red,
    paddingVertical: 10,
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
