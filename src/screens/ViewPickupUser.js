import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid , Linking} from 'react-native'
import COLORS from '../constants/colors';
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Bag } from '../components/icons';
import { Circle } from '../components/icons';
import { Back } from '../components/icons';
import Loading from '../components/Loading';
import Button from '../components/Button';
import VerifyPickup from '../components/PopUps/VerifyPickup';
import { useSelector } from 'react-redux';
import { fetch_pickup } from '../services/PickupService';
import { generateOTP } from '../services/SpecialServices';
import ConfirmApprove from '../components/PopUps/ConfirmApprove';

const ViewPickupUser = ({ route }) => {
  const [data, setData] = useState(route?.params);
  const auth = useSelector(state => state.auth);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [button, setButton] = useState({
    text: "Generate OTP",
    disable: false,
  });

  const [openPopUp, setOpenPopup] = useState({
    confirm : false,
  })


  useEffect(() => {
    if (data?.status === 'Pending') {
      if (data?.code === "-1") {
        setButton({
          text: 'Generate OTP',
          disable : false,
        })
      }
      else {
        setButton({
          text: 'Verification Pending',
          disable : true,
        })
      }
    }
  }, [data]);

  const handleBackNavigation = () => {
    navigation.goBack();
  }

  const getData = async () => {
    setLoading(true);
    await fetch_pickup(auth?.email, data?.createdAt)
      .then(res => {
        if (res.error) {
          console.log(res);
        }
        else {
          setData(res.response);
        }
      });
    setLoading(false);
  }

  useEffect(()=>{
    getData();
  }, [])

  useEffect(() => {
    if (data?.status === 'Pending') {
      setButton({
        text: 'Pending',
        disable: true
      });
    }
    else if (data?.status === 'Responded') {
      if (data?.code === "-1") {
        setButton({
          text: 'Generate OTP',
          disable: false
        });
      }
      else {
        setButton({
          text: 'Verification Pending by Picker',
          disable: true
        });
      }
    }
    else if (data?.status === 'Verified') {
      if (data?.amount === "-1") {
        setButton({
          text: 'Amount Not Added',
          disable: true
        });
      }
    }
    else if (data?.status === 'Transaction Pending') {
      setButton({
        text: 'Approve Transaction',
        disable: false
      });
    }
    else if (data?.status === 'Completed') {
      setButton({
        text: 'Completed',
        disable: true
      });
    }
  }, [data]);

  

  const generateCode = async () => {
    setLoading(true);
    await generateOTP(auth?.email, data?.createdAt).then(res=>{
        if(res.error){
          console.log(res);
          ToastAndroid.show(res.error, ToastAndroid.SHORT);
        }
        else{
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
        }
    })
    await getData();
    setLoading(false);
  }

  const onButtonPress = async () => {
    if (data?.status === 'Responded' && data?.code === '-1') {
      await generateCode();
    }
    else if (data?.status === 'Verified') {
      if (data?.amount === "-1") {
        setButton({
          text: 'Amount Not Added',
          disable: true
        });
      }
    }
    else if (data?.status === 'Transaction Pending') {
      setOpenPopup({...openPopUp, confirm : true});
    }
    else if (data?.status === 'Completed') {
      setButton({
        text: 'Completed',
        disable: true
      });
    }

  }

  return (
    <View style={{ flex: 1 , backgroundColor : COLORS.white}}>
      <View style={styles.Header}>
        <TouchableOpacity onPress={handleBackNavigation}>
          <View style={styles.circleContainer}>
            <Circle style={styles.circleStyle} />
            <Back style={styles.backStyle} />
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'flex-end', flex: 1, marginEnd: 15, marginTop: 3 }}>
          <View>
            <Text style={styles.titleText}>View Pickup</Text>
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


      {data?.code !== "-1" &&
        <View style={styles.detailfield}>
          <View style={styles.detailVal}>
            <Text style={styles.cardText}>Security Code :</Text>
          </View>
          <View style={styles.detailVal1}>
            <Text style={styles.cardTextVal}>{data?.code}</Text>
          </View>
        </View>
      }

      
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

      <View>
      {openPopUp.confirm && 
        <ConfirmApprove 
          email = {auth?.email}
          createdAt={data?.createdAt}
          handleDismiss={()=>{setOpenPopup({...openPopUp, confirm: false}); getData();}}
        />
      }
      </View>

    
    </View>
  );
};

export default ViewPickupUser

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