import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import useOrientation from "../customHooks/useOrientation";

const CartItem = (props) => {
    const orientation = useOrientation();

    return (
        <View style={[styles.cartItemRow, { width: orientation.width / 10 * 9 - 10 }]}>
            <Text style={styles.cartItemText}>
                {props.title} X {props.quantity}
            </Text>
            <Pressable style={styles.minusButton} onPress={props.removeIt}>
                <Text style={styles.buttonText}>-</Text>
            </Pressable>
            <Text style={styles.cartItemPriceText}>
                {props.sum} KGS
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    cartItemRow: {
        flexDirection: "row",
        margin: 10,
        backgroundColor: '#dedede',
        borderRadius: 6,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        rowGap: 10,
        flexWrap: "wrap",
    },
    cartItemText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#323232',
        flex: 2,
    },
    cartItemPriceText: {
        fontSize: 19,
        flex: 1,
        textAlign: 'right'
    },
    minusButton: {
        flexShrink: 1,
        backgroundColor: '#ad411d',
        margin: 4,
        alignItems: 'center',
        padding: 8,
        borderRadius: 4
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 20,
    },
});

export default CartItem;