import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import initailRouteReducer from './reducer/InitialRouteReducer';
import { languageReducer } from './reducer/languageReduer';
import { userReducer } from './reducer/userReducer';


const routeConfig = {
  key: 'inite_key',
  storage: AsyncStorage,
  whitelist: ['initialRouteName'],
};

const persistConfig = {
  key:'root',
  storage:AsyncStorage,
  whitelist:['is_home_screen']
};

const rootReducer = combineReducers({
  initailRouteReducer: persistReducer(routeConfig, initailRouteReducer),
  languageReducer: languageReducer,
  userReducer:persistReducer(persistConfig,userReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck:false,
    }),
});
export const persistor = persistStore(store);
