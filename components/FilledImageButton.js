import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';

const FilledImageButton = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Image
                source={require('../assets/google_img.png')} // Replace with your image source
                style={styles.image}
            />
            <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    image: {
        width: 20, // Set your desired width
        height: 20, // Set your desired height
        marginRight: 10, // Adjust spacing as needed
    },
    text: {
        color: COLORS.white,
        fontSize: 18,
        fontFamily: 'ubuntu_bold',
    },
});

export default FilledImageButton;
