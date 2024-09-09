import { Tabs } from "expo-router";
import React from "react";

// import { TabBarIcon } from "@/components/navigation/TabBarIcon";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Bookshelf",
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
        }}
      />
    </Tabs>
  );
}
