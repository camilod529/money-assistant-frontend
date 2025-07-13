import { Locales } from "@/lib";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Explore() {
  return (
    <View>
      <Text>{Locales.t("explore")}</Text>
    </View>
  );
}
