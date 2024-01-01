import { Pressable, StyleSheet, Text, ToastAndroid, TouchableOpacity, View, Linking } from 'react-native'
import React, {useState, useEffect} from 'react'
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
  
  const [data, setdata] = useState(item);
  const [loading, setLoading] = useState(false);
  const auth = useSelector(state => state.auth);
  
  const deleteDonation = async () =>{
    setLoading(true);
    await delete_donation(auth?.email , data?.createdAt).then(
      res => {
        if(res.error)
        {
          console.log(res);
          setLoading(false);
        }
        else{
          setLoading(false);
          onDelete();
          Toast.show('Deleted Successfully!!');
        }
      });
  }

  const makeCall = () => {
    const phoneurl = 'tel:' + data?.phone + ''; 
    Linking.openURL(phoneurl);
  }

  const onStatusClick = async() =>{
      if(data?.status === 'Pending' && auth?.role === 'user'){
        setLoading(true);
        await setResponded(auth?.email, item?.createdAt).then(
            res => {
              if(res.error)
              {
                console.log(res);
                ToastAndroid.show(res.error, ToastAndroid.SHORT);
              }
              else{
                ToastAndroid.show(res.message,ToastAndroid.SHORT);
                setdata(res.data);
              }
            }
        ) 
        setLoading(false);
      }
  }

  return (
    <Pressable style={styles.card} onPress={onView}>
      {loading && <Loading/>}
      <TouchableOpacity style={styles.delete} onPress={deleteDonation}>
        <Image
          source={require('../assets/DeleteIcon.png')}
          style={{ height: 25, width: 25 }}
        />
      </TouchableOpacity>

      <Image
        source={{ uri: data?.imageurl }} // Load image from URL using uri prop
        style={styles.cardImage}
      />

      <View style = {styles.row} >
        <TouchableOpacity 
                  onPress={onStatusClick}
                  style = {styles.statusBtn} 
                  disabled = {auth?.role === 'admin'}>
          <Text style= {styles.statusText}>{data?.status}</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.call} onPress={makeCall}>
            <Image source={require('../assets/PhoneIcon.png')}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.cardText}>Address: {data?.address}</Text>
      <Text style={styles.cardText}>Time: {data?.time}</Text>
      <Text style={styles.cardText}>Date: {data?.date}</Text>
    </Pressable>
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
  row : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    paddingHorizontal : 20,

  },
  statusBtn : {
    width : "70%",
    elevation : 1,
    borderRadius : 8,
    margin : 10,
    padding : 0,
    alignItems : 'center',
    justifyContent : 'center',
  },
  statusText : {
    fontFamily: 'ubuntu',
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
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
  call : {
    
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