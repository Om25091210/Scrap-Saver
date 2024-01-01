import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";
import { BlurView } from '@react-native-community/blur';


const Loading = () => {
  return (
    <Modal
      transparent
      animationType='fade'
    >
      {/* <BlurView
        style={styles.blur}
        blurType='light'
        blurRadius={2}
        blurAmount={5}
      ></BlurView> */}
      <View style={styles.bg}>

        <View style={styles.modal}>

          <View style={styles.container}>
            <LottieView
              source={require('../assets/lottie/Loader.json')}
              style={styles.image}
              autoPlay
            />
            <Text style={styles.text}>Loading...</Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default Loading

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    // opacity : 0.1,
    position: 'absolute',
    top : 0,
    left : 0,
    right : 0,
    bottom : 0,
    backgroundColor: "transparent",
  },
  blur: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    fontFamily: "ubuntu",
    color: "#000",
    opacity: 0.7,

  },
  container: {
    backgroundColor: "#fff",
    elevation: 2,
    padding: 10,
    flexDirection: 'row',
    alignItems: "center",
    borderRadius: 8,
    gap: 10,
  },
  image: {
    height: 40,
    width: 40,
  }
})