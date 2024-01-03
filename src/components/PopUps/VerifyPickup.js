import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity, ToastAndroid, TextInput } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from '@react-native-community/blur'
import { useSelector } from 'react-redux'
import Loading from '../Loading'
import COLORS from '../../constants/colors'
import CheckBox from '@react-native-community/checkbox'
import Button from '../Button'
import { verifyOTP } from '../../services/SpecialServices'


const VerifyPickup = ({ handleDismiss, email, createdAt }) => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    code: null,
    confirmCode: null,
  })

  const auth = useSelector(state => state.auth);

  const [showPass, setShowPass] = useState(false);

  const onSubmit = async () => {
    if (data.code !== data.confirmCode) {
      ToastAndroid.show("Confirm Code dosen't match", ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    await verifyOTP(email, createdAt, data.code).then(res => {
      if (res.error) {
        console.log(res);
        ToastAndroid.show(res.error, ToastAndroid.SHORT);
        setLoading(false);
      }
      else {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
        handleDismiss();
        setLoading(false);
      }
    }).catch(error => {
      console.error(error);
      setLoading(false);
    })
  }

  return (
    <Modal visible={true}
      transparent={true}
      animationType='fade'>
      {loading &&
        <Loading />
      }
      {/* <BlurView style={styles.blurViewStyle}></BlurView> */}
      <View onPress={() => { }} style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>

        <View style={styles.modalContainer}>

          <View style={styles.container}>
            <Text style={styles.heading}>Verify Pickup</Text>
            <TextInput placeholder='Enter Security Code'
              secureTextEntry={!showPass}
              style={styles.input}
              value={data.code}
              placeholderTextColor={'gray'}
              cursorColor={'gray'}
              onChange={(e) => { setData({ ...data, code: e.nativeEvent.text }); }} />
            <TextInput placeholder='Confirm Security Code'
              secureTextEntry={!showPass}
              style={styles.input}
              placeholderTextColor={'gray'}
              cursorColor={'gray'}
              value={data.confirmCode}
              onChange={(e) => { setData({ ...data, confirmCode: e.nativeEvent.text }); }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginLeft: '5%', }}>

              <CheckBox
                value={showPass}
                onChange={(v) => setShowPass(v.nativeEvent.value)}
                tintColors={{ true: COLORS.use_dark_green, false: COLORS.grey }}
              ></CheckBox>
              <Text style={styles.showPass}>Show Password</Text>
            </View>

            <View style={{ alignSelf: 'center', justifyContent: 'center', flexDirection: 'row', paddingVertical: 10, gap: 20 }}>
              <Button onPress={handleDismiss} title="Cancel" style={{ height: 40, paddingTop: 5, paddingBottom: 5, }} textSize={14} />
              <Button onPress={onSubmit} title="Submit" filled style={{ height: 40, paddingTop: 5, paddingBottom: 5 }} textSize={14} />
            </View>
          </View>
        </View>

      </View>

    </Modal>
  )
}

export default VerifyPickup


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
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  container: {
    backgroundColor: "#fff",
    width: '85%',
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