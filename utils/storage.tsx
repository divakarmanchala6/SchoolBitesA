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

export const updateMenuItem = async (updatedMenuItem) => {
  const menuItems = await loadMenuItems();
  const index = menuItems.findIndex((item) => item.id === updatedMenuItem.id);
  if (index > -1) {
    menuItems[index] = updatedMenuItem;
    await saveMenuItem(menuItems);
  } else {
    console.log("Menu Item not found for update");
  }
};

export const deleteMenuItem = async (id) => {
  const menuItems = await loadMenuItems();
  const filteredItems = menuItems.filter((item) => item.id !== id);
  await saveMenuItem(filteredItems);
};

const CART_ITEM_KEY = "KARTITEMS";

export const saveCartItem = async (cartItem) => {
  try {
    await AsyncStorage.setItem(CART_ITEM_KEY, JSON.stringify(cartItem));
  } catch (e) {
    console.log("Faild to save Cart Item");
  }
};

export const loadCartItems = async () => {
  try {
    const cartItemJson = await AsyncStorage.getItem(CART_ITEM_KEY);
    return cartItemJson ? JSON.parse(cartItemJson) : [];
  } catch (e) {
    console.error("Faild to load Cart Item");
  }
};

export const addCartItem = async (cartItem) => {
  const cartItems = await loadCartItems();
  cartItems.push(cartItem);
  await saveCartItem(cartItems);
};

export const deleteCartItem = async (id) => {
  const cartItems = await loadCartItems();
  const filteredCartIems = cartItems.filter((item) => item.id !== id);
  await saveCartItem(filteredCartIems);
};

export const emptyCartItems = async () => {
  try {
    await AsyncStorage.setItem(CART_ITEM_KEY, JSON.stringify([]));
  } catch (e) {
    console.error("Failed to empty cart items");
  }
};

const ORDER_ITEM_KEY = "ORDERS";

export const saveOrderItem = async (orderItem) => {
  try {
    await AsyncStorage.setItem(ORDER_ITEM_KEY, JSON.stringify(orderItem));
  } catch (e) {
    console.log("Failde to save Order Details");
  }
};

export const epmptyOrderItmes = async () => {
  try {
    await AsyncStorage.setItem(ORDER_ITEM_KEY, JSON.stringify([]));
  } catch (e) {
    console.error("Failed to empty cart items");
  }
};

export const loadOrderItems = async () => {
  try {
    const orderItemJson = await AsyncStorage.getItem(ORDER_ITEM_KEY);
    return orderItemJson ? JSON.parse(orderItemJson) : [];
  } catch (e) {
    console.error("Faild to load Order Details");
  }
};

export const addOrderItem = async (orderItem) => {
  const orderItems = await loadOrderItems();
  orderItems.push(orderItem);
  await saveOrderItem(orderItems);
};

export const updateOrderStatus = async (id, newOrderStatus) => {
  try {
    // Load existing orders from local storage
    const orderItems = await loadOrderItems();

    // Find and update the specific order by ID
    const updatedOrderItems = orderItems.map((item) =>
      item.id === id ? { ...item, orderStatus: newOrderStatus } : item
    );

    // Save the updated orders back to local storage
    await saveOrderItem(updatedOrderItems);
  } catch (e) {
    console.error("Failed to update Order Status", e);
  }
};

export const deleteOrderItem = async (id) => {
  const orderItems = await loadOrderItems();
  const filteredOrderItems = orderItems.filter((item) => item.id !== id);
  await saveOrderItem(filteredOrderItems);
};
