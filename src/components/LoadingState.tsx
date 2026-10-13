import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import { useAppTheme } from "../theme/useAppTheme";

export default function LoadingState() {
  const appTheme = useAppTheme();
  const styles = createStyles(appTheme);

  // Compact placeholder only; screens with existing data keep it on screen.
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="small"
        color={appTheme.primaryColor}
      />
    </View>
  );
}

const createStyles = (appTheme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    container: {
      minHeight: 48,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 12,
    },
  });
