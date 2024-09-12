import React, { useRef, useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import SignatureScreen from 'react-native-signature-canvas';
const Draw = ({text, onOK}) => {
  const [img, setImg] = useState(null);
  const [penColor, setPenColor] = useState('black');
  const ref = useRef();
  const colors = ['black', 'red', 'blue', 'green', 'orange', 'purple'];

  const handleOK = signature => {
    setImg(signature);
  };

  const handleEmpty = () => {
    Alert.alert('Kindly affix your signature!');
  };

  const handleClear = () => {
    ref.current.clearSignature();
    setImg(null);
  };

  const handleColorChange = color => {
    setPenColor(color);
    ref.current.changePenColor(color);
  };

  const handleUndo = () => {
    ref.current.undo();
  };

  const handleRedo = () => {
    ref.current.redo();
  };
   

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.setButton, {backgroundColor: 'red'}]}
          onPress={handleUndo}>
          <Text style={styles.text}>Undo</Text>
        </TouchableOpacity>
        <View style={styles.colorContainer}>
          {colors.map(color => (
            <TouchableOpacity
              key={color}
              style={[styles.colorCircle, {backgroundColor: color}]}
              onPress={() => handleColorChange(color)}
            />
          ))}
        </View>
        <TouchableOpacity
          style={[styles.setButton, {marginLeft: 30, backgroundColor: 'red'}]}
          onPress={handleRedo}>
          <Text style={styles.text}>Redo</Text>
        </TouchableOpacity>
      </View>
      <SignatureScreen
        ref={ref}
        onOK={handleOK}
        onEmpty={handleEmpty}
        penColor={penColor}
        onEnd={handleOK}
        autoClear={false}
      />

      <Text style={styles.textSign}>Preview Signature</Text>
      {img ? (
       <View style={{
        height:heightPercentageToDP(30)
       }}>
         <Image
          resizeMode={'center'}
          style={{width: 335, height: 114,justifyContent:'center',alignItems:'center',marginTop:heightPercentageToDP(10)}}
          source={{uri: img}}
        />
       </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    padding: 10,
  },
  preview: {
    width: 335,
    height: 114,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 2,
  },
  textSign: {
    color: 'deepskyblue',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  text: {
    color: '#fff',
    fontWeight: '900',
  },
  saveButton: {
    backgroundColor: 'deepskyblue',
    textAlign: 'center',
    fontWeight: '900',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  setButton: {
    backgroundColor: 'deepskyblue',
    textAlign: 'center',
    fontWeight: '900',
    color: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Draw;
