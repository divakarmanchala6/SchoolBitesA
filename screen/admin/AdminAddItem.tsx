import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import uuid from "react-native-uuid";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { addMenuItem } from "../../utils/storage";

const AddExpense = () => {
  const [menuTitle, setMenuTitle] = useState("");
  const [menuPrice, setMenuPrice] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  const handleOnMenuItem = async () => {
    try {
      const newItem = {
        id: uuid.v4(),
        menuTitle,
        menuPrice,
      };
      await addMenuItem(newItem);
      navigation.navigate("Home");
    } catch (e) {
      Alert.alert(
        "Error",
        "An error occurred while saving the expense in addExpense Screen"
      );
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={menuTitle}
        onChangeText={setMenuTitle}
        style={styles.input}
      />
      <TextInput
        keyboardType="numeric"
        placeholder="Amount"
        value={menuPrice}
        onChangeText={setMenuPrice}
        style={styles.input}
        autoCorrect={false} // Disable auto-correction
      />
      <TouchableOpacity style={styles.button} onPress={handleOnMenuItem}>
        <Text style={styles.buttonText}>Add To Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F4F4F9",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: "#00bef9",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default AddExpense;