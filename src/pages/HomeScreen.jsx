import { ScrollView, Text } from "react-native";
import { layouts } from "../styles/Layouts";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={layouts.guestLayout}>
      <Text
        style={{
          color: "white",
        }}
      >
        Home Screen
      </Text>
    </ScrollView>
  );
}
