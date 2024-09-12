import React, { useEffect } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Onboarding from '../Components/Onboarding';
import { setinittialRoute } from '../store/action/InitialRouteName';
import { setHomeScreen } from '../store/action/userAction';
const Simple = () => {
  const {selectedLanguage} = useSelector(state => state.languageReducer)
  console.log(selectedLanguage,"=================================");
  
  const dispatch = useDispatch();

  const navigateToMainScreen = () => {
    dispatch(setHomeScreen(true));
  };

  useEffect(() => {
    dispatch(setinittialRoute('onboarding'));
  }, []);

  const CustomButton = ({label, onPress}) => (
    <TouchableOpacity style={styles.NextBtn} onPress={onPress}>
      <Text
        style={{
          color: '#fff',
          textAlign: 'center',
          fontSize: RFValue(20),
          fontWeight: 'bold',
        }}>
       {selectedLanguage.lets_go}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFF" />
      <Onboarding
        showSkip={false}
        skipToPage={0}
        bottomBarHighlight={false}
        showNext={false}
        controlStatusBar={true}
        onDone={navigateToMainScreen}
        NextButtonComponent={CustomButton}
        DoneButtonComponent={CustomButton}
        pages={[
          {
            backgroundColor: '#FFFFFF',
            image: (
              <>
                <Image
                  source={require('../assets/images/onboarding1.png')}
                  resizeMode={'center'}
                  style={{
                    height: hp(60),
                    width: wp(90),
                  }}
                />
              </>
            ),
            title: (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  
                }}>
                <Text style={styles.titleOnboarding1}>{selectedLanguage.hello_ther}!</Text>
              </View>
            ),
            subtitle: (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.subtitleOnboarding1}>
                 {selectedLanguage.quick_easy_create_notes}
                </Text>
              </View>
            ),
          },
          {
            backgroundColor: '#FFFFFF',
            image: (
              <>
                <Image
                  source={require('../assets/images/onboarding2.jpg')}
                  resizeMode={'contain'}
                  style={{
                    height: hp(80),
                    width: wp(100),
                  }}
                />
              </>
            ),
            title: (
              <View style={{
                bottom:hp(20)
              }}>
                <Text style={styles.titleOnboarding2}>{selectedLanguage.plan_your_week}!</Text>
              </View>
            ),
            subtitle: (
              <View style={{
                bottom:hp(20)
              }}>
                <Text style={styles.subtitleOnboarding2}>
               {selectedLanguage.easy_jot_down_goal}
                </Text>
              </View>
            ),
          },
          {
            backgroundColor: '#FFFFFF',
            image: (
              <>
                <Image
                  source={require('../assets/images/onboarding3.jpg')}
                  resizeMode={'contain'}
                  style={{
                    height: hp(80),
                    width: wp(100),
                  }}
                />
              </>
            ),
            title: (
              <View style={{bottom:wp(20)}}>
                <Text style={styles.titleOnboarding2}>{selectedLanguage.Start_organizing_your_week_like_a_pro}!</Text>
              </View>
            ),
            subtitle: (
              <View style={{bottom:wp(20)}}>
                <Text style={styles.subtitleOnboarding2}>
               {selectedLanguage.Dive_in_now_and_transform_how_you_plan_your_days}
                </Text>
              </View>
            ),
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  titleOnboarding1: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#1E1F4B',
    fontSize: RFValue(18),
    fontWeight: 'bold',
  },
  subtitleOnboarding1: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#1E1F4B',
    fontSize: RFValue(18),
    fontWeight: 'bold',
  },
  titleOnboarding2: {
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#1E1F4B',
    fontSize: RFValue(20),
    fontWeight: 'bold',
  },
  subtitleOnboarding2: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    color: '#1E1F4B',
    fontSize: RFValue(18),
    fontWeight: 'bold',
    margin: 10,
  },
  NextBtn: {
    backgroundColor: '#0C6DF2',
    width: wp(90),
    height: hp(6),
    margin:16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom:30
  },
});

export default Simple;
