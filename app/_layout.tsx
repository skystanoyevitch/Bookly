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
      <Stack.Screen
        name="(AddBook)/BookOptions"
        options={{
          presentation: "modal", // Enables modal style navigation for iOS
          title: "AddBook",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
