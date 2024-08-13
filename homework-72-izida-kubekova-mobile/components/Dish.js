import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import useOrientation from "../customHooks/useOrientation";

const Dish = (props) => {
    const orientation = useOrientation();

    return (
        <Pressable style={({ pressed }) =>
            [styles.dishRow, {
                width: orientation.width / 10 * 9 - 10,
                backgroundColor: pressed ? 'gray' : '#dedede',
            }]}
            onPress={props.click}>
            <Image style={styles.image} source={{ uri: props.image }} />
            <View style={styles.dishColumn}>
                <Text style={styles.dishTitle}>
                    {props.title}
                </Text>
                <Text style={styles.priceText}>
                    {props.price} KGS
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    dishRow: {
        flexDirection: "row",
        margin: 10,
        borderRadius: 6,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        rowGap: 10,
    },
    dishColumn: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    dishTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#323232',
        paddingLeft: 20,
        paddingRight: 10,
        flexShrink: 1,
        textAlign: 'left',
    },
    priceText: {
        fontSize: 19,
        flex: 1,
        textAlign: 'left',
        paddingLeft: 20,
        paddingRight: 10,
        paddingTop: 20
    },
    image: {
        width: 130,
        height: 130,
        objectFit: 'cover',
        overflow: 'hidden',
        borderRadius: 6,
    }
});

export default Dish;