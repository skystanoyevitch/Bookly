import { useState } from "react";
import { Button, Pressable, StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import { HelloWave } from "@/components/HelloWave";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [text, setText] = useState("");

  const buttonPressed = () => {
    alert("button pressed!");
  };
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
        ></TextInput>
        <Button title="Click Me!" color={"green"}></Button>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.buttonStyle} onPress={buttonPressed}>
            <Text>Click me too!</Text>
          </Pressable>
        </View>
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
  buttonStyle: {
    borderWidth: 1,
    borderColor: "black",
    padding: 20,
    elevation: 3,
    backgroundColor: "yellow",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
