import CustomTabBar from '@/components/ui/CustomTabBar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar hidden={true} />
      <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="timetable"
        options={{
          title: 'Timetable',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
    </>
  );
}
