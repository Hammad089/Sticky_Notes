import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageScreen from '../Screens/LanguageScreen';
import Simple from '../Screens/OnboardingScreen';
import { useSelector } from 'react-redux';
const Stack = createNativeStackNavigator()
const AuthStack = () => {
  const {initialRouteName} = useSelector(state=>state.initailRouteReducer)
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
    <Stack.Screen name='language' component={LanguageScreen} options={{
      title:'Language'
    }} />
   <Stack.Screen name='onboarding' component={Simple} options={{
    headerShown:false
   }} />
   </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})