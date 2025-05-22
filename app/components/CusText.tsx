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

export const PrimRegulars = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      fontFamily={fontFamily.regular}
      fontSize={fontSizes.SM}
      color={colors.primary}
    >
      {children}
    </Text>
  );
};

export const LinkText = ({ children,style }: { children: React.ReactNode }) => {
  return (
    <Text
      fontFamily={fontFamily.bold}
      fontSize={fontSizes.SM}
      color={colors.linkBlue}
      style={style}
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

export const CusText = ({ color, children, bold, size }: TextProps) => {
  return (
    <Text
      
      fontFamily={bold ? 'ArialB' : 'Arial'}
      fontSize={
        size == 'sm' ? 12 : size == 'md' ? 16 : size == 'lg' ? 20 : size == 'xl' ? 28 : undefined
      }
      color={
        color === 'white'
          ? 'white'
          : color === 'primary'
            ? colors.primary
            : color === 'yellow'
              ? colors.yellow
               : color === 'red'
               ? colors.red
              : undefined
      }>
      {children}
    </Text>
  );
};
