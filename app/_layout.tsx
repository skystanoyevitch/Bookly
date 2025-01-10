import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(Book)/[id]"
        options={{
          headerShown: true,
          headerBackTitle: "Back to Bookshelf",
        }}
      />
      <Stack.Screen
        name="(AddBook)/BookOptions"
        options={{
          presentation: "modal", // Enables modal style navigation for iOS
          title: "Add Book",
          headerShown: true,
          headerBackTitle: "Back to Bookshelf",
        }}
      />
    </Stack>
  );
};

export default RootLayout;
