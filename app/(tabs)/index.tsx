import { CameraView, Camera, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { Alert, Button, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState<any | null>(null);
  const [scanner, setScanner] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    // setHasPermission(status === "granted");

    if (status === "granted") {
      setHasPermission(true);
      setCameraActive(true);
      setScanner(false);
      Alert.alert("Permission granted", "You can now access the camera!");
    } else {
      setHasPermission(false);
      Alert.alert("Permission denied", "You cannot access the camera.");
    }
  };

  const handleBarcodeScanner = ({ type, data }: any) => {
    setScanner(true);
    Alert.alert(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    setCameraActive(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainViewContainer}>
        {!cameraActive ? (
          <Pressable style={styles.buttonStyle} onPress={getCameraPermissions}>
            <Text>Tap to scan QR Code</Text>
          </Pressable>
        ) : (
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={scanner ? undefined : handleBarcodeScanner}
          />
        )}
        {/* {scanner && (
          <Pressable
            style={styles.buttonStyle}
            onPress={() => setScanner(false)}
          >
            <Text>Scan another Barcode</Text>
          </Pressable>
        )} */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  title: {
    color: "blue",
    textAlign: "center",
    fontSize: 20,
  },

  mainViewContainer: {
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
  camera: {
    width: "100%",
    height: "100%",
  },
});
