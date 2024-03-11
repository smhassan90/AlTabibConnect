import { StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuBar from "~/app/components/MenuBar";
import { colors } from "~/app/styles";

const Lab = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:colors.primary,paddingHorizontal:10,paddingBottom:10}}>
      <MenuBar title="Labs" />
      <Text>Lab</Text>
    </SafeAreaView>
  );
};

export default Lab;

const styles = StyleSheet.create({});
