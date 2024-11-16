import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.buttonText}>D</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    marginTop: 10,
    marginRight: 10,
  },
  circleButton: {
    width: 40,
    height: 40,
    backgroundColor: "#ef4f5f",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomHeader;
