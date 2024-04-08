import React from "react";
import { Text } from "tamagui";
import { colors, fontFamily, fontSizes } from "../styles";

export const WhiteBold = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      fontFamily={fontFamily.bold}
      fontSize={fontSizes.XSM}
      color={colors.white}
    >
      {children}
    </Text>
  );
};
export const PrimBold = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      fontFamily={fontFamily.bold}
      fontSize={fontSizes.SM}
      color={colors.primary}
    >
      {children}
    </Text>
  );
};
export const PrimRegular = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      fontFamily={fontFamily.regular}
      fontSize={fontSizes.M}
      color={colors.primary}
    >
      {children}
    </Text>
  );
};

export const LinkText = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      fontFamily={fontFamily.bold}
      fontSize={fontSizes.SM}
      color={colors.linkBlue}
    >
      {children}
    </Text>
  );
};

export const YellowBold = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      fontFamily={fontFamily.bold}
      fontSize={fontSizes.M}
      color={colors.yellow}
    >
      {children}
    </Text>
  );
};
export const YellowRegular = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      fontFamily={fontFamily.regular}
      fontSize={fontSizes.M}
      color={colors.yellow}
    >
      {children}
    </Text>
  );
};
