import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";


const Loading = () => {
  return (
    <Modal
        transparent 
        animationType='fade'
    >
        <View style = {styles.bg}>
        <View style = {styles.modal}>
        <View style  = {styles.container}>

            
      <LottieView 
        source = {require('../assets/lottie/Loader.json')}
        style = {styles.image}
        autoPlay
      />
        <Text style = {styles.text}>Loading...</Text>
        </View>
        </View>
    </View>
    </Modal>
  )
}

export default Loading

const styles = StyleSheet.create({
    modal : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },  
    bg : {
        // opacity : 0.1,
        flex : 1,
        backgroundColor : "transparent",
    },  

    text : {
        fontSize : 18,
        fontFamily : "ubuntu",
        color : "#000",
        opacity : 0.7,

    },
    container:  {
        backgroundColor : "#fff",
        elevation : 2,
        padding : 15,
        flexDirection : 'row',
        alignItems : "center",
        borderRadius : 8,

        gap  :10,

    },
    image : {
        height : 40,
        width : 40,
    }
})