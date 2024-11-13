import AsyncStorage from "@react-native-async-storage/async-storage";

const MENU_ITEM_KEY = "MENUITEMS";

export const saveMenuItem = async (menuItem) => {
  try {
    await AsyncStorage.setItem(MENU_ITEM_KEY, JSON.stringify(menuItem));
  } catch (e) {
    console.log("Faild to Save Menu Item", e);
  }
};

export const loadMenuItems = async () => {
  try {
    const menuItemJson = await AsyncStorage.getItem(MENU_ITEM_KEY);
    return menuItemJson ? JSON.parse(menuItemJson) : [];
  } catch (e) {
    console.error("Faild to Load Menu Items", e);
    return [];
  }
};

export const addMenuItem = async (menuItem) => {
  const menuItems = await loadMenuItems();
  menuItems.push(menuItem);
  await saveMenuItem(menuItems);
};

export const deleteMenuItem = async (id) => {
  const menuItems = await loadMenuItems();
  const filteredItems = menuItems.filter((item) => item.id !== id);
  await saveMenuItem(filteredItems);
};
