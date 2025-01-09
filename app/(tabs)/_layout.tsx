import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Bookshelf" }} />
      <Tabs.Screen
        name="Stats"
        options={{
          title: "Stats",
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
