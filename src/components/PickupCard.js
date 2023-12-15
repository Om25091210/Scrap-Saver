import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'
import { Image } from 'react-native'
import DeleteIcon from '../components/icons/'


const PickupCard = () => {
  return (
    

      <View style={styles.card}>

        <TouchableOpacity style = {styles.delete}>
          <Image
            source={require('../assets/DeleteIcon.png')}
            style = {{height : 25, width : 25, }}
          />
        </TouchableOpacity>
        
        <Image
          source={require('../assets/formCard.png')}
          style={styles.cardImage}
        />
        
        <Text style={styles.cardText}>Address</Text>
        <Text style={styles.cardText}>Time</Text>
        <Text style={styles.cardText}>Date</Text>

      </View>

     
  )
}

export default PickupCard

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
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
    opacity: 0.9,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  
  delete : {
    position : 'absolute',
    zIndex  : 1,
    right : 25,
    top : 15,
    height : 35,
    width : 35,
    borderRadius : 35,
    backgroundColor : 'white',
    alignItems : 'center',
    justifyContent : 'center'

  }
})