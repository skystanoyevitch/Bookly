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
        <View>
          <Image
            source={require("../../assets/images/adaptive-icon.png")}
            style={{ width: 200, height: 200 }}
          />
          <Image />
          <ImageBackground
            source={require("../../assets/images/bigsmiley.jpg")}
            style={styles.imageBackgroundStyles}
          >
            <Text style={{ color: "white" }}>This is an Image Background</Text>
          </ImageBackground>

          <Text>Enable Feature:</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />

          <StatusBar
            barStyle="light-content"
            backgroundColor="#6A0E37"
            hidden={false}
            animated={true}
            translucent={true}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
          >
            <SafeAreaView>
              <View>
                <Text>Wello Horld!</Text>
                <TouchableHighlight
                  onPress={() => setmodalVisible(!modalVisible)}
                >
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </SafeAreaView>
          </Modal>
          <TouchableHighlight
            onPress={() => {
              setmodalVisible(true);
            }}
          >
            <Text>Show Modal</Text>
          </TouchableHighlight>
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

  imageBackgroundStyles: {
    width: "100%",
    height: 150,
  },
});
