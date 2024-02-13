import { StatusBar } from "expo-status-bar";
import LoginScreen from "./src/pages/LoginScreen";
import HomeScreen from "./src/pages/HomeScreen";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { CACHE_KEYS } from "./src/constants/Cache";
import { clearCache, getFromCache } from "./src/utils/SecureStore";
import { useEffect, useState } from "react";
import { tokenIsValid } from "./src/service/AuthService";

export default function App() {
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
    <GluestackUIProvider config={config}>
      <StatusBar style="light" />

      {redirect ? <HomeScreen /> : <LoginScreen />}
    </GluestackUIProvider>
  );
}
