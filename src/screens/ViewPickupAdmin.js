import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, Linking } from 'react-native'
import COLORS from '../constants/colors';
import React, { useState, useEffect } from 'react'
import { Link, useNavigation } from '@react-navigation/native';
import { Bag } from '../components/icons';
import { Circle } from '../components/icons';
import { Back } from '../components/icons';
import Loading from '../components/Loading';
import Button from '../components/Button';
import VerifyPickup from '../components/PopUps/VerifyPickup';
import { useSelector } from 'react-redux';
import { fetch_pickup } from '../services/PickupService';
import { setResponded } from '../services/SpecialServices';
import AddAmount from '../components/PopUps/AddAmount';

const ViewPickupAdmin = ({ route }) => {
  const [data, setData] = useState(route?.params);
  const auth = useSelector(state => state.auth);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [button, setButton] = useState({
    text: "Enter OTP",
    disable: false,
  });

  const [openPopup, setOpenPopup] = useState({
    verifyPopup: true,
    addAmountPopUp: false,
  })

  const handleBackNavigation = () => {
    navigation.goBack();
  }

  const getData = async () => {
    setLoading(true);
    await fetch_pickup(data?.email, data?.createdAt)
      .then(res => {
        if (res.error) {
          console.log(res);
          setLoading(false);
        }
        else {
          setData(res.response);
          setLoading(false);
        }
      });
    setLoading(false);
  }

  const makeCall = () => {
    const phoneurl = 'tel:${' + data?.phone + '}'; 
    Linking.openURL(phoneurl);

  }

  useEffect(()=>{
    getData();
  }, [])



  useEffect(() => {
    if (data?.status === 'Pending') {
      setButton({
        text: 'Respond',
        disable: false
      });
    }
    else if (data?.status === 'Responded') {
      if (data?.code === "-1") {
        setButton({
          text: 'Code Not Generated',
          disable: true
        });
      }
      else {
        setButton({
          text: 'Enter OTP',
          disable: false
        });
      }
    }
    else if (data?.status === 'Verified') {
      if (data?.amount === "-1") {
        setButton({
          text: 'Add Amount',
          disable: false
        });
      }
    }
    else if (data?.status === 'Transaction Pending') {
      setButton({
        text: 'Transaction Approval Pending',
        disable: true
      });
    }
    else if (data?.status === 'Completed') {
      setButton({
        text: 'Completed',
        disable: true
      });
    }
  }, [data]);

  const doRespond = async () => {
    setLoading(true);
    await setResponded(data?.email, data?.createdAt).then(
      async (res) => {
        if (res.error) {
          console.log(res);
          ToastAndroid.show(res.error, ToastAndroid.SHORT);
        }
        else {
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
          await getData();
        }
      }
    )
    setLoading(false);
  }

  const onButtonPress = async () => {
    if (data?.status === 'Pending') {
      await doRespond();
    }
    else if (data?.status === 'Responded') {
      setOpenPopup({ ...openPopup, verifyPopup: true });
    }
    else if (data?.status === 'Verified') {
      if (data?.amount === "-1") {
        setOpenPopup({ ...openPopup, addAmountPopUp: true });
      }
    }
    else if (data?.status === 'Transaction Pending') {
      setButton({
        text: 'Transaction Approval Pending',
        disable: true
      });
    }
    else if (data?.status === 'Completed') {
      setButton({
        text: 'Completed',
        disable: true
      });
    }
  }
  

  return (
    <View style={{ flex: 1, backgroundColor : COLORS.white }}>
      <View style={styles.Header}>
        <TouchableOpacity onPress={handleBackNavigation}>
          <View style={styles.circleContainer}>
            <Circle style={styles.circleStyle} />
            <Back style={styles.backStyle} />
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'flex-end', flex: 1, marginEnd: 15, marginTop: 3 }}>
          <View>
            <Text style={styles.titleText}>View Pickup*</Text>
          </View>
        </View>
        <Bag style={{}} />
      </View>


      <View style={styles.card}>

        {loading && <Loading />}

        <Image
          source={{ uri: data?.imageurl }} // Load image from URL using uri prop
          style={styles.cardImage}
          resizeMethod='contain'
        />

      </View>

      {data?.status !== "Completed" &&
        <Text style={styles.text}>Our associate will reach out to you for this donation.</Text>
      }

      <View style={styles.detailfield}>
        <View style={styles.detailVal}>
          <Text style={styles.cardText}>Address :</Text>
        </View>
        <View style={styles.detailVal1}>
          <Text style={styles.cardTextVal}>{data?.address}</Text>
        </View>
      </View>


      <View style={styles.detailfield}>
        <View style={styles.detailVal}>
          <Text style={styles.cardText}>Contact Number :</Text>
        </View>
        <View style={styles.detailVal1}>
          <Text style={styles.cardTextVal}>{data?.phone}</Text>
        </View>
      </View>

      <View style={styles.detailfield}>
        <View style={styles.detailVal}>
          <Text style={styles.cardText}>Date :</Text>
        </View>
        <View style={styles.detailVal1}>
          <Text style={styles.cardTextVal}>{data?.date}</Text>
        </View>
      </View>


      <View style={styles.detailfield}>
        <View style={styles.detailVal}>
          <Text style={styles.cardText}>Timing :</Text>
        </View>
        <View style={styles.detailVal1}>
          <Text style={styles.cardTextVal}>{data?.time}</Text>
        </View>
      </View>

      <View style={styles.detailfield}>
        <View style={styles.detailVal}>
          <Text style={styles.cardText}>Status :</Text>
        </View>
        <View style={styles.detailVal1}>
          <Text style={styles.cardTextVal}>{data?.status}</Text>
        </View>
      </View>

      { data?.amount !== "-1" &&
        
        <View style={styles.detailfield}>
          <View style={styles.detailVal}>
            <Text style={styles.cardText}>Amount :</Text>
          </View>
          <View style={styles.detailVal1}>
            <Text style={styles.cardTextVal}>{data?.amount}</Text>
          </View>
        </View>
      
      }


      <View style={styles.btn}>
        <Button
          disabled={button.disable}
          onPress={onButtonPress}
          title={button.text}
          filled />
      </View>

      {openPopup.verifyPopup &&
        <VerifyPickup
          email={data?.email}
          createdAt={data?.createdAt}
          handleDismiss={() => { setOpenPopup({ ...openPopup, verifyPopup: false }); getData(); }} />
      }

      {openPopup.addAmountPopUp &&
        <AddAmount
          email={data?.email}
          createdAt={data?.createdAt}
          handleDismiss={() => { setOpenPopup({ ...openPopup, addAmountPopUp: false }); getData(); }} />
      }
    </View>
  );
};

export default ViewPickupAdmin

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
  cardImage: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  Header: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    paddingHorizontal: 10,
    backgroundColor: 'red',
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: 'ubuntu_bold',
    fontWeight: "500",
    color: COLORS.use_dark_green,
    marginTop: 15,
    marginStart: 25,
  },
  titleText: {
    fontSize: 23,
    fontFamily: 'ubuntu',
    fontWeight: '700',
    color: COLORS.use_dark_green,
    marginTop: 4,
  },
  text: {
    fontFamily: 'ubuntu',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '700',
    color: COLORS.use_dark_green,
    opacity: 0.7,
    marginHorizontal: 10,
    marginVertical: 25,
  },
  circleContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  detailVal: {
    // backgroundColor : 'red',
    width: '40%',
  },
  detailVal1: {
    // backgroundColor : 'red',
    width: '50%',
  },
  circleStyle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backStyle: {
    position: 'absolute',
    top: '50%',
    marginStart: 13,
    marginTop: -15, // Adjust the value based on the icon size to center it
    // Additional styles for the Back image if needed
  },

  cardText: {
    fontFamily: 'ubuntu',
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    opacity: 0.9,
    marginHorizontal: 10,
    // marginVertical: 10,
  },
  cardTextVal: {
    fontFamily: 'ubuntu',
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.use_dark_green,
    opacity: 0.9,
    marginHorizontal: 10,
    // marginVertical: 10,
  },
  detailfield: {
    flexDirection: 'row',
    marginTop: 15,
    // backgroundColor : 'red',
    gap: 15,
    marginHorizontal: 15,
    overflow: 'hidden',
  },
  btn: {
    position: 'absolute',
    bottom: 10,
    marginHorizontal: 15,
    left: 10,
    right: 10,
  },
})