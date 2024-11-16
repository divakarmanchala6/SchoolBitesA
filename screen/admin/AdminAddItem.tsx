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
import { addMenuItem, updateMenuItem } from "../../utils/storage";

const AddExpense = () => {
  const [menuTitle, setMenuTitle] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { menuItem } = route.params || {};

  useEffect(() => {
    if (menuItem) {
      setMenuTitle(menuItem.menuTitle);
      setMenuPrice(menuItem.menuPrice);
    }
  }, [menuItem]);

  const handleOnMenuItem = async () => {
    try {
      if (menuItem) {
        await updateMenuItem({ ...menuItem, menuTitle, menuPrice });
      } else {
        const newItem = {
          id: uuid.v4(),
          menuTitle,
          menuPrice,
        };
        await addMenuItem(newItem);
      }
      navigation.navigate("Home", { updateState: "items" });
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
        <Text style={styles.buttonText}>
          {menuItem ? "Update To Menu" : "Add To Menu"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff5f5",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    margin: 10,
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
    borderColor: "#e74c3c",
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: "#fff5f5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    borderColor: "#e74c3c",
    backgroundColor: "#fff5f5",
    borderWidth: 1,
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
    color: "#e74c3c",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default AddExpense;
