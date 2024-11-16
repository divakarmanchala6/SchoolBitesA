import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import {
  deleteOrderItem,
  loadOrderItems,
  updateOrderStatus,
} from "../../utils/storage";

const AdminOrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const items = await loadOrderItems();
      setOrders(items);
    };
    fetchOrders();
  }, []);

  const onPressDeleteOrder = (id) => {
    deleteOrderItem(id);
    const filteredOrders = orders.filter((item) => item.id !== id);
    setOrders(filteredOrders);
  };

  const handleOrderUpdate = async (id, value) => {
    await updateOrderStatus(id, value);
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, orderStatus: value } : order
    );
    setOrders(updatedOrders);
  };

  const renderOrderUpdate = (id, currentStatus) => (
    <View style={styles.orderStatusContainer}>
      <Text style={styles.label}>Update Order Status:</Text>
      <RNPickerSelect
        onValueChange={(value) => handleOrderUpdate(id, value)}
        items={[
          { label: "Ordered", value: "ordered" },
          { label: "Received", value: "received" },
          { label: "Picked", value: "picked" },
          { label: "Prepared", value: "prepared" },
        ]}
        placeholder={{ label: "Select Status", value: null }}
        value={currentStatus} // Set the default value
        style={pickerSelectStyles}
      />
    </View>
  );

  const renderOrderCard = ({ item }) => (
    <View style={styles.card}>
      <Text>Ordered By: {item.orderedBy}</Text>
      <View>
        {item.items.map((menu) => (
          <Text key={menu.id}>
            {menu.menuTitle} - ₹{menu.menuPrice}
          </Text>
        ))}
      </View>
      <Text>Total Amount: ₹{item.totalAmount}</Text>
      <Text>Order Status: {item.orderStatus}</Text>
      {renderOrderUpdate(item.id, item.orderStatus)}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrderCard}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No current orders.</Text>
        }
      />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    backgroundColor: "#f5f5f5",
    fontSize: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 180,
    color: "#e74c3c",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
  },

  orderStatusContainer: {
    marginTop: 10,
  },
});

export default AdminOrderScreen;
