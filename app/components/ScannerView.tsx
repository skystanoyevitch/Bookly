import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Camera, CameraView } from "expo-camera";

const ScannerView: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    Alert.alert("Permission denied", "You cannot access the camera.");
    return <View />;
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

export default ScannerView;
