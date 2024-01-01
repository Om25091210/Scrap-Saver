import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity, ToastAndroid, TextInput } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from '@react-native-community/blur'
import { useSelector } from 'react-redux'
import Loading from '../Loading'
import COLORS from '../../constants/colors'
import CheckBox from '@react-native-community/checkbox'
import Button from '../Button'
import { add_amount, verifyOTP } from '../../services/SpecialServices'


const AddAmount = ({ handleDismiss, email , createdAt }) => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    amount : null 
  })

  const auth = useSelector(state => state.auth);

  const onSubmit = async() =>{
      if(data.amount === null){
          ToastAndroid.show("Please Add Amount", ToastAndroid.SHORT);
          return;
      }
      setLoading(true);
      await add_amount(email, createdAt, data.amount).then(
        res => {
          if(res.error){
            console.log(res);
            ToastAndroid.show(res.error, ToastAndroid.SHORT);
          }
          else{
            ToastAndroid.show(res.message, ToastAndroid.SHORT);
          }
        }
      )
      setLoading(false);
     
  }

  return (
    <Modal visible={true}
        transparent={false}
        animationType='fade'>
        {loading && 
            <Loading/>
        }
        {/* <BlurView style={styles.blurViewStyle}></BlurView> */}
        <TouchableOpacity onPress={handleDismiss} style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>

        <Pressable style={styles.modalContainer} onPress={handleDismiss}>
        
                
                <View style = {styles.topLine}></View>
                <Pressable style = {styles.container}>
                        <Text style = {styles.heading}>Add Amount</Text>
                        <TextInput placeholder='Enter Amount'
                            style = {styles.input}
                            value={data.code}
                            keyboardType='numeric'
                            placeholderTextColor={'gray'}
                            cursorColor={'gray'}
                            onChange={(e) => { setData({ ...data, amount: e.nativeEvent.text });}}/>
                     
                        <View style = {{alignSelf : 'right', justifyContent : 'center' , flexDirection : 'row', paddingVertical: 10, gap : 20}}>
                          <Button onPress={handleDismiss} title = "Cancel" style = {{height : 40,paddingTop : 5,paddingBottom : 5,   }} textSize = {14}/>
                          <Button onPress={onSubmit} title = "Submit" filled style = {{height : 40,paddingTop : 5,paddingBottom : 5}}  textSize = {14}/>
                        </View>
                </Pressable>
            </Pressable>

        </TouchableOpacity>

    </Modal>
)
}

export default AddAmount


const styles = StyleSheet.create({
  blurViewStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
    opacity: 1,
    width: '85%',
  },
  container: {
    backgroundColor: "#fff",
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    gap: 10,
  },
  topLine: {
    height: 8,
    width: '100%',
    backgroundColor: "#fff",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginTop: -8,
  },
  iconContainer: {
    backgroundColor: "#fff",
    borderRadius: 60,
    height: 60,
    width: 60,
    marginBottom: -25,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',

  },
  heading: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 15,
    color: 'black',
    opacity: 0.8,
    fontWeight : '700',
    fontFamily : 'ubuntu',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(102, 102, 102, 0.35)",
    borderRadius: 6,
    width: '90%',
    paddingLeft: 10,
    fontSize: 14,
    fontFamily : 'ubuntu',
    color: 'black',
    opacity: 0.7,
    fontWeight : '700',    
  },
  showPass: {
    fontSize: 13,
    fontFamily : 'ubuntu',
    color: 'black',
    opacity: 0.5,
  },

})