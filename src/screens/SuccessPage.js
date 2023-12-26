import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'
import FilledButton from '../components/FilledButton'
import LottieView from "lottie-react-native";
import { useNavigation } from '@react-navigation/native';

const SuccessPage = () => {

  const navigation = useNavigation();
  
  return (
    <View style = {styles.container}>
     
      <ImageBackground 
          source = {require('../assets/SuccessBG.png')}
          style = {{flex : 1}}
      >

      <LottieView 
        source = {require('../assets/lottie/Success.json')}
        style = {styles.image}
        autoPlay
      />

      <Text style = {styles.text}>Success</Text>

      <View style = {styles.btn}>
        <FilledButton 
        title={'View Details'} 
        onPress={()=>{
          navigation.navigate("PickupsPage");
        }}/>
      </View>

      </ImageBackground>
    </View>
  )
}

export default SuccessPage

const styles = StyleSheet.create({
  container : {
    flex : 1,
    paddingBottom : 20,
    backgroundColor : COLORS.white,
  },
  image : {
    marginTop : '15%',
    alignSelf : 'center',
    height : 150,
    width : 150,

  },
  text : {
    fontFamily : 'ubuntu',
    fontSize : 20,
    fontWeight : '700',
    color : '#000',
    opacity : 0.8,
    marginTop : 20,
    alignSelf : 'center',
  },
  btn : {
    width : '85%',
    alignSelf : 'center',
    marginTop : '10%',
  }
})