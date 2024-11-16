import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import AdminScreen from "./screen/admin/AdminScreen";
import AdminAddItem from "./screen/admin/AdminAddItem";
import StudentScreen from "./screen/student/StudentScreen";
import SideNav from "./screen/SideNav";

// Define the stack parameter list type
type RootStackParamList = {
  Home: undefined;
  "Add Item": undefined;
  "Student Home": undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={AdminScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add Item" component={AdminAddItem} />
        <Stack.Screen
          name="Student Home"
          component={StudentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={SideNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
