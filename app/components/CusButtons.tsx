import { Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { buttons, colors, fontFamily, fontSizes } from "../styles";
import { Button, ButtonText, Text } from "tamagui";

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

export const PrimaryBtn = ({
  onPress,
  children,
  isBold = false,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Button
      onPress={onPress}
      backgroundColor={colors.primary}
      flex={1}
      pressStyle={{
        backgroundColor: colors.primaryLight,
        borderWidth: 0,
        color: "black",
      }}
    >
      <ButtonText style={{ fontWeight: isBold ? "bold" : "normal" }}>{children}</ButtonText>
    </Button>
  );
};

export const SecondaryBtn = ({
  onPress,
  children,
  isBold
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Button
      onPress={onPress}
      backgroundColor={colors.yellow}
      flex={1}
      pressStyle={{
        backgroundColor: colors.yellowLight,
        borderWidth: 0,
        color: "black",
      }}
    >
      <ButtonText style={{ fontWeight: isBold ? "bold" : "normal" }}>{children}</ButtonText>
    </Button>
  );
};
// export const SecBtn = ({
//   onPress,
//   children,
// }: {
//   onPress: () => void;
//   children: React.ReactNode;
// }) => {
//   return (
//     <TouchableOpacity  onPress={onPress} style={[buttons.secBtn, { flex: 1 }]}>
//       {children}
//     </TouchableOpacity>
//   );
// };

export const SecBtn = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        buttons.secBtn,
        { flex: 1 },
        { opacity: pressed ? 0.4 : 1 },
        // No need to add opacity effect since we're changing text color instead
      ]}
    >
      {({ pressed }) => {
        // Clone the children and modify the Text component's color prop
        return React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Text) {
            return React.cloneElement(child, {
              color: pressed ? "black" : colors.white,
              fontFamily: fontFamily.bold,
            });
          }
          return child;
        });
      }}
    </Pressable>
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
