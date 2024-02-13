import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CACHE_KEYS } from "../constants/Cache";
import { clearCache, getFromCache } from "../utils/SecureStore";
import { useEffect, useState } from "react";
import { tokenIsValid } from "../service/AuthService";

import HomeScreen from "../pages/HomeScreen";
import LoginScreen from "../pages/LoginScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Home2" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default function AppRoutes() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    async function validateToken() {
      const token = await getFromCache(CACHE_KEYS.TOKEN);

      if (!token) return;

      const isValid = await tokenIsValid();

      if (!isValid) {
        clearCache();
        return;
      }

      setRedirect(true);
    }

    validateToken();
  }, []);

  return (
    <Stack.Navigator initialRouteName={redirect ? "Main" : "Login"}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
