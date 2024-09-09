import { useState } from "react";
import { Button, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  // const [text, setText] = useState("");
  // const [isEnabled, setisEnabled] = useState(false);
  // const [modalVisible, setmodalVisible] = useState(false);

  // const toggleSwitch = () => setisEnabled((previousState) => !previousState);
  const buttonPressed = () => {
    alert("button pressed!");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Pressable onPress={buttonPressed}>
          <Text style={styles.buttonStyle}>Add Book</Text>
        </Pressable>
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
    borderColor: "blue",
    borderRadius: 100,
    padding: 15,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  imageBackgroundStyles: {
    width: "100%",
    height: 150,
  },
});
