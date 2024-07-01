import React from "react";
import { Modal, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import { View } from "tamagui";
import { spacingL, spacingPrim } from "../styles";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  children,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
    >
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        style={
          {
            flexDirection: "column",
            padding: spacingL,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          } as ViewStyle
        }
      >
        {children}
      </BlurView>
    </Modal>
  );
};
