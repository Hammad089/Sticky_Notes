import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { RFValue } from 'react-native-responsive-fontsize'
import { useSelector } from 'react-redux'
const SettingScreen = () => {
  const {selectedLanguage} = useSelector(state => state.languageReducer)
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <View>
      <View style={styles.privacypolicy}>
        <Text style={{color:'#000',marginHorizontal:10,fontSize:RFValue(14)}}>{selectedLanguage.Privacy_Policy}</Text>
      </View> 
      <View style={styles.rateus}>
        <Text style={{color:'#000',marginHorizontal:10,fontSize:RFValue(14)}}>{selectedLanguage.Rate_us}</Text>
      </View> 
      <View style={styles.moreapp}>
        <Text style={{color:'#000',marginHorizontal:10,fontSize:RFValue(14)}}>{selectedLanguage.MoreApps}</Text>
      </View> 
      <View style={styles.shareapp}>
        <Text style={{color:'#000',marginHorizontal:10,fontSize:RFValue(14)}}>{selectedLanguage.Share_App}</Text>
      </View> 
      </View>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  privacypolicy:{
    margin:10,
    marginTop:heightPercentageToDP(5),
    backgroundColor:'#f8f8f8',
    width:widthPercentageToDP(95),
    height:heightPercentageToDP(8),
    borderRadius:10,
    justifyContent:'center',
  },
  rateus:{
    margin:10,
    backgroundColor:'#f8f8f8',
    width:widthPercentageToDP(95),
    height:heightPercentageToDP(8),
    borderRadius:10,
    justifyContent:'center',
  },
  moreapp:{
    margin:10,
    backgroundColor:'#f8f8f8',
    width:widthPercentageToDP(95),
    height:heightPercentageToDP(8),
    borderRadius:10,
    justifyContent:'center',
  },
  shareapp:{
    margin:10,
    backgroundColor:'#f8f8f8',
    width:widthPercentageToDP(95),
    height:heightPercentageToDP(8),
    borderRadius:10,
    justifyContent:'center',
  }
})