import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, TextInput, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Back, Bag, Circle } from '../components/icons'
import COLORS from '../constants/colors'
import { useNavigation } from '@react-navigation/native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import FilledButton from '../components/FilledButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import { create_pickups, upload_image } from '../services/PickupService';

const Form = () => {
  const navigation = useNavigation();

  const auth = useSelector(state => state.auth);

  const [loading, setLoading] = useState(false);

  const handleBackNavigation = () => {
    navigation.goBack();
  }

  //for image
  const [pickerResponse, setPickerResponse] = useState(require('../assets/formCard.png')); // Default image

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '08:00 AM - 09:00 AM', value: '08:00 AM - 09:00 AM' },
    { label: '09:00 AM - 10:00 AM', value: '09:00 AM - 10:00 AM' },
    { label: '10:00 AM - 11:00 AM', value: '10:00 AM - 11:00 AM' },
    { label: '11:00 PM - 12:00 PM', value: '11:00 PM - 12:00 PM' },
    { label: '12:00 PM - 01:00 PM', value: '12:00 PM - 01:00 AM' },
    { label: '02:00 PM - 03:00 PM', value: '02:00 PM - 03:00 PM' },
    { label: '03:00 PM - 04:00 PM', value: '03:00 PM - 04:00 PM' },
    { label: '04:00 PM - 05:00 PM', value: '04:00 PM - 05:00 PM' },
    { label: '05:00 PM - 06:00 PM', value: '05:00 PM - 06:00 PM' },
    { label: '06:00 PM - 07:00 PM', value: '06:00 PM - 07:00 PM' },
  ]);
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');


  // Function to handle selecting an image for the card
  const openGallery = () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, setPickerResponse);
  };

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
  // console.log(uri);

  const uploadImage = async () => {
    setLoading(true);

    try {
      await upload_image(uri).then(async (res) => {
        if (res.error) {
          console.log(res);
          setLoading(false);
        }
        else {
          const donationRequest = {
            imageurl: res.fileUrl,
            email: auth?.email,
            address: address,
            phone: contactNumber,
            date: selectedDate,
            time: selectedTime,
            donationType : "",
            wallet : "",
            status: "Pending"
            // Add other donation details here
          };

          await create_pickups(donationRequest).then(result => {
            if(result.error) {
              console.log(result);
              ToastAndroid.show('Failed to Schedule Pickup', ToastAndroid.SHORT);
            }
            else{
              navigation.navigate('SuccessPage');
            }
            setLoading(false);
          });
        }
      });

    } catch (error) {
      setLoading(false);
      console.error('Error uploading image:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.mainContainer}>
        {loading && <Loading />}
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
            <TouchableOpacity onPress={openGallery}>
              {uri ? (
                <Image
                  source={{ uri }}
                  style={styles.cardImage}
                />
              ) : (
                <Image
                  source={require('../assets/formCard.png')} // Default image
                  style={styles.cardImage}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.cardText}>“Trash to treasure, conserve for good measure.”</Text>
          </View>


          <Text style={styles.text}>Our associate will reach out to you for this donation</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Address</Text>
            <TextInput
              placeholder='Address'
              style={styles.input}
              cursorColor='gray'
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Contact Number</Text>
            <TextInput
              placeholder='Contact Number'
              style={styles.input}
              keyboardType='numeric'
              cursorColor='gray'
              onChangeText={setContactNumber}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Date</Text>
            <TextInput
              placeholder='Select Date'
              style={styles.input}
              cursorColor='gray'
              onChangeText={setSelectedDate}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputHeading}>Time</Text>
            <DropDownPicker
              style={styles.input}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onChangeValue={(val) => setSelectedTime(val)}
            />
          </View>

          <View style={styles.inputContainer}>
            <FilledButton
              onPress={() => { uploadImage() }}
              title='Proceed to Scrap' />
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
  text: {
    color: COLORS.use_dark_green,
    opacity: 0.8,
    alignSelf: 'center',
    fontWeight: '300',
    fontFamily: 'ubuntu_bold',
    marginTop: 20,
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
    width: '90%',
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  cardImage: {
    height: 200, // Specify the height you want for the image
    width: "100%", // Specify the width you want for the image
    resizeMode: 'cover', // Choose the appropriate resizeMode
    borderRadius: 20,
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
    color: COLORS.use_dark_green,
    fontFamily: 'ubuntu_bold',
    fontWeight: "300",
  },
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    gap: 10,
  }
})