import React, { useEffect } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../components/Cart";
import Dish from "../components/Dish";
import { addDishToCart, getDishes, setShowingModal, setShowingSuccessModal } from "../store/restaurant.slice";

const DishesPage = () => {
    const showModal = useSelector(state => state.restaurant.showingModal);
    const showSuccessModal = useSelector(state => state.restaurant.showingSuccessModal);
    const dishes = useSelector(state => state.restaurant.dishes);
    const loading = useSelector(state => state.restaurant.loading);
    const showError = useSelector(state => state.restaurant.showError);
    const errorMessage = useSelector(state => state.restaurant.errorMessage);
    const totalPrice = useSelector(state => state.restaurant.totalPrice);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDishes());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const openModal = () => {
        dispatch(setShowingModal(true));
    };

    const closeModal = () => {
        dispatch(setShowingModal(false));
    };

    const closeSuccessModal = () => {
        dispatch(setShowingSuccessModal(false));
    };

    const addToCart = (dish, id) => {
        dispatch(addDishToCart({ dish, id }));
    };

    return (
        <View style={styles.dishesContainer}>
            {showSuccessModal ? <Modal>
                <View style={styles.modalSuccess}>
                    <Text style={[styles.errorText, { fontSize: 22, textAlign: 'center' }]}>{'Your order has been placed Successfully!'}</Text>
                    <Pressable style={styles.buttonOk} onPress={closeSuccessModal}>
                        <Text style={styles.buttonText}>Ok</Text>
                    </Pressable>
                </View>
            </Modal>
                : null}
            {showError ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            {showModal ?
                <Modal>
                    <Cart cancelClick={closeModal} />
                </Modal>
                : null}
            {loading ? <Text style={styles.errorText}>Loading...</Text> :
                dishes === null || dishes === undefined ?
                    <Text style={styles.errorText}>No dishes yet</Text>
                    :
                    <FlatList style={styles.dishesList} data={Object.keys(dishes)}
                        renderItem={({ item }) => {
                            return <Dish
                                title={dishes[item].title}
                                price={dishes[item].price}
                                image={dishes[item].image}
                                click={() => addToCart(dishes[item], [item])}
                                keyExtractor={(item) => item.key}
                            />
                        }}
                    />}
            <View style={styles.dishesRow}>
                <Text style={styles.priceTextTotal}>Order Total: {totalPrice}</Text>
                <Pressable style={styles.button} onPress={openModal}>
                    <Text style={styles.buttonText}>Checkout</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dishesContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 10
    },
    errorText: {
        color: '#ad411d',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10
    },
    button: {
        flex: 0,
        backgroundColor: '#ad411d',
        margin: 15,
        alignItems: 'center',
        padding: 8,
        borderRadius: 4
    },
    buttonOk: {
        flex: 0,
        backgroundColor: '#323232',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 20,
    },
    dishesRow: {
        flexDirection: "row",
        padding: 20,
        alignItems: 'center',
        alignSelf: 'center'
    },
    priceTextTotal: {
        fontSize: 19,
        flexGrow: 0,
    },
    dishesList: {
        paddingTop: 20,
        paddingBottom: 20
    },
    modalSuccess: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100 + '%'
    }
});

export default DishesPage;