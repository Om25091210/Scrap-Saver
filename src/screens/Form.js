import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Back, Bag, Circle } from '../components/icons'
import COLORS from '../constants/colors'
import { useNavigation } from '@react-navigation/native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import FilledButton from '../components/FilledButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Loading from '../components/Loading';

const Form = () => {
  const navigation = useNavigation();

  const [email_, setemail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize GoogleSignin
    GoogleSignin.configure({
      ClientId:'312761775781-a8d8g7kth2ovmp06p0eo1le52s6m314b.apps.googleusercontent.com',
      "client_type": 3
    });

    // Call the method to check if the user is already signed in
    getCurrentUserInfo();
  }, []);

  const getCurrentUserInfo = async () => {
    try {
      // Check if the user is currently signed in
      const isSignedIn = await GoogleSignin.isSignedIn();

      if (isSignedIn) {
        // Get user details
        const userInfo = await GoogleSignin.signInSilently();
        console.log('User Info:', userInfo.user);
        setemail(userInfo.user.email)
        console.log('User Email:', userInfo.user.email);
      } else {
        console.log('No user is currently signed in.');
      }
    } catch (error) {
      console.error('Error retrieving user info:', error);
    }
  };

  const handleBackNavigation = () => {
    navigation.goBack();
  }

  //for image
  const [pickerResponse, setPickerResponse]= useState(require('../assets/formCard.png')); // Default image

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
  console.log(uri);
  
  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();
    data.append('filename', {
      uri: uri,
      type: 'image/jpeg',
      name: `donationImage-${Date.now()}.jpg`,
    });

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'authorization': 'LqA[3br%H{Am1r2aFmXx_=Z1r1',
      // Add any other required headers
    };
  
    const options = {
      method: 'POST',
      headers: headers,
      body: data,
    };
  
    
    try {
      const uploadUrl = 'https://c0e5-2405-201-3005-afd-4cf9-b55d-60c1-5cd7.ngrok-free.app/image-upload'; // Replace with your server endpoint
      const uploadResponse = await fetch(uploadUrl, options);

      if (uploadResponse.ok) {
        const uploadResult = await uploadResponse.json();
        console.log('Image uploaded successfully:', uploadResult.fileUrl);

        const donationRequest = {
          imageurl: uploadResult.fileUrl,
          email:   email_,
          address: address,
          phone: contactNumber,
          date: selectedDate,
          time: selectedTime,
          status: "Pending"
          // Add other donation details here
        };

        const donationOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'authorization':'LqA[3br%H{Am1r2aFmXx_=Z1r1'
          },
          body: JSON.stringify(donationRequest),
        };
        console.log('Donation Request:', donationOptions);
        const donationUrl = 'https://c0e5-2405-201-3005-afd-4cf9-b55d-60c1-5cd7.ngrok-free.app/create-donation';
        const donationResponse = await fetch(donationUrl, donationOptions);
  
        if (donationResponse.ok) {
          const donationResult = await donationResponse.json();
          setLoading(false);
          console.log('Donation created successfully:', donationResult);
          navigation.navigate('SuccessPage');
        } else {
          setLoading(false);          
          throw new Error('Failed to create donation');
        }
      } else {
        setLoading(false);        
        throw new Error('Image upload failed');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error uploading image:', error);
    }
  };

  return (
    <SafeAreaView style = {{flex : 1}}>
    <ScrollView style={styles.mainContainer}>
      {loading && <Loading/>}  
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
                   source={{uri}}
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


        <Text style = {styles.text}>Our associate will reach out to you for this donation</Text>

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
            keyboardType = 'numeric'
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

        <View style = {styles.inputContainer}>
          <FilledButton
            onPress={()=>{uploadImage()}} 
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
    fontWeight: '300',
    fontFamily: 'ubuntu_bold',
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