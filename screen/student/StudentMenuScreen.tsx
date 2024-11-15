import React, { useState, useEffect } from "react";
import { addCartItem, loadMenuItems } from "../../utils/storage";
import { Entypo } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

const StudentMenuScreen = () => {
  const [studentMenuItems, setStudentMenuItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      const items = await loadMenuItems();
      setStudentMenuItems(items);
    };
    fetchItems();
  }, []);

  const handleOnAddToCart = async (item) => {
    try {
      const cartItem = {
        id: uuid.v1(),
        menuTitle: item.menuTitle,
        menuPrice: item.menuPrice,
      };
      await addCartItem(cartItem);
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while saving the dish in the cart"
      );
    }
  };

  const renderMenuItems = ({ item }) => {
    return (
      <View style={styles.menuItemContainer}>
        <View style={styles.menuItemDetails}>
          <Text style={styles.menuTitle}>{item.menuTitle}</Text>
          <Text style={styles.menuPrice}>₹{item.menuPrice}</Text>
        </View>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleOnAddToCart(item)}
          >
            <Entypo
              name="plus"
              size={16}
              color="#e74c3c"
              style={styles.addButtonIcon}
            />
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={studentMenuItems}
        renderItem={renderMenuItems}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuItemDetails: {
    flexDirection: "column",
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#293140",
  },
  menuPrice: {
    fontSize: 14,
    color: "#293140",
  },
  buttonIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonIcon: {
    marginLeft: 10,
  },
  addButtonContainer: {
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e74c3c",
    backgroundColor: "#fff5f5",
  },
  addButtonText: {
    color: "#e74c3c",
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 5,
  },
  addButtonIcon: {
    marginLeft: 5,
  },
});

export default StudentMenuScreen;
