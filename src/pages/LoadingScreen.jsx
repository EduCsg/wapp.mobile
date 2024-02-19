import { useNavigation } from "@react-navigation/native";
import { View } from "lucide-react-native";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";

import { CACHE_KEYS } from "../constants/Cache";
import { clearCache, getFromCache } from "../utils/SecureStore";
import { tokenIsValid } from "../service/AuthService";
import { layouts } from "../styles/Layouts";

export default function LoadingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    async function validateToken() {
      const token = await getFromCache(CACHE_KEYS.TOKEN);

      if (!token) {
        navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        return;
      }

      const isValid = await tokenIsValid();

      if (!isValid) {
        clearCache();
        navigation.reset({ index: 0, routes: [{ name: "Login" }] });

        return;
      }

      navigation.reset({ index: 0, routes: [{ name: "Main" }] });
    }

    validateToken();
  }, []);

  return (
    <View style={layouts.guestLayout}>
      <ActivityIndicator
        size="large"
        style={{ flex: 1, minWidth: "100%" }}
        color="white"
      />
    </View>
  );
}
