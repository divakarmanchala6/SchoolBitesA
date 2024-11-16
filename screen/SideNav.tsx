import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SideNav = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Student Home")}
      >
        <Text style={styles.buttonText}>Student</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ef4f5f", // Blue color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20, // Space between buttons
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SideNav;
