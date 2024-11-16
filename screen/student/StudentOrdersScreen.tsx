import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { deleteOrderItem, loadOrderItems } from "../../utils/storage";

const StudentOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  console.log(orders.length);

  useEffect(() => {
    const fetchOrders = async () => {
      const items = await loadOrderItems();
      setOrders(items);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (Array.isArray(orders)) {
      setCurrentOrders(
        orders.filter((order) => order.orderStatus === "ordered")
      );
      setPastOrders(orders.filter((order) => order.orderStatus === "prepared"));
    } else {
      console.error("Orders is not an array:", orders);
    }
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
      <Text>Order Status: {item.orderStatus}</Text>
      <Button title="delete" onPress={() => onPressDeleteOrder(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Current Orders</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderCard}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No current orders.</Text>
        }
      />

      <Text style={styles.sectionTitle}>Past Orders</Text>
      <FlatList
        data={pastOrders}
        renderItem={renderOrderCard}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No past orders.</Text>
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
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
    color: "#888",
  },
});

export default StudentOrdersScreen;
