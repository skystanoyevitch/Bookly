import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Switch,
  TextInput,
  View,
  TouchableHighlight,
} from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [isEnabled, setisEnabled] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);

  const toggleSwitch = () => setisEnabled((previousState) => !previousState);
  const buttonPressed = () => {
    alert("button pressed!");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Home Page</Text>
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

  imageBackgroundStyles: {
    width: "100%",
    height: 150,
  },
});
