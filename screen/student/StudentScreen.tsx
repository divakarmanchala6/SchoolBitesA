import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import StudentMenuScreen from "./StudentMenuScreen";
import StudentCartScreen from "./StudentCartScreen";
import StudentOrdersScreen from "./StudentOrdersScreen";
import CustomHeader from "../../components/CustomHeader";

const StudentScreen = () => {
  const [activeTab, setActiveTab] = useState("menu");

  const onPressMenu = () => {
    setActiveTab("menu");
  };

  const onPressCart = () => {
    setActiveTab("cart");
  };

  const onPressOrders = () => {
    setActiveTab("orders");
  };

  return (
    <SafeAreaView style={styles.studentScreenMainContainer}>
      <CustomHeader />
      <View style={styles.studentTabsContainer}>
        <TouchableOpacity
          style={[
            styles.ordersButton,
            activeTab === "menu" && styles.activeTab,
          ]}
          onPress={onPressMenu}
        >
          <Text style={styles.tabButtonsText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.ordersButton,
            activeTab === "cart" && styles.activeTab,
          ]}
          onPress={onPressCart}
        >
          <Text style={styles.tabButtonsText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.ordersButton,
            activeTab === "orders" && styles.activeTab,
          ]}
          onPress={onPressOrders}
        >
          <Text style={styles.tabButtonsText}>Orders</Text>
        </TouchableOpacity>
      </View>
      {activeTab === "menu" && <StudentMenuScreen />}
      {activeTab === "cart" && <StudentCartScreen />}
      {activeTab === "orders" && <StudentOrdersScreen />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  studentScreenMainContainer: {
    marginTop: 26,
    padding: 10,
    flex: 1,
    backgroundColor: "#ffffff",
  },
  studentTabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ordersButton: {
    borderRadius: 10,
    width: 80,
    marginRight: 5,
    marginLeft: 5,
    paddingBottom: 3,
  },
  tabButtonsText: {
    color: "#e74c3c",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: "#e74c3c",
  },
});

export default StudentScreen;
