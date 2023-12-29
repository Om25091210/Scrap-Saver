import { View, Text, Image, ActivityIndicator, ScrollView, TextInput, FlatList, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "react-native-elements"; 
import COLORS from '../constants/colors';
import Button from '../components/Button';
import FilledButton from '../components/FilledButton';
import {
    EnvLogo,
    Bulb,
    TreeSaved,
    WaterSaved,
    EnergySaved,
    DownArrow,
    Search,
  } from "../components/icons";
import { useSelector } from 'react-redux';
import { fetch_rates } from '../services/RatesServices';

const Home = ({ navigation }) => {
    const [filterdData, setfilterdData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [search, setsearch] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State to manage loading indicator


    const auth = useSelector(state => state.auth);
    

    useEffect(() => {
        fetchPosts();
        return () => {

        }
    }, [])

    const fetchPosts = async () => {
        setIsLoading(true);
        try {  
            
            await fetch_rates().then(res => {
                if(res.error)
                {
                    console.log(res);
                }
                else{
                    setfilterdData(res);
                    setmasterData(res);
                    setIsLoading(false);
                }
            }).catch(error => {
                console.log(error)
            });

        } catch (error) {
            console.error('Error fetching data: ', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const searchFilter = (text) => {
        if (text) {
          const newData = masterData.scrapCategories.map((categoryObj) => {
            // Filter items within each category based on the text
            const filteredItems = categoryObj.items.filter((subItem) => {
              // Access the name property within each subItem
              const itemName = subItem.name ? subItem.name.toUpperCase() : '';
              return itemName.includes(text.toUpperCase());
            });
      
            // Return a new object with the updated filtered items
            return {
              ...categoryObj,
              items: filteredItems,
            };
          });
      
          // Filter the newData to get only categories with non-empty items
          const filteredCategories = {
            scrapCategories: newData
              .filter((category) => category.items.length > 0)
              .map((categoryObj) => ({
                category: categoryObj.category,
                items: categoryObj.items,
              })),
          };
      
          // Update the filtered data state and search text
          setfilterdData(filteredCategories);
          setsearch(text);
      
          console.log("Filtered " + JSON.stringify(filteredCategories));
        } else {
          // When no text is entered, show all data
          setfilterdData(masterData);
          setsearch(text);
        }
      };
      
        

    const ItemView = ({item}) =>{
        return (
            <View>
                <Text style={styles.category}>{item.category}</Text>
                <View style={styles.horizontalCardContainer}>
                    {item.items.map((subItem, index) => (
                    <TouchableOpacity key={index} style={styles.card}>
                        <Text style={styles.cardText}>{subItem.name}</Text>
                        <Text style={styles.cardText}>{subItem.rate}</Text>
                    </TouchableOpacity>
                    ))}
                </View>
            </View>
        )
    }

    const ItemSeparatorView =() => {
        return (
            <View
                style={{height: 0.5, width: '100%', backgroundColor: "#c8c8c8"}}
            />
        )
    }

    if (isLoading) {
        return (
            // Render a loading indicator while fetching data
            <SafeAreaView style={styles.safeArea}>
                <ScrollView>
                    <View style={styles.mainContainer}>
                        <View style={styles.header}>
                            <View style={styles.titleContainer}>
                                <Bulb style={styles.bulbIcon} />
                                <Text style={styles.titleText}>Hii {auth?.name.split(' ')[0]} !!</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                              <EnvLogo style={styles.envLogo} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require("../assets/scrapSaver.png")}
                                style={styles.image}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.impactText}>
                                Impact
                        </Text>
                        <Text style={styles.impactDes}>
                                Keep up the great work! You Saved
                        </Text>
                    </View>

                    <View style={styles.loadingContainer}>
                        
                        <ActivityIndicator size="large" color={COLORS.use_dark_green} />
                            
                    </View>
            </ScrollView>
        </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
                <ScrollView>
                    <View style={styles.mainContainer}>
                        <View style={styles.header}>
                            <View style={styles.titleContainer}>
                                <Bulb style={styles.bulbIcon} />
                                <Text style={styles.titleText}>Hii Abhishek!!</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                              <EnvLogo style={styles.envLogo} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require("../assets/scrapSaver.png")}
                                style={styles.image}
                            />
                        </View>
                    </View>
                
                <View>
                    <Text style={styles.impactText}>
                            Impact
                    </Text>
                    <Text style={styles.impactDes}>
                            Keep up the great work! You Saved
                    </Text>
                </View>

                <View style={styles.card_container}>
                    <View style={{ position: 'relative' }}>
                        <TreeSaved />
                        <View style={styles.TreeSavedView}>
                            <Text style={styles.TreeSavedText}>8</Text>
                        </View>
                    </View>
                    <View style={{ position: 'relative' }}>
                        <WaterSaved />
                        <View style={styles.WaterSavedView}>
                            <Text style={styles.WaterSavedText}>4</Text>
                        </View>
                    </View>
                    <View style={{ position: 'relative' }}>
                        <EnergySaved />
                        <View style={styles.TreeSavedView}>
                            <Text style={styles.WaterSavedText}>50</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.ViewStyle}>
                    <View style={{ marginBottom: 10 }}>
                        <FilledButton title="Schedule a Pickup" 
                        onPress={() => navigation.navigate("Form")} />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Button
                            style={styles.ButtonStyle}
                            title="View Pickups"
                            onPress={() => navigation.navigate("PickupsPage")}
                        />
                    </View>
                </View>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Text style={styles.scrollToText}>
                        Scroll to
                    </Text>
                    <Text style={styles.checkRates}>
                        Check Rates
                    </Text>
                    <DownArrow style={{ marginTop:-7 }} />
                </View>

                <View style={styles.container}>
                    <View style={styles.searchContainer}>
                        <Search style={styles.searchIcon} />
                        <TextInput
                            style={styles.textInputStyle}
                            value={search}
                            placeholder="Search Here..."
                            placeholderTextColor={COLORS.black}
                            onChangeText={(text) => searchFilter(text)}
                        />
                    </View> 

                    <FlatList
                                data={filterdData.scrapCategories}
                                scrollEnabled={false}
                                keyExtractor={(item,index) => index.toString()}
                                ItemSeparatorComponent={ItemSeparatorView}
                                renderItem={ItemView}
                            />
                    

                </View>
             </ScrollView>
        </SafeAreaView>
    )
}
const styles= StyleSheet.create({
    checkRates:{
        fontSize: 20,
        fontFamily: "ubuntu_bold",
        color: COLORS.use_dark_green,
        marginStart: 5,
        marginTop: -7,
    },
    scrollToText:{
        fontSize: 15,
        fontFamily: "ubuntu_bold",
        color: COLORS.use_light_green,
        marginStart: 20,
        marginTop: -5,
    },
    ButtonStyle:{
        alignItems: 'center',
        padding: 10,
        backgroundColor: COLORS.background,
        width: '100%', // Adjust width to take full space
    },
    ViewStyle:{
        alignItems: 'stretch',
        padding: 10,
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: COLORS.background, // Set your background color
    },
    WaterSavedText:{
        fontSize: 15,
        color: COLORS.black,
        fontFamily: "ubuntu_bold",
        fontWeight: "300",
    },
    WaterSavedView:{
        position: 'absolute',
        left: -5,
        bottom:-5,
        width: 30, // Define the width and height to create a circle
        height: 30,
        borderRadius: 15, // Half of the width and height to make it a circle
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    TreeSavedText: {
        fontSize: 15,
        color: COLORS.black,
        fontFamily: "ubuntu_bold",
        fontWeight: "300",
    },
    TreeSavedView :{
        position: 'absolute',
        top: -4,
        right: -5,
        width: 30, // Define the width and height to create a circle
        height: 30,
        borderRadius: 15, // Half of the width and height to make it a circle
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    card_container :{ 
        marginStart: 10, 
        marginTop: 10, 
        marginEnd: 10, 
        flexDirection: 'row',
         justifyContent: "space-evenly"
    },
    impactDes:{
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily:"ubuntu_bold",
        color: COLORS.black,
        marginStart: 20,
    },
    impactText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily:"ubuntu_bold",
        fontWeight:"300",
        color: COLORS.use_dark_green,
        marginStart: 20,
        marginTop: 15,
    },
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    header: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleContainer: {
        flex: 1,
        marginTop: 28,
        flexDirection: 'row',
    },
    bulbIcon: {
        width: 30,
        height: 30,
        marginRight: 8,
    },
    titleText: {
        fontSize: 23,
        fontWeight: 'bold',
        fontFamily: 'ubuntu_bold',
        fontWeight: '500',
        color: COLORS.use_dark_green,
        marginTop: 4,
    },
    envLogo: {
        width: 50,
        height: 50,
        marginTop: 20,
    },
    imageContainer: {
        marginTop: 10,
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 20,
    },
    itemStyle: {
        padding: 10,
        color: COLORS.black,
    },
    itemSeparator: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#c8c8c8',
    },
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    itemStyle: {
        padding: 10,
        color: COLORS.black,
    },
    searchBarInputContainer: {
        backgroundColor: COLORS.white,
    },
    searchIcon: {
        marginRight: 10,
    },
    textInputStyle: {
        flex: 1,
        paddingVertical: 8, 
        color: '#179D32',
        fontFamily: "ubuntu_bold"
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10, // Adjust the padding as needed
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.light_search_border, // Set the border color if needed
        borderRadius: 15,
        marginTop: 15,
        marginHorizontal: 20, // Adjust horizontal margin
        marginBottom: 10, // Add margin bottom if necessary
    },
    category: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 10,
        color: 'black',
      },
      horizontalCardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
      },
      card: {
        width: '48%', // Adjust the width as needed
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
      },
      cardText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
      },
});

export default Home