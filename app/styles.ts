import { red } from "@tamagui/themes";
import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height} = Dimensions.get('window');
console.log(width,"width")
console.log(height,"height")
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
  primaryLight:"#0066a199",
  primaryDark: "#2d3181",
  gradSec: "#23333a",
  black: "#525252",
  white: "#ffffff",
  labelGray: "#a1a1a1",
  linkBlue: "#00a2ff",
  yellow: "#ffa600",
  yellowLight:"#ffa60180",
  green: "#3bad6d",
  red: "#ff5757",
  redLight: "#ff000080",
  lightGray: "#f5f5f5",
  border: "#e6e6e6",
};

const fontsFams = {
  ArialB: "ArialB",
};
export { fontsFams };

export const getResponsiveFontSize = (baseFontSize:any) => {
  if (width <= 320) return baseFontSize - 3;
  if (width <= 350) return baseFontSize - 2;
  if (width <= 375) return baseFontSize - 1.3;
  if (width <= 768) return baseFontSize;
  return baseFontSize + 2;
};

const fontSizes = {
  XSM: getResponsiveFontSize(15),
  SM: getResponsiveFontSize(16),
  M: getResponsiveFontSize(18),
  L: getResponsiveFontSize(20),
  XL: getResponsiveFontSize(24),
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
