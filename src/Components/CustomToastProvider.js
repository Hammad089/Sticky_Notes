import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ToastProvider } from 'react-native-toast-notifications';
const CustomToastProvider = ({children}) => {
  //console.log('childerb',children);
  return (
    <ToastProvider
      dangerColor={'red'}
      renderType={{
        custom_toast: toast => (
          <View
            style={{
              maxWidth: '100%',
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: '#fff',
              marginVertical: 4,
              borderRadius: 8,
              borderLeftColor: '#bb2124',
              borderLeftWidth: 6,
              justifyContent: 'center',
              paddingLeft: 16,
            }}>
            <Text
              style={{
                fontSize: RFValue(14),
                color: '#bb2124',
                fontWeight: 'bold',
              }}>
              {toast.data.title}
            </Text>
            <Text
              style={{
                color: '#a3a3a3',
                marginTop: 2,
                fontSize: RFValue(14),
                fontWeight: 'bold',
              }}>
              {toast.message}
            </Text>
          </View>
        ),
        with_close_button: toast => (
          <View
            style={{
              maxWidth: '85%',
              paddingVertical: 10,
              backgroundColor: '#fff',
              marginVertical: 4,
              borderRadius: 8,
              borderLeftColor: '#00C851',
              borderLeftWidth: 6,
              justifyContent: 'center',
              paddingHorizontal: 16,
              flexDirection: 'row',
            }}>
            <Text style={{color: '#a3a3a3', marginRight: 16}}>
              {toast.message}
            </Text>
            <TouchableOpacity
              onPress={() => toast.onHide()}
              style={{
                marginLeft: 'auto',
                width: 25,
                height: 25,
                borderRadius: 5,
                backgroundColor: '#333',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '500',
                  marginBottom: 2.5,
                }}>
                x
              </Text>
            </TouchableOpacity>
          </View>
        ),
      }}>
      {children}
    </ToastProvider>
  );
};

export default CustomToastProvider;

const styles = StyleSheet.create({});
