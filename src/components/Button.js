import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'

const Button = (props) => {
    const filledBgColor = props.color || COLORS.primary;
    const outlinedColor = COLORS.white;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.primary;

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{ backgroundColor: bgColor },
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={[styles.text, { color: textColor }]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: '100',
        fontFamily: 'ubuntu_bold',
    }

})
export default Button