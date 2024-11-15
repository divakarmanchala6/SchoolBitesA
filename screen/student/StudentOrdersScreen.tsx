import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { loadOrderItems } from "../../utils/storage";

const initialOrdersData = [
  {
    id: "0bfad197-a321-11ef-b0d5-6bbf600327eabc",
    items: [
      {
        id: "e6c64855-a320-11ef-b0d5-6bbf600327ea",
        menuPrice: "50",
        menuTitle: "Idly",
      },
      {
        id: "09bb41d6-a321-11ef-b0d5-6bbf600327ea",
        menuPrice: "580",
        menuTitle: "Hola",
      },
    ],
    orderStatus: "ordered",
    orderedBy: "Divakar Manchala",
    totalAmount: 630,
  },
  {
    id: "7c5e7c79-a321-11ef-b0d5-6bbf600327eabc",
    items: [
      {
        id: "7b144938-a321-11ef-b0d5-6bbf600327ea",
        menuPrice: "80",
        menuTitle: "Vada",
      },
    ],
    orderStatus: "prepared",
    orderedBy: "Divakar Manchala",
    totalAmount: 80,
  },
  {
    id: "0bfad197-a321-11ef-b0d5-6bbf600327eac",
    items: [
      {
        id: "e6c64855-a320-11ef-b0d5-6bbf600327ea",
        menuPrice: "50",
        menuTitle: "Idly",
      },
      {
        id: "09bb41d6-a321-11ef-b0d5-6bbf600327ea",
        menuPrice: "580",
        menuTitle: "Hola",
      },
    ],
    orderStatus: "ordered",
    orderedBy: "Divakar Manchala",
    totalAmount: 630,
  },
  {
    id: "7c5e7c79-a321-11ef-b0d5-6bbf600327eac",
    items: [
      {
        id: "7b144938-a321-11ef-b0d5-6bbf600327ea",
        menuPrice: "80",
        menuTitle: "Vada",
      },
    ],
    orderStatus: "prepared",
    orderedBy: "Divakar Manchala",
    totalAmount: 80,
  },
  {
    id: "0bfad197-a321-11ef-b0d5-6bbf600327eab",
    items: [
      {
        id: "e6c64855-a320-11ef-b0d5-6bbf600327ea",
        menuPrice: "50",
        menuTitle: "Idly",
      },
      {
        id: "09bb41d6-a321-11ef-b0d5-6bbf600327ea",
        menuPrice: "580",
        menuTitle: "Hola",
      },
    ],
    orderStatus: "ordered",
    orderedBy: "Divakar Manchala",
    totalAmount: 630,
  },
  {
    id: "7c5e7c79-a321-11ef-b0d5-6bbf600327eab",
    items: [
      {
        id: "7b144938-a321-11ef-b0d5-6bbf600327ea",
        menuPrice: "80",
        menuTitle: "Vada",
      },
    ],
    orderStatus: "prepared",
    orderedBy: "Divakar Manchala",
    totalAmount: 80,
  },
  {
    id: "0bfad197-a321-11ef-b0d5-6bbf600327ea",
    items: [
      {
        id: "e6c64855-a320-11ef-b0d5-6bbf600327ea",
        menuPrice: "50",
        menuTitle: "Idly",
      },
      {
        id: "09bb41d6-a321-11ef-b0d5-6bbf600327ea",
        menuPrice: "580",
        menuTitle: "Hola",
      },
    ],
    orderStatus: "ordered",
    orderedBy: "Divakar Manchala",
    totalAmount: 630,
  },
  {
    id: "7c5e7c79-a321-11ef-b0d5-6bbf600327ea",
    items: [
      {
        id: "7b144938-a321-11ef-b0d5-6bbf600327ea",
        menuPrice: "80",
        menuTitle: "Vada",
      },
    ],
    orderStatus: "prepared",
    orderedBy: "Divakar Manchala",
    totalAmount: 80,
  },
]; // Start with an empty array for safety

const StudentOrdersScreen = () => {
  const [orders, setOrders] = useState(initialOrdersData);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const items = await loadOrderItems();
        console.log(items);
        if (Array.isArray(items)) {
          setOrders(items);
        } else {
          console.warn(
            "loadOrderItems did not return an array. Using fallback data."
          );
          setOrders(initialOrdersData); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders(initialOrdersData); // Fallback to empty array on error
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    // Ensure `orders` is an array before filtering
    if (Array.isArray(orders)) {
      setCurrentOrders(
        orders.filter((order) => order.orderStatus === "ordered")
      );
      setPastOrders(orders.filter((order) => order.orderStatus === "prepared"));
    } else {
      console.error("Orders is not an array:", orders);
    }
  }, []);

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
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Current Orders</Text>
      <FlatList
        data={currentOrders}
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
