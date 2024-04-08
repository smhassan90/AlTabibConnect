import React from "react";
import { Text, XStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { colors, fontSizes, spacingPrim } from "../styles";

const MenuBar = ({title}:{title?:string}) => {
  const navigation = useNavigation();

  const onToggle = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <XStack backgroundColor={colors.yellow} alignItems="center" marginVertical={10}>
      <TouchableOpacity onPress={onToggle}>
        <Ionicons name="menu" size={28} color="white" />
      </TouchableOpacity>
      <XStack gap={spacingPrim} flex={1}>
        {title ? (
          <Text
            marginLeft={spacingPrim}
            color={"white"}
            fontSize={fontSizes.L}
            fontFamily={"ArialB"}
          >
            {title}
          </Text>
        ) : (
          <Text
            color={"white"}
            fontSize={fontSizes.XL}
            marginLeft={spacingPrim}
            fontFamily={"ArialB"}
          >
            Al-Tabib Connect
          </Text>
        )}
      </XStack>
    </XStack>
  );
};

export default MenuBar;
