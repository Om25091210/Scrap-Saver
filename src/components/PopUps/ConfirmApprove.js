import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity, ToastAndroid, TextInput } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from '@react-native-community/blur'
import { useSelector } from 'react-redux'
import Loading from '../Loading'
import COLORS from '../../constants/colors'
import CheckBox from '@react-native-community/checkbox'
import Button from '../Button'
import { VerifyTransaction, verifyOTP } from '../../services/SpecialServices'


const ConfirmApprove = ({ handleDismiss, email, createdAt }) => {

  const [loading, setLoading] = useState(false);

  const auth = useSelector(state => state.auth);

  const onSubmit = async () => {
    setLoading(true);
    await VerifyTransaction(email, createdAt).then(
      res => {
        if (res.error) {
          ToastAndroid.show(res.error, ToastAndroid.SHORT);
          console.log(res);
        }
        else {
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
        }
      })
    setLoading(false);
    handleDismiss();
  }

  return (
    <Modal visible={true}
      transparent={true}
      animationType='fade'>
      {loading &&
          <Loading />
      }
      {/* <BlurView style={styles.blurViewStyle} blurType='light' blurRadius={5} blurAmount={5}></BlurView> */}
      <TouchableOpacity onPress={()=>{}} style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>

        <Pressable style={styles.modalContainer} onPress={()=>{}}>

          
          <Pressable style={styles.container}>

            <Text style={styles.heading}>Approval Confirmation</Text>

            <Text style={styles.text}>Please confirm in order to approve the Transaction.\nAfter this your order will be completed.</Text>

            <View style={{ alignSelf: 'center', justifyContent: 'center', flexDirection: 'row', paddingVertical: 10, gap: 20 }}>
              <Button onPress={handleDismiss} title="Cancel" style={{ height: 40, paddingTop: 5, paddingBottom: 5, }} textSize={14} />
              <Button onPress={onSubmit} title="Confirm" filled style={{ height: 40, paddingTop: 5, paddingBottom: 5 }} textSize={14} />
            </View>
          </Pressable>
        </Pressable>

      </TouchableOpacity>

    </Modal>
  )
}

export default ConfirmApprove


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
    width: '100%',
    backgroundColor : 'rgba(0,0,0,0.2)',
  },
  container: {
    backgroundColor: "#fff",
    width: '85%',
    borderRadius: 5,
    alignItems: 'center',
    gap: 10,
    elevation : 8,
  },
  
  text: {
    fontFamily: 'ubuntu',
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    opacity: 0.7,
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
    fontWeight: '700',
    fontFamily: 'ubuntu',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(102, 102, 102, 0.35)",
    borderRadius: 6,
    width: '90%',
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: 'ubuntu',
    color: 'black',
    opacity: 0.7,
    fontWeight: '700',
  },
  showPass: {
    fontSize: 13,
    fontFamily: 'ubuntu',
    color: 'black',
    opacity: 0.5,
  },

})