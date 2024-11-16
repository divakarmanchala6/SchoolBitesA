import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import AdminMenuItemsScreen from "./AdminMenuItemsScreen";
import AdminOrdersScreen from "./AdminOrdersScreen";
import CustomHeader from "../../components/CustomHeader";

const AdminScreen = () => {
  const route = useRoute();
  const { updateState } = route.params || {};
  const [activeTab, setActiveTab] = useState(
    updateState ? updateState : "orders"
  );
  const navigation = useNavigation();

  const onPressAdminItemsButton = () => {
    setActiveTab("items");
  };

  const onPressAdminOrdersButton = () => {
    setActiveTab("orders");
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
              onPress={onPressAdminItemsButton}
            >
              <Text style={styles.buttonsText}>Items</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.ordersButton,
                activeTab === "orders" && styles.activeTab,
              ]}
              onPress={onPressAdminOrdersButton}
            >
              <Text style={styles.buttonsText}>Orders</Text>
            </TouchableOpacity>
          </View>
        </View>
        {activeTab === "items" ? (
          <View style={{ flex: 1 }}>
            <AdminMenuItemsScreen />
          </View>
        ) : (
          <AdminOrdersScreen />
        )}
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
    textAlign: "left",
    marginBottom: 20,
    padding: 20,
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
    fontFamily: "Roboto",
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
    marginRight: 5,
    marginLeft: 5,
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
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
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
    height: 40,
    width: 90,
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

export default AdminScreen;
