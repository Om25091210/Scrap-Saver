import { ImageBackground, StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Back, Bag, Circle } from '../components/icons'
import Toast from 'react-native-simple-toast';
import COLORS from '../constants/colors'
import { useNavigation } from '@react-navigation/native'
import PickupCard from '../components/PickupCard'
import Loading from '../components/Loading'
import { fetch_pickups } from '../services/PickupService';
import { useSelector } from 'react-redux';


const PickupsPage = () => {

    const [selectedTab, setSelectedTab] = useState('Pending');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const auth = useSelector(state => state.auth);

    const navigation = useNavigation();

    const fetchData = async (status) => {
        setLoading(true);
        try {
            const jsonData = await fetch_pickups(auth?.email, status);
            console.log(jsonData);
            setData(jsonData.response); // Assuming the 'response' key contains the data array
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(selectedTab);
    }, [selectedTab]);

    const deleteItem = () => {
        fetchData(selectedTab);
    };

    const reversedData = data.slice().reverse();

    const handleBackNavigation = () => {
        navigation.goBack();
    }

    const render = ({ item }) => {
        return (
            <PickupCard
                item={item} // Pass the entire item object as props
                onDelete={deleteItem}
                onView = {()=>{
                    if(auth?.role==='admin')
                        navigation.navigate("ViewPickupAdmin" , item);
                    else
                        navigation.navigate("ViewPickupUser" , item);
                }}
            />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {loading && <Loading />}
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
                    <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'flex-end', flex: 1, marginEnd: 15, marginTop: 3 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedTab('Pending')
                            }}>
                            <Text style={selectedTab === 'Pending' ? styles.titleText : styles.notSelectedTitleText}>Pickups</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedTab('Completed')
                            }}>
                            <Text style={selectedTab === 'Completed' ? styles.titleText : styles.notSelectedTitleText}>Completed</Text>
                        </TouchableOpacity>
                    </View>
                    <Bag style={{}} />
                </View>

                <FlatList
                    data={reversedData}
                    renderItem={render}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingBottom: 20 }}
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
        opacity: 0.3,
        color: COLORS.use_dark_green,
        marginTop: 4,
    },
    text: {
        color: COLORS.use_dark_green,
        opacity: 0.8,
        alignSelf: 'center',
        width: '100%',
        marginTop: 20,
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