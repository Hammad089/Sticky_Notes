import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotesScreen from '../Screens/NoteScreen';
import { NavigationContainer } from '@react-navigation/native';
import CreateNote from '../Screens/CreateNote';
import LanguageScreen from '../Screens/LanguageScreen';
import Simple from '../Screens/OnboardingScreen';
const Stack = createNativeStackNavigator()
const RootNavigation = () => {
  return (
        <Stack.Navigator>
        <Stack.Screen name='Notes' component={NotesScreen} options={{headerShown:false}} />
        <Stack.Screen name='CreateNote' component={CreateNote} />
    </Stack.Navigator>
  )
}

export default RootNavigation

const styles = StyleSheet.create({})