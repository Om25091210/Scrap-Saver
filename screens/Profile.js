import { View, Text, Image, Pressable, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from '../components/Button';

import {
    Back,
    Circle,
    Bag,
    SaverWallet,
    TotalEarning,
} from "../components/icons";

const Profile = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    
    const handleBackNavigation = () => {
        // Handle your navigation logic here
        navigation.goBack(); // Example: Go back to the previous screen
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.Header}>
                <TouchableOpacity onPress={handleBackNavigation}>
                    <View style={styles.circleContainer}>
                        <Circle style={styles.circleStyle} />
                        <Back style={styles.backStyle} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.titleText}>Wallet & Rewards</Text>
                <Bag style={{}} />
            </View>
            <Text style={styles.title}>Wallet</Text>
            <View style={styles.container}>
                {/* First View */}
                <View style={styles.wrapper}>
                    <View style={styles.contentWrapper}>
                        <SaverWallet style={styles.icon} />
                        <Text style={styles.amountText}>2500 RS</Text>
                    </View>
                    <Text style={styles.balanceText}>Wallet Balance</Text>
                </View>
                {/* Second View */}
                <View style={styles.wrapper}>
                    <View style={styles.contentWrapper}>
                        <TotalEarning style={styles.icon} />
                        <Text style={styles.amountText}>1500 RS</Text>
                    </View>
                    <Text style={styles.balanceText}>Total Earning</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Header:{
        marginHorizontal: 20,
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        fontFamily: 'ubuntu_bold',
        fontWeight: '500',
        color: COLORS.use_dark_green,
        marginTop: 15,
        marginStart:25,
    },
    titleText: {
        fontSize: 23,
        fontWeight: 'bold',
        fontFamily: 'ubuntu_bold',
        fontWeight: '500',
        color: COLORS.use_dark_green,
        marginTop: 4,
        marginStart:70,
    },
    circleContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'start',
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
        marginStart:13,
        marginTop: -15, // Adjust the value based on the icon size to center it
        // Additional styles for the Back image if needed
    },
    container: {
        flexDirection: 'row',
        marginHorizontal:20,
        marginTop: 12,
    },
    wrapper: {
        flex: 1,
        margin: 5,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.use_dark_green,
        padding: 10,
        margin: 10,
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    icon: {
        marginRight: 10,
    },
    amountText: {
        fontSize: 22,
        fontFamily: 'ubuntu_bold',
        fontWeight: '500',
        color: COLORS.use_dark_green,
    },
    balanceText: {
        fontSize: 16,
        marginTop: 12,
        marginStart: 8,
        fontFamily: 'ubuntu_bold',
        fontWeight: '500',
        color: COLORS.use_dark_green,
    },
});

export default Profile;
