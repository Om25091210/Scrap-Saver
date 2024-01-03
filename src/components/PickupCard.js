import { Pressable, StyleSheet, Text, ToastAndroid, TouchableOpacity, View, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../constants/colors'
import { Image } from 'react-native'
import DeleteIcon from '../components/icons/'
import Toast from 'react-native-simple-toast';
import Loading from '../components/Loading'
import { create } from 'react-test-renderer'
import { delete_donation } from '../services/PickupService'
import Button from './Button'
import { useSelector } from 'react-redux'
import { setResponded } from '../services/SpecialServices'

const PickupCard = ({ item, onDelete, onView }) => {

  const [loading, setLoading] = useState(false);
  const auth = useSelector(state => state.auth);

  const deleteDonation = async () => {
    setLoading(true);
    await delete_donation(auth?.email, item?.createdAt).then(
      res => {
        if (res.error) {
          console.log(res);
          setLoading(false);
        }
        else {
          setLoading(false);
          onDelete();
          Toast.show('Deleted Successfully!!');
        }
      });
  }

  const makeCall = () => {
    const phoneurl = 'tel:' + item?.phone + '';
    Linking.openURL(phoneurl);
  }

  const getStatusBtnColor = (status) => {
    switch (status) {
      case "Pending":
        return '#004AAD';
      case "Completed":
        return '#40A858';
      case "Verified":
        return '#F8B72C';
      case "Responded":
        return '#D6A364';
      case "Transaction Pending":
        return '#E1596A';
      default : 
        return 'red';
    }

  }

  const onStatusClick = async () => {
    if (data?.status === 'Pending' && auth?.role === 'admin') {
      setLoading(true);
      await setResponded(auth?.email, item?.createdAt).then(
        res => {
          if (res.error) {
            console.log(res);
            ToastAndroid.show(res.error, ToastAndroid.SHORT);
          }
          else {
            ToastAndroid.show(res.message, ToastAndroid.SHORT);
            setdata(res.data);
          }
        }
      )
      setLoading(false);
    }
  }

  return (
    <Pressable style={styles.card} onPress={onView}>
      {loading && <Loading />}
      <TouchableOpacity style={styles.delete} onPress={deleteDonation}>
        <Image
          source={require('../assets/DeleteIcon.png')}
          style={{ height: 25, width: 25 }}
        />
      </TouchableOpacity>

      <Image
        source={{ uri: item?.imageurl }} // Load image from URL using uri prop
        style={styles.cardImage}
      />

      <View style={styles.row} >
        <TouchableOpacity
          onPress={onStatusClick}
          style={[styles.statusBtn, {borderColor : getStatusBtnColor(item?.status)}]}
          disabled={auth?.role === 'admin'}>
          <Text style={[styles.statusText , {color : getStatusBtnColor(item?.status)}]}>{item?.status}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.call} onPress={makeCall}>
          <Image source={require('../assets/PhoneIcon.png')} />
        </TouchableOpacity>
      </View>
      <Text style={styles.cardText}>Address: {item?.address}</Text>
      <Text style={styles.cardText}>Time: {item?.time}</Text>
      <Text style={styles.cardText}>Date: {item?.date}</Text>
    </Pressable>
  );
};

export default PickupCard

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingBottom: 20,
  },
  card: {
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 25,
    width: '90%',
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,

  },
  statusBtn: {
    width: "70%",
    borderWidth: 2,
    borderColor: '#D6A364',
    borderRadius: 8,
    margin: 10,
    padding: 0,
    paddingVertical : 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontFamily: 'ubuntu',
    fontSize: 14,
    fontWeight: '700',
    color: '#D6A364',
    opacity: 0.9,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0, // Set bottom left radius to 0
    borderBottomRightRadius: 0, // Set bottom right radius to 0
  },
  call: {
    marginRight : 20,
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

  delete: {
    position: 'absolute',
    zIndex: 1,
    right: 15,
    top: 15,
    height: 35,
    width: 35,
    borderRadius: 35,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'

  }
})