import { ImageBackground, StyleSheet,TouchableOpacity,  Text, View, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Back, Bag, Circle } from '../components/icons'
import Toast from 'react-native-simple-toast';
import COLORS from '../constants/colors'
import { useNavigation } from '@react-navigation/native'
import PickupCard from '../components/PickupCard'
import Loading from '../components/Loading'


const PickupsPage = () => {

    const [selectedTab , setSelectedTab] = useState('Pickups');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigation = useNavigation();

    const fetchData = async (status) => {
      
     setLoading(true);
      try {
          const dataOptions = {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'authorization':'LqA[3br%H{Am1r2aFmXx_=Z1r1'
              },
          };
          const url = `https://c0e5-2405-201-3005-afd-4cf9-b55d-60c1-5cd7.ngrok-free.app/donations/omyadav04352@gmail.com/${status}`;
          const response = await fetch(url, dataOptions);
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const jsonData = await response.json();
          setData(jsonData.response); // Assuming the 'response' key contains the data array
          setLoading(false);
      } catch (error) {
          setError(error.message);
          setLoading(false);
      }
    };
    
    useEffect(() => {
        fetchData('Pending'); // Fetch 'Pending' donations by default
    }, []);  

    const deleteItem = (email, createdAt) => {
        // Filter out the item to be deleted based on email and createdAt
        const updatedData = data.filter(item => item.email !== email || item.createdAt !== createdAt);
        setData(updatedData); // Update state to trigger re-render
    };

    const reversedData = data.slice().reverse();

    const handleBackNavigation = () =>{
        navigation.goBack();
    }

    const render = ({item}) =>{
      return (
        <PickupCard
            item={item} // Pass the entire item object as props
            onDelete={deleteItem} 
        />
      )
    }

    return (
        <View style={{ flex: 1 }}>
            {loading && <Loading/>}    
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
                    <View style = {{flexDirection : 'row', gap : 20, justifyContent : 'flex-end',flex : 1, marginEnd: 15, marginTop: 3}}>
                        <TouchableOpacity
                            onPress={()=>{
                                setSelectedTab('Pickups')
                                fetchData('Pending');
                            }}>
                            <Text style = {selectedTab ==='Pickups' ? styles.titleText : styles.notSelectedTitleText}>Pickups</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={()=>{
                                setSelectedTab('Completed')
                                fetchData('Completed');
                            }}>
                            <Text style = {selectedTab ==='Completed' ? styles.titleText : styles.notSelectedTitleText}>Completed</Text>
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
        opacity : 0.3,
        color: COLORS.use_dark_green,
        marginTop: 4,
      },
      text : {
        color : COLORS.use_dark_green,
        opacity : 0.8,
        alignSelf : 'center',
        width : '100%',
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