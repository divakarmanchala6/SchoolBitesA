import React, { useState, useEffect } from "react";
import uuid from "react-native-uuid";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import {
  loadCartItems,
  deleteCartItem,
  emptyCartItems,
  addOrderItem,
} from "../../utils/storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const randomNames = [
  "Divakar Manchala",
  "Pavan Shyamendra",
  "Rohan",
  "Donalald J Trump",
  "Musk Mama",
];

const StudentCartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await loadCartItems();
      setCartItems(items);
    };
    fetchItems();
  }, []);

  const onPressPlaceOrder = async () => {
    try {
      if (cartItems.length === 0) {
        Alert.alert(
          "Empty Cart",
          "Please add items to the cart before placing an order."
        );
        return;
      }

      const orderItem = {
        id: uuid.v1(),
        items: cartItems,
        totalAmount: cartItems.reduce(
          (sum, item) => sum + parseInt(item.menuPrice),
          0
        ),
        orderStatus: "ordered",
        orderedBy: randomNames[Math.floor(Math.random() * randomNames.length)],
      };

      setOrders([...orders, orderItem]);
      setCartItems([]);
      await addOrderItem(orderItem);
      await emptyCartItems();
      Alert.alert("Success", "Your order has been placed successfully!");
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while placing the order. Please try again."
      );
    }
  };

  const onPressDeleteCartItem = async (id) => {
    await deleteCartItem(id);
    const udateCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(udateCartItems);
  };

  const renderCarItem = ({ item }) => (
    <View style={styles.menuItemContainer}>
      <View style={styles.menuItemDetails}>
        <Text style={styles.menuTitle}>{item.menuTitle}</Text>
        <Text style={styles.menuPrice}>₹{item.menuPrice}</Text>
      </View>
      <View style={styles.buttonIconsContainer}>
        <TouchableOpacity
          style={styles.buttonIcon}
          onPress={() => onPressDeleteCartItem(item.id)}
        >
          <MaterialCommunityIcons name="delete" size={32} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {cartItems.length === 0 && (
        <View style={styles.emtpyCartContainer}>
          <Text style={styles.emptyCartText}>Your Cart Empty</Text>
        </View>
      )}
      <FlatList
        data={cartItems}
        renderItem={renderCarItem}
        keyExtractor={(item) => item.id}
      />
      {cartItems.length > 0 && (
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={onPressPlaceOrder}
          >
            <Text style={styles.addButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emtpyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyCartText: {
    textAlign: "center",
    fontSize: 22,
    color: "#e74c3c",
  },
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e74c3c",
    backgroundColor: "#fff5f5",
  },
  addButtonText: {
    color: "#e74c3c",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  addButtonIcon: {
    marginLeft: 5,
  },
});

export default StudentCartScreen;
