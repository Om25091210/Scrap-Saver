import { ImageBackground, StyleSheet,TouchableOpacity,  Text, View, FlatList } from 'react-native'
import React, {useState} from 'react'
import { Back, Bag, Circle } from '../components/icons'
import COLORS from '../constants/colors'
import { useNavigation } from '@react-navigation/native'
import PickupCard from '../components/PickupCard'


const PickupsPage = () => {

    const [selectedTab , setSelectedTab] = useState('Pickups');
    const navigation = useNavigation();

    const list = [1,2,3,4,5,6,7,8,9];


    const handleBackNavigation = () =>{
        navigation.goBack();
    }

    const render = ({item}) =>{
      return (
        <PickupCard/>
      )
    }

    return (
        <View style={{ flex: 1 }}>

            <ImageBackground
                source={require('../assets/formBG.png')}
                style={{ flex: 1 }}
            >

                <View style={styles.Header}>
                    <TouchableOpacity onPress={handleBackNavigation}>
                        <View style={styles.circleContainer}>
                            <Circle style={styles.circleStyle} />
                            <Back style={styles.backStyle} />
                        </View>
                    </TouchableOpacity>
                    <View style = {{flexDirection : 'row', gap : 5, justifyContent : 'flex-end',flex : 1,}}>
                        <TouchableOpacity
                            onPress={()=>{
                                setSelectedTab('Pickups')
                            }}>
                            <Text style = {selectedTab ==='Pickups' ? styles.titleText : styles.notSelectedTitleText}>Pickups</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={()=>{
                                setSelectedTab('Completed')
                            }}>
                            <Text style = {selectedTab ==='Completed' ? styles.titleText : styles.notSelectedTitleText}>Completed</Text>
                        </TouchableOpacity>
                    </View>
                    <Bag style={{}} />
                </View>

                <FlatList 
                    data = {list}
                    renderItem={render}

                />
               

            </ImageBackground>

        </View>
    )
}

export default PickupsPage

const styles = StyleSheet.create({
    Header: {
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
      notSelectedTitleText: {
        fontSize: 23,
        fontFamily: 'ubuntu',
        fontWeight: '700',
        opacity : 0.5,
        color: COLORS.use_dark_green,
        marginTop: 4,
      },
      text : {
        color : COLORS.use_dark_green,
        opacity : 0.8,
        alignSelf : 'center',
        width : '80%',
        marginTop : 20,
      },  
      circleContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'flex-start',
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
})