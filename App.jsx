import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

import Routes from "./src/routes";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <StatusBar style="light" />

      <Routes />
    </GluestackUIProvider>
  );
}
