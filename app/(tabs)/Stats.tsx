import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BookshelfScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Stats Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookshelfScreen;
