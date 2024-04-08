import { TouchableOpacity } from "react-native";
import React from "react";
import { buttons, colors, fontFamily, fontSizes } from "../styles";
import { Text } from "tamagui";

export const PrimBtn = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[buttons.primaryBtn, { flex: 1 }]}
    >
      <Text color={colors.white} fontFamily={fontFamily.bold}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
export const SecBtn = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[buttons.secBtn, { flex: 1 }]}>
      {children}
    </TouchableOpacity>
  );
};
export const RedBtn = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[buttons.redBtn, { flex: 1 }]}>
      {children}
    </TouchableOpacity>
  );
};
