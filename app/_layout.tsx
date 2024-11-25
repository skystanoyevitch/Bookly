import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(Book)/[id]"
        options={{
          title: "Book",
        }}
      />
    </Stack>
  );
};

export default RootLayout;
