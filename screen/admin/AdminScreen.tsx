import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomHeader from "../../components/CustomHeader";
import AdminMenuItemsScreen from "./AdminMenuItemsScreen";
import AdminOrdersScreen from "./AdminOrdersScreen";

const AdminScreen = () => {
  const route = useRoute();
  const { updateState } = route.params || {};
  const [activeTab, setActiveTab] = useState(updateState || "orders");
  const navigation = useNavigation();

  // Handle button press to toggle active tab
  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  // Render the active screen based on selected tab
  const renderActiveTabScreen = () => {
    if (activeTab === "items") {
      return <AdminMenuItemsScreen />;
    }
    return <AdminOrdersScreen />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <CustomHeader />
      <View style={styles.adminMainContainer}>
        <View style={styles.adminQuoteCard}>
          <Text style={styles.quoteText}>
            A recipe has no soul. You, as the chef, must bring soul to the
            recipe.
          </Text>
        </View>
        <View style={styles.adminSectionContainer}>
          <View style={styles.adminButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.ordersButton,
                activeTab === "items" && styles.activeTab,
              ]}
              onPress={() => handleTabPress("items")}
            >
              <Text style={styles.buttonsText}>Items</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.ordersButton,
                activeTab === "orders" && styles.activeTab,
              ]}
              onPress={() => handleTabPress("orders")}
            >
              <Text style={styles.buttonsText}>Orders</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Render the content of the active tab */}
        {renderActiveTabScreen()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  adminMainContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    flex: 1,
  },
  adminQuoteCard: {
    height: 180,
    borderRadius: 10,
    backgroundColor: "#ef4f5f",
    justifyContent: "center",
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  quoteText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "left",
    lineHeight: 25,
  },
  adminSectionContainer: {
    shadowColor: "#000",
  },
  adminButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ordersButton: {
    borderRadius: 10,
    width: 100,
    marginHorizontal: 5,
    paddingBottom: 3,
  },
  buttonsText: {
    color: "#e74c3c",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
  },
  activeTab: {
    borderBottomWidth: 4,
    borderColor: "#e74c3c",
  },
});

export default AdminScreen;
