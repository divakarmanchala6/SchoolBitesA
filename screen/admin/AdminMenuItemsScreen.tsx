import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { deleteMenuItem, loadMenuItems } from "../../utils/storage";
import { Feather, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

const AdminMenuItemsScreen = () => {
  const [menuItems, setMenuItems] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchMenuItem = async () => {
      const items = await loadMenuItems();
      setMenuItems(items);
    };
    fetchMenuItem();
  }, []);

  const onPressDeleteItem = async (id) => {
    await deleteMenuItem(id);
    const updatedMenuItems = menuItems.filter((item) => item.id !== id);
    setMenuItems(updatedMenuItems);
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItemContainer}>
      <View style={styles.menuItemDetails}>
        <Text style={styles.menuTitle}>{item.menuTitle}</Text>
        <Text style={styles.menuPrice}>₹{item.menuPrice}</Text>
      </View>
      <View style={styles.buttonIconsContainer}>
        <TouchableOpacity style={styles.buttonIcon}>
          <Feather name="edit" size={28} color="#008080" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonIcon}
          onPress={() => onPressDeleteItem(item.id)}
        >
          <MaterialCommunityIcons name="delete" size={32} color="#DC143C" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Add Item")}
          style={styles.addButton}
        >
          <Entypo
            name="plus"
            size={20}
            color="#e74c3c"
            style={styles.addButtonIcon}
          />
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>
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

export default AdminMenuItemsScreen;
