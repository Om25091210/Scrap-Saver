import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'
import { Image } from 'react-native'
import DeleteIcon from '../components/icons/'

const PickupCard = ({ address, time, date, imageurl }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.delete}>
        <Image
          source={require('../assets/DeleteIcon.png')}
          style={{ height: 25, width: 25 }}
        />
      </TouchableOpacity>

      <Image
        source={{ uri: imageurl }} // Load image from URL using uri prop
        style={styles.cardImage}
      />

      <Text style={styles.cardText}>Address: {address}</Text>
      <Text style={styles.cardText}>Time: {time}</Text>
      <Text style={styles.cardText}>Date: {date}</Text>
    </View>
  );
};

export default PickupCard

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingBottom:20,
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
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0, // Set bottom left radius to 0
    borderBottomRightRadius: 0, // Set bottom right radius to 0
  },
  
  cardText: {
    fontFamily: 'ubuntu',
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    opacity: 0.9,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  
  delete : {
    position : 'absolute',
    zIndex  : 1,
    right : 15,
    top : 15,
    height : 35,
    width : 35,
    borderRadius : 35,
    backgroundColor : 'white',
    alignItems : 'center',
    justifyContent : 'center'

  }
})