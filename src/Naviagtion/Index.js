import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RootNavigation from './RootNavigation'
import AuthStack from './AuthStack'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'
const MainStack = () => {
    const {is_home_screen} = useSelector(state => state.userReducer)
  return (
    <NavigationContainer>
        {is_home_screen ? <RootNavigation /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default MainStack

const styles = StyleSheet.create({})