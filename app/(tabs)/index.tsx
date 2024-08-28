import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import { HelloWave } from "@/components/HelloWave";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [text, setText] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={styles.title}
          numberOfLines={2}
          onPress={() => alert("Hello")}
        >
          This is an example of a Text component in React Native. Tap on me!
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder="Enter Text Here"
        >
          <View></View>
        </TextInput>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "blue",
    textAlign: "center",
    fontSize: 20,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textInput: {
    borderColor: "blue",
    borderWidth: 1,
    margin: 15,
    padding: 22,
  },
  textView: {
    // backgroundColor: "green",
  },
});
