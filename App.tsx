import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AdminScreen from "./screen/admin/AdminScreen";
import AdminAddItem from "./screen/admin/AdminAddItem";
import StudentScreen from "./screen/student/StudentScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Student Home">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
