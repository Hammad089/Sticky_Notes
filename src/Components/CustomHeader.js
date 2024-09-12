import React from "react";
import { StyleSheet,Text,View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP, widthPercentageToDP as wp } from "react-native-responsive-screen";

const CustomHeader = () => {
    return (
        <View style={{marginHorizontal:wp(5),height:heightPercentageToDP(5),marginTop:10}}>
            <Text style={{color:'#242424',fontSize:RFValue(16),fontWeight:'bold'}}>Weekly Notepad</Text>
        </View>
    )
}
export default CustomHeader