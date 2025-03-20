import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { removeData, StorageKeys } from "@/store";
import { router } from "expo-router";

const Home = () => {
  const signout = async () => {
    await removeData(StorageKeys.JWT);
    router.replace("/(auth)");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={signout}>
        <Text
          style={{
            color: "red",
            fontSize: 22,
            fontWeight: "500",
          }}
        >
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
