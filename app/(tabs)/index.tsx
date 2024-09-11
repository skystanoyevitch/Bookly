import { CameraView, Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState<any | null>(null);
  const [scanner, setScanner] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanner = ({ type, data }: any) => {
    setScanner(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for Camera Permissions</Text>;
  }

  if (hasPermission === false) {
    return <Text> No Access to Camera</Text>;
  }

  // const buttonPressed = () => {
  //   alert("button pressed!");
  // };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <CameraView
            onBarcodeScanned={scanner ? undefined : handleBarcodeScanner}
            barcodeScannerSettings={{
              barcodeTypes: [],
            }}
          />
          {scanner && (
          )} */}
        <Pressable>
          <Text onPress={() => setScanner(false)}>Tap to scan again</Text>
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
