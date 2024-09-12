import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import CustomToastProvider from './src/Components/CustomToastProvider';
import MainStack from './src/Naviagtion/Index';
import {persistor, store} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} onBeforeLift={()=>{
        SplashScreen.hide()
      }}>
        <CustomToastProvider>
          <MainStack />
        </CustomToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
