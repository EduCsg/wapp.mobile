import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen, LoginScreen, LoadingScreen } from "../pages/Export";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Home2"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
}

export default function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName={"Loading"}>
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Main"
        options={{ headerShown: false }}
        component={MainTabNavigator}
      />
    </Stack.Navigator>
  );
}
