import React, { useEffect } from 'react';
import { View, Text, Pressable, ImageBackground, Image, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import FilledImageButton from '../components/FilledImageButton';
import SplashScreen from 'react-native-splash-screen';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';

const Welcome = ({ navigation }) => {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    useEffect(() => {
        GoogleSignin.configure({
            ClientId:
            '312761775781-a8d8g7kth2ovmp06p0eo1le52s6m314b.apps.googleusercontent.com',
            "client_type": 3
        });
      });

      const signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
    
          // Extracting necessary details
          const { email, familyName, givenName, id, name, photo } = userInfo.user;
          console.log(userInfo);
          console.log(email);
          navigation.navigate("Home");
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User cancelled the login flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Signing in');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play services not available');
          } else {
            console.log('Some other error happened');
            console.log(error.message);
            console.log(error.code);
          }
        }
      };

      const signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          // Update UI to reflect user logged out
          console.log('User signed out successfully');
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };

    return (
        <ImageBackground 
            source={require("../assets/img_bg.png")} // Replace with your image source
            style={styles.container}
        >
            <View style={styles.flexContainer}>
                <View style={styles.absoluteContainer}>
                    <Image
                        source={require("../assets/hand_env.png")}
                        style={styles.absoluteImage}
                    />
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.largeText}>Recycle your waste</Text>
                    <Text style={styles.mediumText}>products!</Text>

                    <View style={styles.textBlock}>
                        <Text style={styles.smallText}>Easily scrap your household waste with</Text>
                        <Text style={styles.smallText_name}>ScrapSaver</Text>
                    </View>

                    <View style={styles.button_container}>
                        <FilledImageButton onPress={(signIn)} />
                        <Button style={styles.button} title="Skip" onPress={(signOut) } />
                    </View>

                </View>
                <View style={styles.bottomImagesContainer}>
                        <Image
                            source={require("../assets/tree_left.png")} // Replace with your image source
                            style={styles.bottomImage1}
                        />
                        <Image
                            source={require("../assets/tree_right.png")} // Replace with your image source
                            style={styles.bottomImage2}
                        />
                    </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', // Center the content vertically
    },
    button_container:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        marginStart: 10,
        backgroundColor: COLORS.background, // Set your background color
    },
    flexContainer: {
        flex: 1,
        alignItems: 'center',
    },
    absoluteContainer: {
        top: 50,
    },
    absoluteImage: {
        height: 200,
        width: 200,
    },
    contentContainer: {
        marginBottom:220,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    largeText: {
        fontSize: 35,
        fontWeight: '200',
        color: COLORS.black,
        marginStart: 20,
        fontFamily: 'ubuntu_bold',
    },
    mediumText: {
        fontSize: 35,
        marginStart: 20,
        fontWeight: '300',
        color: COLORS.black,
        fontFamily: 'ubuntu_bold',
    },
    textBlock: {
        marginTop: 15,
        textAlign: 'center',
    },
    smallText: {
        fontSize: 16,
        color: COLORS.black,
        marginVertical: 4,
        marginStart: 20,
    },
    smallText_bottom: {
        fontSize: 16,
        color: COLORS.black,
        marginVertical: 4,
    },
    smallText_name: {
        fontSize: 16,
        color: COLORS.black,
        marginVertical: 2,
        marginStart: 20,
        fontWeight: '100',
        fontFamily: 'ubuntu_bold',
    },
    button: {
        marginStart: 12,
        marginTop: 1,
    },
    rowContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
    },
    boldText: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: 'bold',
        marginLeft: 4,
        marginTop: 4,
    },
    bottomImagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    bottomImage1: {
        width: 150, // Adjust width as needed
        height: 200, // Adjust height as needed
    },
    bottomImage2: {
        width: 100, // Adjust width as needed
        height: 200, // Adjust height as needed
    },
});

export default Welcome;
