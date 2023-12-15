import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, TextInput, ScrollView } from 'react-native'
import React from 'react';
import { Back, Bag, Circle } from '../components/icons'
import COLORS from '../constants/colors'
import { useNavigation } from '@react-navigation/native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import FilledButton from '../components/FilledButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const Form = () => {

  const navigation = useNavigation();

  const handleBackNavigation = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style = {{flex : 1}}>
    <ScrollView style={styles.mainContainer}>

      <ImageBackground
        source={require('../assets/formBG.png')}
        resizeMethod='scale'
        resizeMode='cover'
        style={styles.container}
      >
        <View style={styles.Header}>
          <TouchableOpacity onPress={handleBackNavigation}>
            <View style={styles.circleContainer}>
              <Circle style={styles.circleStyle} />
              <Back style={styles.backStyle} />
            </View>
          </TouchableOpacity>
          <Text style={styles.titleText}>Schedule a Pickup</Text>
          <Bag style={{}} />
        </View>

        <View style={styles.card}>
          <Image
            source={require('../assets/formCard.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>“Trash to treasure, conserve for good measure.”</Text>
        </View>


        <Text style = {styles.text}>Our associate will reach out to you for this donation</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputHeading}>Address</Text>
          <TextInput
            placeholder='Address'
            style={styles.input}
            cursorColor='gray'
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputHeading}>Contact Number</Text>
          <TextInput
            placeholder='Contact Number'
            style={styles.input}
            keyboardType = 'numeric'
            cursorColor='gray'
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputHeading}>Date</Text>
          <TextInput
            placeholder='Select Date'
            style={styles.input}
            cursorColor='gray'
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputHeading}>Time</Text>
          <TextInput
            placeholder='Select Date'
            style={styles.input}
            cursorColor='gray'
          />
        </View>

        <View style = {styles.inputContainer}>
          <FilledButton
            onPress={()=>{navigation.navigate("SuccessPage")}} 
            title = 'Proceed to Scrap'/>
        </View>

      </ImageBackground>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Form

const styles = StyleSheet.create({
  Header: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 23,
    fontFamily: 'ubuntu_bold',
    fontWeight: "500",
    color: COLORS.use_dark_green,
    marginTop: 15,
    marginStart: 25,
  },
  titleText: {
    fontSize: 23,
    fontFamily: 'ubuntu_bold',
    fontWeight: '500',
    color: COLORS.use_dark_green,
    marginTop: 4,
    marginStart: 70,
  },
  text : {
    color : COLORS.use_dark_green,
    opacity : 0.8,
    alignSelf : 'center',
    width : '80%',
    marginTop : 20,
  },  
  circleContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  circleStyle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backStyle: {
    position: 'absolute',
    top: '50%',
    marginStart: 13,
    marginTop: -15, // Adjust the value based on the icon size to center it
    // Additional styles for the Back image if needed
  },
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  card: {
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 25,
    width: '80%',
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  cardImage: {

  },
  cardText: {
    fontFamily: 'ubuntu',
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    opacity: 0.9,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  inputHeading: {
    fontFamily: 'ubuntu',
    fontSize: 15,
    color: '#000',
    opacity: 0.8,
    fontWeight: '700',

  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 2,
    height: 44,
    paddingHorizontal: 10,

  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
    gap: 10,
  }
})