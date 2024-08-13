import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useOrientation from "../customHooks/useOrientation";
import { clearCart, createOrder, removeDishInCart, setShowingModal, setShowingSuccessModal } from "../store/restaurant.slice";
import CartItem from "./CartItem";

const Cart = (props) => {
    const dishesInCart = useSelector(state => state.restaurant.dishesInCart);
    const delivery = useSelector(state => state.restaurant.delivery);
    const totalPrice = useSelector(state => state.restaurant.totalPrice);

    const orientation = useOrientation();
    const dispatch = useDispatch();

    const removeDish = (id) => {
        dispatch(removeDishInCart(id));
    };

    const submit = (e) => {
        e.preventDefault();
        const theseDishes = dishesInCart.map((d) => {
            return { [d.id]: d.quantity }
        });
        let object = Object.assign({}, ...theseDishes);
        dispatch(createOrder(object));
        dispatch(setShowingModal(false));
        dispatch(clearCart());
    };

    return (
        <View style={[styles.CartContainer, { height: orientation.height }]}>
            <View style={styles.cartRow}>
                <Text style={styles.redTitle}>Your order:</Text>
            </View>
            {dishesInCart.length < 1 ?
                <Text style={styles.errorText}>No dishes yet</Text>
                :
                <FlatList style={styles.list} data={dishesInCart}
                    renderItem={({ item, index }) => {
                        return <CartItem
                            id={item.id}
                            title={item.title}
                            quantity={item.quantity}
                            price={item.price}
                            sum={item.sum}
                            removeIt={() => removeDish(index)}
                            keyExtractor={(item) => item.id}
                        />
                    }}
                />
            }
            <View style={styles.column}>
                <View style={styles.cartRow}>
                    <Text style={styles.title}>Delivery: {delivery}</Text>
                    <Text style={styles.title}>Total: {totalPrice}</Text>
                </View>
                <View style={styles.cartRow}>
                    <Pressable style={[styles.button, { backgroundColor: '#323232' }]} onPress={props.cancelClick}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                    <Pressable style={totalPrice === delivery ?
                        [styles.button, { opacity: 0.3 }] : styles.button}
                        disabled={totalPrice === delivery ? true : false}
                        onPress={(e) => submit(e)}>
                        <Text style={styles.buttonText}>Order</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    CartContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorText: {
        color: '#ad411d',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10
    },
    cartRow: {
        flexDirection: "row",
        alignItems: 'center',
        rowGap: 25
    },
    button: {
        flex: 0,
        backgroundColor: '#ad411d',
        margin: 15,
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
    list: {
        paddingTop: 20,
        paddingBottom: 20
    },
    redTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#ad411d',
        padding: 20,
        flexShrink: 1,
        textTransform: "uppercase",
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        flexShrink: 1,
        textTransform: "uppercase",
        textAlign: 'center'
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center'
    },
})

export default Cart;