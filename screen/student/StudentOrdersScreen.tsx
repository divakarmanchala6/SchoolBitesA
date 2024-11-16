import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { deleteOrderItem, loadOrderItems } from "../../utils/storage";

const StudentOrdersScreen = () => {
  const [orders, setOrders] = useState([]);

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

  const renderOrderCard = ({ item }) => (
    <View style={styles.card}>
      <View>
        {item.items.map((menu) => (
          <Text key={menu.id}>
            {menu.menuTitle} - ₹{menu.menuPrice}
          </Text>
        ))}
      </View>
      <Text>Total Amount: ₹{item.totalAmount}</Text>
      <View style={styles.orderStatusContainer}>
        <Text>Order Statu: </Text>
        <Text style={{ textTransform: "capitalize" }}>{item.orderStatus}</Text>
      </View>
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
    marginTop: 100,
    textAlign: "center",
    fontSize: 18,
    color: "#e74c3c",
  },
  orderStatusContainer: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
  },
});

export default StudentOrdersScreen;
