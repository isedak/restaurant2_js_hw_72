import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Order from "../../components/Order/Order";
import Loader from "../../components/UI/Loader/Loader";
import { getDishes } from "../../store/dishes.slice";
import { deleteOrder, getOrders } from "../../store/orders.slice";
import './OrdersPage.css';

const OrdersPage = () => {
    const orders = useSelector(state => state.orders.orders);
    const loading = useSelector(state => state.orders.loading);
    const loadingDishes = useSelector(state => state.dishes.loading);
    const showError = useSelector(state => state.orders.showError);
    const errorMessage = useSelector(state => state.orders.errorMessage);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDishes());
        dispatch(getOrders());        
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const deleteIt = (e, id) => {
        e.preventDefault();
        dispatch(deleteOrder(id));
    };

    return (
        <div className="OrdersPage-container">
            <div className="OrdersPage-background flex-row">
                <div className="OrdersPage-column">
                    {showError ? <p className='OrdersPage-error-text'>{errorMessage}</p> : null}
                    <div className="OrdersPage-content">
                        {loading || loadingDishes ?
                            <Loader />
                            :
                            orders === null || orders === undefined ?
                                <p className='OrdersPage-error-text'>No orders yet</p>
                                :
                                Object.keys(orders).map((key) => {
                                    return <Order
                                        key={key}
                                        id={key}
                                        orderList={orders[key]}
                                        deleteIt={(e) => deleteIt(e, key)}
                                    />
                                })}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default OrdersPage;