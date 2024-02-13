import { StyleSheet } from "react-native";

import { colors } from "./Colors";

export const layouts = StyleSheet.create({
  guestLayout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: "100%",
    backgroundColor: colors.background.main,
  },
});
