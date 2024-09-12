import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import FranciasCountry from '../assets/images/france.png';
import India from '../assets/images/india.png';
import JapanIcon from '../assets/images/japan.png';
import PakistanIcon from '../assets/images/pakistan.png';
import Portuguese from '../assets/images/pourtgal.png';
import SothKorea from '../assets/images/south_korea.png';
import Espanol from '../assets/images/spain.png';
import English from '../assets/images/usa.png';
import { RFValue } from 'react-native-responsive-fontsize';
import { useToast } from 'react-native-toast-notifications';
import { setinittialRoute } from '../store/action/InitialRouteName';
import {setSelectLanguage} from '../store/action/languageAction'
import TransaltionalLanguage from '../store';
///import NativeAdLanguageAd from '../NativeAds/NativeLanguageAds';
const LanguageScreen = ({}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [coverIndex, setCoverIndex] = useState(null);
  useEffect(() => {
    dispatch(setinittialRoute('Language'));
  }, []);

  const handleNavigate = () => {
    navigation.navigate('onboarding');
  };
  const handlecoverIndex = index => {
    console.log('INDEX COVER',index);
    setCoverIndex(index === coverIndex ? null : index);
  };

  useEffect(() => {
    const handleNaviagtion = () => {
      toast.hideAll();
      if (coverIndex == null) {
        toast.show('OOPS!!! SELECT LANGUAGE', {
          type: 'custom_toast',
          placement: 'bottom',
          duration: 5000,
          offset: 30,
          animationType: 'slide-in | zoom-in',
          data: { title: 'Error' }
        });
      } else {
        navigation.navigate('onboarding');
        dispatch(
          setSelectLanguage({
            selectedLanguageName: Languages[coverIndex].id,
            selectedLanguage: TransaltionalLanguage[Languages[coverIndex].id],
          }),
        ).then(() => {
          handleNavigate();
        });
      }
    };

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={()=>handleNaviagtion()}
          style={{
            backgroundColor: '#4B68FF',
            width: wp(20),
            height: hp(4),
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#fff',
        
              fontWeight: '700',
            }}>
            Next
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [coverIndex, toast]);
  const Languages = [
    {
      icon: Portuguese,
      title: 'Portuguese',
      id: 'Portuguese',
    },

    {
      icon: Espanol,
      title: 'Espanol',
      id: 'Spanish',
    },

    {
      icon: India,
      title: 'भारत',
      id: 'Hindi',
    },
    {
      icon: SothKorea,
      title: '대한민국',
      id: 'Korean',
    },
    {
      icon: English,
      title: 'English',
      id: 'English',
    },
    {
      icon: FranciasCountry,
      title: 'French',
      id: 'French',
    },
    {
      icon: PakistanIcon,
      title: 'اردو',
      id: 'Urdu',
    },
    {
      icon: JapanIcon,
      title: '漢字',
      id: 'Japanese',
    },

    // {
    //     icon:SouthAfricaIcon,
    //     title:'Afrikaans'
    // },
    // {
    //     icon:IndonessiaIcon,
    //     title:'Indonesia'
    // }
  ];
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      <View style={{flex: 1, backgroundColor: '#ffff'}}>
          <ScrollView style={{flex: 1,height:hp(100)}} showsVerticalScrollIndicator={false}>
            <View style={styles.rowContainer}>
              {Languages.map((item, index) => (
                <TouchableOpacity
                  onPress={() => handlecoverIndex(index)}
                  style={styles.container}
                  key={index}>
                  <Image
                    resizeMode={'contain'}
                    source={item.icon}
                    style={styles.ImageStyle}
                  />
                  <Text style={styles.textStyle}>{item.title}</Text>
                  <View style={styles.coverIcon}>
                    {coverIndex === index && (
                      <Icon
                        name="check-circle"
                        size={25}
                        color={'black'}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
      </View>
    
    </>
  );
};
const styles = StyleSheet.create({
  rowContainer: {
    opacity: 1,
    width: wp(100),
    columnGap: 8,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 1,
    marginHorizontal: 14,
    columnGap: 20,
    width: wp(95),
    height: hp(8),
    marginTop: 5,
    backgroundColor: '#F8F8F8',
    padding: 5,
    borderRadius: 10,
    marginVertical: 5,
  },
  ImageStyle: {
    opacity: 1,
    width: 40,
    height: 40,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#060606',
    fontSize: RFValue(14),
  },
  coverIcon: {
    position: 'absolute',
    right: 15,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LanguageScreen;
