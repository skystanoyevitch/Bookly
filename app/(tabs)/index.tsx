import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import { HelloWave } from "@/components/HelloWave";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text style={styles.textColor}>Marhaba</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textColor: {
    color: "blue",
  },
});
