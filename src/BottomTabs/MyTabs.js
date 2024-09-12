import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AllNotes from '../Screens/AllNotes';
import FridayNotes from '../Screens/FridayNotes';
import MondayNotes from '../Screens/MondayNotes';
import SaturdayNotes from '../Screens/SaturdayNotes';
import SettingScreen from '../Screens/SettingScreen';
import SundayNotes from '../Screens/SundayNotes';
import ThursdayNotes from '../Screens/ThursdayNotes';
import TuesdayNotes from '../Screens/TuesdayNotes';
import WednesdayNotes from '../Screens/WednesdayNotes';
import CustomHeader from '../Components/CustomHeader';
import Draw from '../Screens/Draw';

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const HomeTopTabs = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          textTransform: 'none',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#000',
          height: 2
        },
        tabBarActiveTintColor: '#000', 
        tabBarInactiveTintColor: 'gray', 
        tabBarScrollEnabled: true,
      }}
    >
      <TopTab.Screen name="All Notes" component={AllNotes} />
      <TopTab.Screen name="Sunday Notes" component={SundayNotes} />
      <TopTab.Screen name="Monday Notes" component={MondayNotes} />
      <TopTab.Screen name="Tuesday Notes" component={TuesdayNotes} />
      <TopTab.Screen name="Wednesday Notes" component={WednesdayNotes} />
      <TopTab.Screen name="Thursday Notes" component={ThursdayNotes} />
      <TopTab.Screen name="Friday Notes" component={FridayNotes} />
      <TopTab.Screen name="Saturday Notes" component={SaturdayNotes} />
    </TopTab.Navigator>
  );
};

// Define the Bottom Tab Navigator
const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings-sharp' : 'settings-outline';
          }
          else if (route.name === 'Draw') {
            iconName = focused ? 'pencil-sharp' : 'pencil-outline';
          }


          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeTopTabs}
        options={{
          headerShown: true,
         header:(prop) => <CustomHeader {...prop} />
        }}
      />
       <Tab.Screen
        name="Draw"
        component={Draw}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerShown: true,
        }}
      />
     
    </Tab.Navigator>
  );
};

export default MyTabs;

const styles = StyleSheet.create({});
